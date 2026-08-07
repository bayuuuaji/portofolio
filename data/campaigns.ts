import type { CampaignProject } from "@/types";

// To add or edit campaigns, update the objects below.
// Put poster images in /public/images/campaigns/, then use a path like:
// poster: "/images/campaigns/your-poster.jpg"
export const campaigns: CampaignProject[] = [
  {
    id: "super-seru-challenge",
    title: "Super Seru Challenge",
    poster: "/images/videos/placeholder-9x16-01.svg",
    summary:
      "Campaign activation untuk meningkatkan partisipasi audience melalui challenge ringan, konten harian, dan call-to-action yang mudah diikuti.",
    participants: 842,
    targetParticipants: 1000,
    period: "2025",
    role: "Campaign Planner",
  },
  {
    id: "english-speaking-bootcamp",
    title: "English Speaking Bootcamp",
    poster: "/images/videos/placeholder-9x16-02.svg",
    summary:
      "Campaign akuisisi peserta untuk program speaking dengan angle problem sehari-hari, urgency pendaftaran, dan materi promosi lintas channel.",
    participants: 312,
    targetParticipants: 400,
    period: "2025",
    role: "Campaign Strategist",
  },
  {
    id: "ramadhan-learning-series",
    title: "Ramadhan Learning Series",
    poster: "/images/videos/placeholder-9x16-01.svg",
    summary:
      "Campaign seasonal untuk menjaga engagement selama Ramadhan melalui konten edukasi pendek, reminder belajar, dan distribusi konten yang konsisten.",
    participants: 586,
    targetParticipants: 600,
    period: "2026",
    role: "Creative Campaign Lead",
  },
];
