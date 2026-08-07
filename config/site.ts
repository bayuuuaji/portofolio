export const siteConfig = {
  name: "Bayu",
  logo: "BAYU.",
  title: "Bayu — Creative Marketing & Digital Systems Builder",
  description:
    "I build content, campaigns, and digital systems that help creative teams grow and work better.",
  brandStatement:
    "I build content, campaigns, and digital systems that help creative teams grow and work better.",
  url: "https://bayu-portfolio.vercel.app",
  ogImage: "/images/og-cover.jpg",
  resumeUrl: "/bayu-resume.pdf",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Video Works", href: "#video-works" },
    { label: "Digital Systems", href: "#digital-systems" },
    { label: "Campaigns", href: "#campaigns" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
