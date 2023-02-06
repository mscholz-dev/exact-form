module.exports = {
  // languages
  locales: ["default", "fr", "en"],
  // default language
  defaultLocale: "default",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/": ["index"],
    "/signup": ["signup", "form"],
    "/signin": ["signin", "form"],
    "/contact": ["contact", "form"],
    "/profile": ["profile", "form"],
    "/change-email/[token]": [
      "change-email",
      "form",
    ],
    "/form": ["form-page"],
  },
};
