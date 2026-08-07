import { VideoProject } from "@/types";

// For YouTube, use `youtubeId` and the thumbnail can be automatic.
// For TikTok, use `tiktokUrl`; thumbnail and embed ID are read automatically.
// For Instagram, use `instagramUrl`; embed and default preview are automatic.
// For Google Drive, use `driveUrl`; default Drive thumbnail and preview are automatic.
//
// `orientation` controls the layout automatically:
//   - "portrait"  → vertical 9:16 card, grouped into the "Vertical" row for that
//                   category so the thumbnail is never cropped to fit a wide box.
//   - "landscape" (or leave it out) → standard 16:9 card.
// Typical portrait sources: TikTok, Instagram Reels/Stories, some event highlight clips.
export const videos: VideoProject[] = [
  {
    id: "mrbob-tiktok-2",
    title: "Tanya Member Mr.BOB Kampung Inggris",
    category: "Social Media content",
    tiktokUrl:
      "https://www.tiktok.com/@mrbobkampunginggris/video/7439325334979251511?is_from_webapp=1&sender_device=pc&web_id=7464887091982353938",
    orientation: "portrait",
    role: "Video Editor",
    year: "2024",
    platform: "TikTok",
    metric: "9.1M Views",
  },
  {
    id: "mrbob-tiktok",
    title: "Talking Head Educational Video",
    category: "Social Media content",
    tiktokUrl:
      "https://www.tiktok.com/@mrbobkampunginggris/video/7312419722803285253",
    orientation: "portrait",
    role: "Video Editor",
    year: "2024",
    platform: "TikTok",
    metric: "12k Views",
  },
  {
    id: "tiktok-2",
    title: "Greenscreen Educational Video",
    category: "Social Media content",
    driveUrl:
      "https://drive.google.com/file/d/1Tg1GAV61_V5qLlW11K3yvOarNnGwU6xc/view?usp=share_link",
    orientation: "portrait",
    role: "Video Editor",
    year: "2024",
    platform: "Instagram Reels",
    metric: "25k Views",
  },
  {
    id: "instagram",
    title: "Talking Head with Elegant & Formal Style",
    category: "Social Media content",
    instagramUrl:
      "https://www.instagram.com/reel/DSM3mj6kof1/",
    orientation: "portrait",
    role: "Video Editor",
    year: "2025",
    platform: "Instagram Reels",
    metric: "4k Views",
  },
  {
    id: "instagram2",
    title: "Comedy Educational Video",
    category: "Social Media content",
    instagramUrl:
      "https://www.instagram.com/reel/DMaD8yGyKX1/",
    orientation: "portrait",
    role: "Video Editor",
    year: "2025",
    platform: "Instagram Reels",
    metric: "5k Views",
  },


  {
    id: "recap-fest",
    title: "Recap Video Higlight for Event",
    category: "Short form Video Content",
    driveUrl:
      "https://drive.google.com/file/d/1TPxBo7gKqfdYYvRleazhZuFoVdn53Z9v/view?usp=sharing",
    orientation: "portrait",
    role: "Video Editor",
    year: "2025",
    platform: "Instagram Reels",
    metric: "Recap Video",
  },
  {
    id: "wedding",
    title: "Wedding Highlight Video",
    category: "Short form Video Content",
    driveUrl:
      "https://drive.google.com/file/d/1jLQJ_TzGjbaUVVB6h5WD3_XJH5Fz7MpC/view?usp=sharing",
    orientation: "portrait",
    role: "Video Editor",
    year: "2025",
    platform: "Instagram Reels",
    metric: "Wedding Video",
  },
  {
    id: "mbg",
    title: "Educational Video with Motion Graphics",
    category: "Short form Video Content",
    driveUrl:
      "https://drive.google.com/file/d/1rVnW5_YZrS1w-3gCimLD6AaXLdvER3DR/view?usp=sharing",
    orientation: "portrait",
    role: "Video Editor",
    year: "2026",
    platform: "Instagram Reels",
    metric: "Motion Graphics Video",
  },
  {
    id: "game",
    title: "AA Show Video Content",
    category: "Short form Video Content",
    driveUrl:
      "https://drive.google.com/file/d/122ZhWROECKaDD-Sg4zmkZhZB4GVOk9t5/view?usp=sharing",
    orientation: "portrait",
    role: "Video Editor",
    year: "2024",
    platform: "Instagram Reels",
    metric: "AA Show Video",
  },
  

  {
    id: "jingle",
    title: "Jingle Official Video for Mr.BOB Kampung Inggris",
    category: "Long form Video Content",
    youtubeId: "mDKOjkwbIcE",
    orientation: "landscape",
    role: "Director & Editor",
    year: "2025",
    platform: "Youtube Content",
    metric: "Jingle Video",
  },
  {
    id: "aftermovie",
    title: "Short Movie Spesial Kemerdekaan Indonesia 2024",
    category: "Long form Video Content",
    youtubeId: "97pGvwWZECs",
    orientation: "landscape",
    role: "Director & Editor",
    year: "2024",
    platform: "YouTube Content",
    metric: "Short Movie Video",
  },
  {
    id: "educational",
    title: "Educational Video Content for Mr.BOB Kampung Inggris",
    category: "Long form Video Content",
    youtubeId: "H7tPBE7a6TY",
    orientation: "landscape",
    role: "Director & Editor",
    year: "2024",
    platform: "YouTube Content",
    metric: "Short Movie Video",
  },



  {
    id: "juniors",
    title: "Mr.BOB For Kids & Teens Company Profile",
    category: "Company profile",
    driveUrl:
      "https://drive.google.com/file/d/1xX2Vm23iBpCATKX2Vtm1-iHlDE4DXkCQ/view?usp=share_link",
    orientation: "landscape",
    role: "Director & Video Editor",
    year: "2024",
    platform: "Website",
    metric: "Company Profile Video",
  },
  {
    id: "eldorado",
    title: "El Dorado Trucking Software Company Profile",
    category: "Company profile",
    driveUrl:
      "https://drive.google.com/file/d/1uxoN2tgrLLM2PhJaza24bEAY9IzrYxSY/view?usp=sharing",
    orientation: "landscape",
    role: "Director & Video Editor",
    year: "2024",
    platform: "Website",
    metric: "Company Profile Video",
  },

  {
    id: "nominasi-1",
    title: "Retro Style Awardee Video for Mr.BOB Kampung Inggris",
    category: "Awarding video",
    driveUrl:
      "https://drive.google.com/file/d/1YspaLVPWdAnT4a4MyKVUwQFaWWY5oD8f/view?usp=share_link",
    orientation: "landscape",
    role: "Director & Video Editor",
    year: "2025",
    platform: "Website",
    metric: "Retro Awardee Video",
  },
  {
    id: "nominasi-2",
    title: "Ramadhan Award Video for Mr.BOB Kampung Inggris",
    category: "Awarding video",
    driveUrl:
      "https://drive.google.com/file/d/1ZlcVz6QHHDm6Dwj4HwgaXDrANRfKZTYn/view?usp=share_link",
    orientation: "landscape",
    role: "Director & Video Editor",
    year: "2026",
    platform: "Website",
    metric: "Ramadhan Award Video",
  },


  {
    id: "ai-1",
    title: "Genghis Khan AI Educational Video",
    category: "AI Video",
    driveUrl:
      "https://drive.google.com/file/d/1qqrzakZE12B9PR5sPNTeIkL5CfJsW70i/view?usp=sharing",
    orientation: "portrait",
    role: "Director & Video Editor",
    year: "2026",
    platform: "YouTube Shorts",
    metric: "Educational AI Video",
  },
  {
    id: "ai-2",
    title: "Horror AI Educational Video",
    category: "AI Video",
    driveUrl:
      "https://drive.google.com/file/d/1RpIuRFZQyxY1U7XqdgSkSUfB5cThod8h/view?usp=sharing",
    orientation: "portrait",
    role: "Director & Video Editor",
    year: "2026",
    platform: "YouTube Shorts",
    metric: "Educational AI Video",
  },
  {
    id: "ai-3",
    title: "War AI Educational Video",
    category: "AI Video",
    driveUrl:
      "https://drive.google.com/file/d/1QbhIY_vqliGdmivrJlwbuPeF0Bgs1wRk/view?usp=sharing",
    orientation: "portrait",
    role: "Director & Video Editor",
    year: "2026",
    platform: "YouTube Shorts",
    metric: "Educational AI Video",
  },
  
];

export const videoCategories: Array<VideoProject["category"] | "All"> = [
  "All",
  "Short form Video Content",
  "Social Media content",
  "Long form Video Content",
  "Company profile",
  "Awarding video",
  "AI Video",
  
];
