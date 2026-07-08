const SHEET_NAME = 'Speaking Level Check';
const KIE_CHAT_COMPLETIONS_URL = 'https://api.kie.ai/gemini-2.5-flash/v1/chat/completions';
const HEADERS = [
  'timestamp', 'name', 'whatsapp', 'social_media_account', 'followers_range', 'age', 'status',
  'score', 'level', 'task_response', 'fluency_coherence', 'pronunciation',
  'grammar', 'vocabulary', 'communication_strategy', 'zero_tasks', 'teacher_note'
];

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  if (payload.action === 'scoreSpeaking') {
    return jsonResponse({ ok: true, speakingScore: scoreSpeakingWithGemini(payload) });
  }
  if (payload.action === 'saveSpeakingResult') {
    saveSpeakingResult(payload);
    return jsonResponse({ ok: true });
  }
  return jsonResponse({ ok: false, error: 'Unknown action' });
}

function scoreSpeakingWithGemini(payload) {
  const keys = getKieApiKeys();
  const localFallback = payload.localResult || zeroResult('missing api key');
  if (!keys.length) return localFallback;
  cleanupOldSpeakingAudioFiles();

  const tasks = (payload.tasks || []).map((task) => ({
    id: String(task.id || ''),
    title: String(task.title || ''),
    prompt: String(task.prompt || ''),
    imageContext: String(task.imageContext || ''),
    targetSeconds: Number(task.targetSeconds || 0),
    duration: Number(task.duration || 0),
    mimeType: String(task.mimeType || 'audio/webm'),
    audioBase64: String(task.audioBase64 || '')
  }));

  if (!tasks.some((task) => task.audioBase64)) return localFallback;

  try {
    const keyState = { keys, blocked: {} };
    const taskScores = tasks.map((task) => scoreSingleTaskWithGemini(keyState, task));
    const result = buildSpeakingResultFromTasks(taskScores);
    result.source = 'kie.ai gemini-2.5-flash';
    return result;
  } catch (error) {
    const fallback = localFallback;
    fallback.source = 'local fallback after kie api error';
    fallback.error = String(error.message || error);
    fallback.debug = {
      message: String(error.message || error),
      body: String(error.body || '').slice(0, 1000),
      publicAudioUrl: error.publicAudioUrl || '',
      publicAudioFileId: error.publicAudioFileId || ''
    };
    return fallback;
  }
}

function getKieApiKeys() {
  return getScriptPropertyKeys('KIE_API_KEYS', 'KIE_API_KEY');
}

function getScriptPropertyKeys(multiName, singleName) {
  const props = PropertiesService.getScriptProperties();
  const multi = props.getProperty(multiName) || '';
  const single = props.getProperty(singleName) || '';
  return `${multi}\n${single}`
    .split(/[\n,;]/)
    .map((key) => key.trim())
    .filter((key, index, list) => key && list.indexOf(key) === index);
}

function scoreSingleTaskWithGemini(keyState, task) {
  if (!task.audioBase64 || task.duration < 2) {
    return zeroTaskScore(task, 'Tidak ada audio valid untuk task ini.');
  }

  const prompt = [
    'You are an expert English speaking placement examiner for an Indonesian speaking-focused English course.',
    'Assess this ONE submitted speaking recording using CEFR-aligned placement judgement.',
    'Important zero-score rule: if this task has silent audio, mostly noise, non-speech, or the learner says almost nothing meaningful, score must be 0 and must not be guessed from the prompt.',
    'Do not reward reading the prompt silently. Score only audible spoken English.',
    'For picture description tasks, use imageContext as the reference for what the learner was looking at. Do not assume a different picture.',
    'Give score as a raw 0-20 task score. Also give criteriaPercent values from 0-100 for taskResponse, fluencyCoherence, pronunciation, grammar, vocabulary, and communicationStrategy.',
    'Write all human-facing feedback in friendly, casual Bahasa Indonesia using "kamu", not "Anda". Keep transcript exactly as spoken.',
    'Tone: Gen-Z friendly, fun, supportive, and clear, like a helpful speaking coach. Use phrases such as "ini udah oke", "next kamu bisa...", "biar makin natural", "bagian ini perlu dipoles", but do not overdo slang and do not use emojis.',
    'Give constructive, answer-specific feedback. Do not use generic template feedback. Mention what was good from the learner answer, what was wrong or unclear, how to correct grammar, how to correct pronunciation if you hear a mispronunciation, a better/natural sentence example, and why the task got that score.',
    'For grammarFix and pronunciationFix, write short separate correction sentences, not one long paragraph. Example: "Seharusnya ... (bukan ...)." "Next, pakai ... biar lebih natural."',
    'If pronunciation cannot be judged confidently, set pronunciationFix to "Tidak ada koreksi pronunciation spesifik yang terdengar jelas." Do not invent word-level pronunciation errors.',
    'Use encouraging but honest wording. Avoid stiff examiner language, avoid "peserta", "pembelajar", and avoid formal words like "Anda".',
    'Give strict JSON only with this shape:',
    '{"id":"","score":0,"transcript":"","note":"","good":"","correction":"","grammarFix":"","pronunciationFix":"","betterAnswer":"","scoreReason":"","isZero":true,"criteriaPercent":{"taskResponse":0,"fluencyCoherence":0,"pronunciation":0,"grammar":0,"vocabulary":0,"communicationStrategy":0}}',
    'Task metadata:',
    JSON.stringify({
      id: task.id,
      title: task.title,
      prompt: task.prompt,
      imageContext: task.imageContext,
      targetSeconds: task.targetSeconds,
      duration: task.duration,
      mimeType: task.mimeType
    })
  ].join('\n');

  return callKieWithBackupKeys(keyState, prompt, task);
}

function callKieWithBackupKeys(keyState, prompt, task) {
  let lastError = null;
  const availableKeys = keyState.keys.filter((key) => !keyState.blocked[key]);
  if (!availableKeys.length) {
    throw new Error('All Kie backup keys are blocked by quota/rate limit for this test.');
  }
  for (let index = 0; index < availableKeys.length; index += 1) {
    const key = availableKeys[index];
    try {
      return callKieOnce(key, prompt, task);
    } catch (error) {
      lastError = error;
      if (!isRetryableKieError(error)) {
        throw error;
      }
      keyState.blocked[key] = true;
      if (index === availableKeys.length - 1) {
        throw error;
      }
      Utilities.sleep(350);
    }
  }
  throw lastError || new Error('Kie API failed with all backup keys.');
}

function callKieOnce(key, prompt, task) {
  const publicAudio = createPublicAudioFile(task);
  try {
    const response = UrlFetchApp.fetch(KIE_CHAT_COMPLETIONS_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: `Bearer ${key}` },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: publicAudio.url }
            }
          ]
        }],
        temperature: 0.05,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'speaking_task_score',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                score: { type: 'number' },
                transcript: { type: 'string' },
                note: { type: 'string' },
                good: { type: 'string' },
                correction: { type: 'string' },
                grammarFix: { type: 'string' },
                pronunciationFix: { type: 'string' },
                betterAnswer: { type: 'string' },
                scoreReason: { type: 'string' },
                isZero: { type: 'boolean' },
                criteriaPercent: {
                  type: 'object',
                  properties: {
                    taskResponse: { type: 'number' },
                    fluencyCoherence: { type: 'number' },
                    pronunciation: { type: 'number' },
                    grammar: { type: 'number' },
                    vocabulary: { type: 'number' },
                    communicationStrategy: { type: 'number' }
                  },
                  required: ['taskResponse', 'fluencyCoherence', 'pronunciation', 'grammar', 'vocabulary', 'communicationStrategy']
                }
              },
              required: ['id', 'score', 'transcript', 'note', 'good', 'correction', 'grammarFix', 'pronunciationFix', 'betterAnswer', 'scoreReason', 'isZero', 'criteriaPercent']
            }
          }
        }
      })
    });
    if (response.getResponseCode() >= 400) {
      const error = new Error(`Kie API error ${response.getResponseCode()}: ${response.getContentText().slice(0, 500)}`);
      error.status = response.getResponseCode();
      error.body = response.getContentText();
      error.publicAudioUrl = publicAudio.url;
      error.publicAudioFileId = publicAudio.fileId;
      throw error;
    }
    const body = JSON.parse(response.getContentText());
    const text = body.choices?.[0]?.message?.content || '{}';
    if (!body.choices?.length || text === '{}') {
      const error = new Error(`Kie API returned no scoring candidate: ${response.getContentText().slice(0, 500)}`);
      error.status = 502;
      error.body = response.getContentText();
      error.publicAudioUrl = publicAudio.url;
      error.publicAudioFileId = publicAudio.fileId;
      throw error;
    }
    return normalizeTaskScore(task, parseModelJson(text));
  } catch (error) {
    error.publicAudioUrl = error.publicAudioUrl || publicAudio.url;
    error.publicAudioFileId = error.publicAudioFileId || publicAudio.fileId;
    throw error;
  }
}

function createPublicAudioFile(task) {
  const mimeType = task.mimeType || 'audio/webm';
  const extension = mimeType.includes('wav') ? 'wav' : mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'webm';
  const bytes = Utilities.base64Decode(task.audioBase64);
  const safeId = String(task.id || 'task').replace(/[^a-z0-9_-]/gi, '-');
  const name = `speaking-${safeId}-${Date.now()}.${extension}`;
  const blob = Utilities.newBlob(bytes, mimeType, name);
  const file = DriveApp.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return {
    fileId: file.getId(),
    url: `https://drive.google.com/uc?export=download&id=${file.getId()}`
  };
}

function cleanupPublicAudioFile(fileId) {
  if (!fileId) return;
  try {
    DriveApp.getFileById(fileId).setTrashed(true);
  } catch (error) {
    console.warn(`Failed to cleanup public audio file: ${error}`);
  }
}

function cleanupOldSpeakingAudioFiles() {
  try {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    const files = DriveApp.searchFiles("title contains 'speaking-' and trashed = false");
    while (files.hasNext()) {
      const file = files.next();
      if (file.getDateCreated().getTime() < cutoff) file.setTrashed(true);
    }
  } catch (error) {
    console.warn(`Failed to cleanup old speaking audio files: ${error}`);
  }
}

function parseModelJson(text) {
  const raw = String(text || '').trim();
  try {
    return JSON.parse(raw);
  } catch (error) {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw error;
  }
}

function isRetryableKieError(error) {
  const status = Number(error.status || 0);
  const body = String(error.body || error.message || '').toLowerCase();
  return status === 401 ||
    status === 403 ||
    status === 429 ||
    status >= 500 ||
    body.includes('quota') ||
    body.includes('rate limit') ||
    body.includes('resource_exhausted');
}

function buildSpeakingResultFromTasks(taskScores) {
  const totalTasks = Math.max(taskScores.length, 1);
  const maxCriteria = {
    taskResponse: 20,
    fluencyCoherence: 20,
    pronunciation: 20,
    grammar: 15,
    vocabulary: 15,
    communicationStrategy: 10
  };
  const criteria = {};
  Object.keys(maxCriteria).forEach((key) => {
    const averagePercent = taskScores.reduce((sum, task) => sum + clamp(task.criteriaPercent?.[key], 0, 100), 0) / totalTasks;
    criteria[key] = Math.round((averagePercent / 100) * maxCriteria[key]);
  });
  const overallScore = Math.round(
    criteria.taskResponse +
    criteria.fluencyCoherence +
    criteria.pronunciation +
    criteria.grammar +
    criteria.vocabulary +
    criteria.communicationStrategy
  );
  const nonZeroTasks = taskScores.filter((task) => !task.isZero && task.score > 0);
  const weakest = getWeakestCriteria(criteria);
  const strongest = getStrongestCriteria(criteria);
  return normalizeSpeakingScore({
    overallScore,
    cefrLevel: getLevelName(overallScore),
    criteria,
    taskScores,
    strengths: nonZeroTasks.length
      ? [`Bagian yang paling kebaca saat ini adalah ${strongest.label}. Ini bisa jadi modal awal buat latihan berikutnya.`]
      : [],
    improvements: [`Next, fokus poles ${weakest.label} dulu biar jawaban kamu makin kebaca dan natural.`],
    teacherNote: nonZeroTasks.length
      ? `Kamu sudah submit ${nonZeroTasks.length} dari ${taskScores.length} audio yang bisa dinilai. Mulai dari feedback per soal, lalu ulangi bagian yang nilainya paling rendah.`
      : 'Tidak ada audio speaking yang bisa dinilai, jadi skor speaking adalah 0.',
    zeroTasks: taskScores.filter((task) => task.isZero || task.score === 0).length
  });
}

function normalizeTaskScore(sourceTask, score) {
  const criteriaPercent = score.criteriaPercent || {};
  return {
    id: String(score.id || sourceTask.id || ''),
    score: clamp(score.score, 0, 20),
    transcript: String(score.transcript || ''),
    note: String(score.note || ''),
    good: String(score.good || ''),
    correction: String(score.correction || ''),
    grammarFix: String(score.grammarFix || ''),
    pronunciationFix: String(score.pronunciationFix || ''),
    betterAnswer: String(score.betterAnswer || ''),
    scoreReason: String(score.scoreReason || ''),
    isZero: Boolean(score.isZero) || clamp(score.score, 0, 20) === 0,
    criteriaPercent: {
      taskResponse: clamp(criteriaPercent.taskResponse, 0, 100),
      fluencyCoherence: clamp(criteriaPercent.fluencyCoherence, 0, 100),
      pronunciation: clamp(criteriaPercent.pronunciation, 0, 100),
      grammar: clamp(criteriaPercent.grammar, 0, 100),
      vocabulary: clamp(criteriaPercent.vocabulary, 0, 100),
      communicationStrategy: clamp(criteriaPercent.communicationStrategy, 0, 100)
    }
  };
}

function zeroTaskScore(task, note) {
  return {
    id: task.id,
    score: 0,
    transcript: '',
    note,
    good: '',
    correction: note,
    grammarFix: '',
    pronunciationFix: '',
    betterAnswer: '',
    scoreReason: 'Nilai 0 karena audio tidak tersedia atau belum cukup jelas untuk dinilai.',
    isZero: true,
    criteriaPercent: {
      taskResponse: 0,
      fluencyCoherence: 0,
      pronunciation: 0,
      grammar: 0,
      vocabulary: 0,
      communicationStrategy: 0
    }
  };
}

function getStrongestCriteria(criteria) {
  return criteriaEntry(criteria, (a, b) => b.value - a.value);
}

function getWeakestCriteria(criteria) {
  return criteriaEntry(criteria, (a, b) => a.value - b.value);
}

function criteriaEntry(criteria, sortFn) {
  const labels = {
    taskResponse: 'task response',
    fluencyCoherence: 'fluency',
    pronunciation: 'pronunciation',
    grammar: 'grammar',
    vocabulary: 'vocabulary',
    communicationStrategy: 'strategy'
  };
  const entries = Object.keys(labels).map((key) => ({ key, label: labels[key], value: Number(criteria[key] || 0) }));
  return entries.sort(sortFn)[0] || { key: 'taskResponse', label: 'task response', value: 0 };
}

function normalizeSpeakingScore(score) {
  const criteria = score.criteria || {};
  const normalized = {
    overallScore: clamp(score.overallScore, 0, 100),
    cefrLevel: String(score.cefrLevel || getLevelName(score.overallScore || 0)),
    criteria: {
      taskResponse: clamp(criteria.taskResponse, 0, 20),
      fluencyCoherence: clamp(criteria.fluencyCoherence, 0, 20),
      pronunciation: clamp(criteria.pronunciation, 0, 20),
      grammar: clamp(criteria.grammar, 0, 15),
      vocabulary: clamp(criteria.vocabulary, 0, 15),
      communicationStrategy: clamp(criteria.communicationStrategy, 0, 10)
    },
    taskScores: Array.isArray(score.taskScores) ? score.taskScores.map((task) => ({
      id: String(task.id || ''),
      score: clamp(task.score, 0, 20),
      transcript: String(task.transcript || ''),
      note: String(task.note || ''),
      good: String(task.good || ''),
      correction: String(task.correction || ''),
      grammarFix: String(task.grammarFix || ''),
      pronunciationFix: String(task.pronunciationFix || ''),
      betterAnswer: String(task.betterAnswer || ''),
      scoreReason: String(task.scoreReason || ''),
      isZero: Boolean(task.isZero)
    })) : [],
    strengths: Array.isArray(score.strengths) ? score.strengths.slice(0, 3) : [],
    improvements: Array.isArray(score.improvements) ? score.improvements.slice(0, 3) : [],
    teacherNote: String(score.teacherNote || ''),
    zeroTasks: clamp(score.zeroTasks, 0, 6),
    source: 'gemini'
  };
  normalized.overallScore = Math.round(
    normalized.criteria.taskResponse +
    normalized.criteria.fluencyCoherence +
    normalized.criteria.pronunciation +
    normalized.criteria.grammar +
    normalized.criteria.vocabulary +
    normalized.criteria.communicationStrategy
  );
  normalized.cefrLevel = getLevelName(normalized.overallScore);
  if (normalized.zeroTasks >= 6 || normalized.overallScore === 0) {
    normalized.overallScore = 0;
    normalized.cefrLevel = 'Beginner';
    normalized.teacherNote = normalized.teacherNote || 'Tidak ada audio speaking yang bisa dinilai, jadi skor speaking adalah 0.';
  }
  return normalized;
}

function zeroResult(source) {
  return {
    overallScore: 0,
    cefrLevel: 'Beginner',
    criteria: {
      taskResponse: 0,
      fluencyCoherence: 0,
      pronunciation: 0,
      grammar: 0,
      vocabulary: 0,
      communicationStrategy: 0
    },
    taskScores: [],
    strengths: [],
    improvements: ['Submit clear spoken English audio for each task.'],
    teacherNote: 'Tidak ada audio speaking yang bisa dinilai, jadi skor speaking adalah 0.',
    zeroTasks: 6,
    source
  };
}

function saveSpeakingResult(payload) {
  const sheet = getSheet();
  const user = payload.user || {};
  const result = payload.result || {};
  const criteria = result.criteria || {};
  sheet.appendRow([
    new Date(),
    user.name || '',
    user.whatsapp || '',
    user.instagram || '',
    user.instagramFollowers || '',
    user.age || '',
    user.status || '',
    result.overallScore || 0,
    result.cefrLevel || '',
    criteria.taskResponse || 0,
    criteria.fluencyCoherence || 0,
    criteria.pronunciation || 0,
    criteria.grammar || 0,
    criteria.vocabulary || 0,
    criteria.communicationStrategy || 0,
    result.zeroTasks || 0,
    result.teacherNote || ''
  ]);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  migrateSpeakingSheetHeaders(sheet);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function migrateSpeakingSheetHeaders(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String);
  const emailIndex = headers.indexOf('email');
  const socialIndex = headers.indexOf('social_media_account');
  const followersIndex = headers.indexOf('followers_range');
  const needsFollowersColumn = followersIndex === -1 && (emailIndex !== -1 || socialIndex !== -1);

  if (needsFollowersColumn) {
    const accountColumn = (socialIndex !== -1 ? socialIndex : emailIndex) + 1;
    sheet.insertColumnAfter(accountColumn);
  }
}

function syncSpeakingHeaders() {
  const sheet = getSheet();
  return sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
}

function debugAiProviders() {
  return [{ provider: 'kie.ai gemini-2.5-flash', keys: getKieApiKeys().length }];
}

function getLevelName(score) {
  const value = Number(score || 0);
  if (value <= 25) return 'Beginner';
  if (value <= 45) return 'Elementary';
  if (value <= 60) return 'Pre-Intermediate';
  if (value <= 75) return 'Intermediate';
  if (value <= 88) return 'Upper-Intermediate';
  return 'Advanced';
}

function clamp(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
