module.exports = {
  // languages
  locales: ["default", "fr", "en"],
  // default language
  defaultLocale: "default",
  localeDetection: false,
  pages: {
    "*": ["common", "form"],
    "/": ["index"],
    "/signup": ["signup"],
    "/signin": ["signin"],
    "/contact": ["contact"],
    "/profile": ["profile"],
    "/change-email/[token]": ["change-email"],
    "/form": ["form-page"],
    "/form/[key]": ["form-page-key"],
    "/form/creation": ["form-page-creation"],
  },
};
