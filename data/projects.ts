import { DigitalSystemProject } from "@/types";

// To add a new system: copy one object below, change the `slug`, and fill in your
// own details. Screenshots go in /public/images/.
export const digitalSystems: DigitalSystemProject[] = [
  {
    slug: "creative-team-monitoring-dashboard",
    title: "Dashboard Monitoring",
    summary:
      "Dashboard Notion untuk memantau pekerjaan tim, progress project, dan deadline yang perlu segera ditindaklanjuti.",
    problem:
      "Saat team sedang menghandle banyak project, leader sulit melihat progress tiap tim dan project yang mulai berisiko melewati deadline.",
    solution:
      "Dashboard monitoring ini menyatukan status pekerjaan, PIC, prioritas, dan deadline agar semua pekerjaan bisa dilacak dari satu tempat.",
    role: "Product owner, workflow designer, no-code/low-code builder",
    features: [
      "Tracking pekerjaan berdasarkan tim dan PIC",
      "Status project yang mudah dipantau leader",
      "Daftar pekerjaan yang belum selesai",
      "Prioritas deadline dalam satu dashboard",
    ],
    tools: ["Notion", "Notion API", "Codex by ChatGPT", "Google Sheets"],
    impact: "Progress kerja menjadi lebih transparan, leader bisa mengambil keputusan lebih cepat, dan risiko project melewati deadline lebih mudah dicegah.",
    heroImage: "/images/3.png",
    desktopScreenshot: "/images/3.png",
    mobileScreenshot: "/images/3.png",
    process: [
      "Shadowed the creative team for a week to map how work actually moved between people",
      "Sketched three low-fidelity layouts and tested them with two team leads",
      "Built the data layer to sync task status automatically instead of manual updates",
      "Shipped a v1 to one team, gathered feedback, then rolled out team-wide",
    ],
    designDecisions: [
      "Chose a single-screen layout over multiple tabs so leads never have to click to find a bottleneck",
      "Used color instead of icons for urgency so it reads at a glance from across the room",
      "Kept the data read-only at first to avoid disrupting the team's existing tracker workflow",
    ],
    beforeAfter: {
      before: "Progress pekerjaan tersebar di chat, update manual, dan laporan terpisah.",
      after: "Semua pekerjaan bisa dipantau dari satu dashboard yang jelas dan mudah dibaca.",
    },
    liveUrl: null,
    caseStudyUrl:
      "https://app.notion.com/p/DASHBOARD-CREATIVE-MARKETING-fd2046b6c0768310bf2401f3b47de6c2?source=copy_link",
    allowEmbed: false,
  },
  {
    slug: "task-and-project-tracker",
    title: "To-Do List & Task Tracker",
    summary:
      "Sistem penugasan untuk membantu setiap tim memahami tugas, prioritas, PIC, dan deadline yang harus diselesaikan terlebih dahulu.",
    problem:
      "Penugasan sering tersebar di chat sehingga tim sulit mengetahui prioritas kerja, siapa PIC-nya, dan kapan project harus selesai.",
    solution:
      "Saya membuat tracker sederhana yang mencatat informasi penugasan, status pengerjaan, dan reminder deadline untuk setiap project.",
    role: "Designer and builder",
    features: [
      "Informasi penugasan untuk setiap tim",
      "Prioritas project yang mudah dibaca",
      "Reminder deadline setiap project",
      "Status pengerjaan yang bisa dipantau berkala",
    ],
    tools: ["Next.js", "TypeScript", "Notion API", "Tailwind CSS"],
    impact: "Workflow tim menjadi lebih teratur, setiap anggota lebih paham prioritas kerja, dan project tidak mudah melewati deadline.",
    heroImage: "/images/4.png",
    desktopScreenshot: "/images/4.png",
    mobileScreenshot: "/images/4.png",
    process: [
      "Audited why adoption of the previous tool was low through short interviews with each team member",
      "Removed every field that wasn't used in daily practice",
      "Prototyped a kanban and a list view, then let the team vote",
      "Ran a two-week pilot with one squad before wider rollout",
    ],
    designDecisions: [
      "Defaulted to list view on mobile since most updates happen on the go",
      "Made overdue tasks visually distinct without red alarm-style colors, to keep the tone calm",
      "Left task creation to four required fields only, to protect the low-friction promise",
    ],
    liveUrl: null,
    caseStudyUrl:
      "https://app.notion.com/p/Bayu-s-To-Do-List-34b046b6c07680b980d1cb6456383b31?source=copy_link",
    allowEmbed: false,
  },
  {
    slug: "content-quality-control-system",
    title: "Quality Control Dashboard",
    summary:
      "Dashboard web-based untuk tracking quality control output semua tim agar kekurangan bisa terlihat dan dievaluasi dengan lebih rapi.",
    problem:
      "Output tim belum memiliki sistem evaluasi yang konsisten, sehingga kekurangan pekerjaan sulit dilacak dan revisi sering baru terlihat setelah hasil dikirim.",
    solution:
      "Saya membuat dashboard quality control untuk mencatat temuan, melihat pola revisi, dan membantu setiap tim memahami bagian yang perlu ditingkatkan.",
    role: "Systems designer and workflow owner",
    features: [
      "Tracking kualitas output setiap tim",
      "Catatan revisi dan evaluasi pekerjaan",
      "Dashboard temuan yang mudah dibaca",
      "Rekap area improvement untuk evaluasi tim",
    ],
    tools: ["Notion", "Automation scripts", "Google Sheets", "Slack notifications"],
    impact: "Angka revisi turun 7% dibandingkan periode sebelumnya karena tim bisa melihat kekurangan output dan memperbaikinya lebih cepat.",
    heroImage: "/images/5.png",
    desktopScreenshot: "/images/5.png",
    mobileScreenshot: "/images/5.png",
    process: [
      "Logged every post-publish correction for one month to find the recurring root causes",
      "Mapped a four-stage approval flow that matched how the team already worked",
      "Piloted the checklist manually before automating stage transitions",
      "Added a weekly summary so leads could spot recurring issues, not just individual ones",
    ],
    designDecisions: [
      "Made the checklist stage-based rather than one long list, so nothing gets missed under time pressure",
      "Required a named sign-off at each stage so accountability is clear",
      "Kept templates editable per content type instead of one rigid checklist for everything",
    ],
    liveUrl: null,
    caseStudyUrl: "https://creative-marketing-mrbob.github.io/qc-dashboard/",
    allowEmbed: false,
  },
  {
    slug: "request-and-scheduling-system",
    title: "Form Booking Jadwal Take dan Device",
    summary:
      "Dashboard Notion untuk booking jadwal take dan penggunaan device agar komunikasi antar divisi lebih jelas dan ter-tracking.",
    problem:
      "Keterbatasan device dan lokasi sering menyebabkan miskomunikasi antar divisi, terutama saat beberapa tim membutuhkan jadwal take di waktu yang berdekatan.",
    solution:
      "Saya membuat form booking yang mengumpulkan jadwal, lokasi, kebutuhan produksi, dan device dalam satu sistem agar semua request bisa dikomunikasikan lebih lanjut antar divisi.",
    role: "Product owner and builder",
    features: [
      "Form booking jadwal take",
      "Tracking penggunaan device",
      "Informasi lokasi dan kebutuhan produksi",
      "Status request yang mudah dicek antar divisi",
    ],
    tools: ["Next.js", "Notion API", "Google Calendar API", "Tailwind CSS"],
    impact: "Miskomunikasi turun hingga 90% karena jadwal, kebutuhan device, dan informasi take sudah ter-tracking dalam satu sistem.",
    heroImage: "/images/6.png",
    desktopScreenshot: "/images/6.png",
    mobileScreenshot: "/images/6.png",
    process: [
      "Collected two weeks of real chat-based requests to identify the missing details that caused delays",
      "Designed a form that makes those details required, not optional",
      "Connected the form to the team calendar to suggest slots automatically",
      "Gave requesters a shareable status link so they'd stop asking for updates in chat",
    ],
    designDecisions: [
      "Prioritized requester experience as much as internal workflow, since adoption depended on both sides",
      "Used plain-language field labels instead of internal jargon on the intake form",
      "Surfaced a status link instead of requiring requesters to log into an internal tool",
    ],
    liveUrl: null,
    caseStudyUrl:
      "https://app.notion.com/p/JADWAL-TAKE-KONTEN-BOOKING-STUDIO-34c046b6c07680a09686fa2577857c4e?source=copy_link",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    allowEmbed: true,
  },
  {
    slug: "form-request-tracker",
    title: "Form Request Tracker",
    summary:
      "Dashboard Notion berisi seluruh list request dari tim dan divisi lain yang bisa ditracking oleh semua divisi secara real time.",
    problem:
      "Pihak yang melakukan request sering tidak mengetahui progress request sudah sampai mana, sehingga muncul komplain karena request terasa tidak kunjung selesai.",
    solution:
      "Saya membuat tracker request yang menampilkan jumlah request yang sedang di-handle, status pengerjaan, dan progress setiap request secara transparan.",
    role: "Workflow designer and Notion builder",
    features: [
      "List request dari semua divisi",
      "Status progress real time",
      "Tracking jumlah request yang sedang di-handle",
      "Dashboard transparan untuk requester dan tim internal",
    ],
    tools: ["Notion", "Notion Database", "Workflow Mapping"],
    impact:
      "Tidak ada komplain sampai saat ini karena requester bisa melihat progress request secara transparan tanpa harus bertanya berulang lewat chat.",
    heroImage: "/images/7.png",
    desktopScreenshot: "/images/7.png",
    mobileScreenshot: "/images/7.png",
    process: [
      "Mengumpulkan pola request yang paling sering masuk dari tim dan divisi lain",
      "Membuat status progress yang mudah dipahami oleh requester maupun tim internal",
      "Menyusun dashboard agar semua request bisa dipantau dalam satu tempat",
      "Membiasakan requester mengecek progress melalui tracker sebelum follow up lewat chat",
    ],
    designDecisions: [
      "Menampilkan progress request secara terbuka agar requester merasa dilibatkan dalam proses",
      "Membuat status yang sederhana supaya mudah dibaca oleh semua divisi",
      "Mengutamakan transparansi jumlah request agar ekspektasi waktu pengerjaan lebih realistis",
    ],
    beforeAfter: {
      before: "Requester tidak tahu progress request dan sering merasa request tidak dikerjakan.",
      after: "Requester bisa melihat progress request secara real time dan komplain berhasil ditekan.",
    },
    liveUrl: null,
    caseStudyUrl:
      "https://app.notion.com/p/ANTRIAN-FORM-REQUEST-CREATIVE-MR-BOB-c8a046b6c07682cd91a5010f68ad7660?source=copy_link",
    allowEmbed: false,
  },
  {
    slug: "video-transcript-for-testimony",
    title: "Video Transcript for Testimony",
    summary:
      "Aplikasi desktop untuk mentranskrip testimoni narasumber dan membantu content creator menemukan poin terbaik untuk video testimoni.",
    problem:
      "Content creator harus mentranskrip video secara manual, mencatat poin penting dari testimoni, lalu mencari ulang bagian yang paling potensial untuk dijadikan konten.",
    solution:
      "Saya membuat aplikasi desktop yang memungkinkan content creator mengupload video, menunggu transkrip selesai, lalu langsung melihat poin-poin yang berpotensi menjadi video testimoni.",
    role: "Workflow designer and desktop app builder",
    features: [
      "Upload video testimoni",
      "Transkrip otomatis",
      "Rekomendasi poin penting",
      "Ringkasan bagian potensial untuk konten",
    ],
    tools: ["Desktop App", "Speech-to-Text", "Workflow Automation"],
    impact:
      "Proses transkrip testimoni menjadi 95% lebih efisien. Sebelumnya bisa memakan waktu seharian penuh, sekarang cukup menunggu sekitar 5 menit sampai semuanya selesai.",
    heroImage: "/images/8.png",
    desktopScreenshot: "/images/8.png",
    mobileScreenshot: "/images/8.png",
    process: [
      "Mengidentifikasi bagian manual yang paling memakan waktu dalam proses produksi testimoni",
      "Membuat alur upload video, transkrip otomatis, dan penandaan poin penting",
      "Menguji hasil transkrip pada beberapa format video testimoni",
      "Menyederhanakan output agar content creator bisa langsung memilih bahan konten",
    ],
    designDecisions: [
      "Memprioritaskan output yang siap dipakai untuk produksi konten, bukan hanya transkrip mentah",
      "Membuat hasil transkrip mudah discan agar creator cepat menemukan momen penting",
      "Menjaga proses tetap sederhana: upload video, tunggu, lalu ambil poin terbaik",
    ],
    beforeAfter: {
      before: "Transkrip testimoni dikerjakan manual dan bisa menghabiskan waktu seharian.",
      after: "Content creator cukup menunggu sekitar 5 menit untuk mendapatkan transkrip dan poin penting.",
    },
    liveUrl: null,
    caseStudyUrl:
      "https://drive.google.com/file/d/1uovoDc8mafcUTi7yrbdZULSijDY9KZx3/view?usp=sharing",
    allowEmbed: false,
  },
];
