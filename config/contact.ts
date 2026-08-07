// Edit this file to update every contact detail across the whole site.
// Phone number must be in international format WITHOUT "+", spaces, or dashes.
export const contactConfig = {
  whatsappNumber: "6281234567890",
  whatsappMessage:
    "Hi Bayu, I saw your portfolio and I'd like to talk about a project.",
  email: "hello@bayu.id",
  linkedin: "https://www.linkedin.com/in/bayu-example",
  instagram: "https://www.instagram.com/bayu.example",
  youtube: "https://www.youtube.com/@bayu.example",
};

export const whatsappLink = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(
  contactConfig.whatsappMessage
)}`;

export const emailLink = `mailto:${contactConfig.email}`;
