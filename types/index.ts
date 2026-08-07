export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
  skills: string[];
};

export type VideoCategory =
  | "Social Media content"
  | "Short form Video Content"
  | "Long form Video Content"
  | "Company profile"
  | "Awarding video"
  | "AI Video";

export type VideoOrientation = "landscape" | "portrait";

export type VideoProject = {
  id: string;
  title: string;
  category: VideoCategory;
  thumbnail?: string;
  youtubeId?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  driveUrl?: string;
  // "portrait" = vertical 9:16 video (TikTok, Reels, Stories, some event highlight clips).
  // Leave unset (or "landscape") for standard 16:9 video. The video card and grid
  // pick the right layout automatically based on this field — no other changes needed.
  orientation?: VideoOrientation;
  role: string;
  year: string;
  platform: string;
  metric?: string;
};

export type DigitalSystemProject = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  tools: string[];
  impact: string;
  heroImage: string;
  desktopScreenshot: string;
  mobileScreenshot?: string;
  process: string[];
  designDecisions: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  liveUrl: string | null;
  caseStudyUrl: string;
  demoVideoUrl?: string;
  allowEmbed: boolean;
};

export type CampaignProject = {
  id: string;
  title: string;
  poster: string;
  summary: string;
  participants: number;
  targetParticipants: number;
  period: string;
  role: string;
};

export type SkillGroup = {
  title: "Strategy" | "Creative" | "Leadership" | "Tools";
  description: string;
  items: string[];
};
