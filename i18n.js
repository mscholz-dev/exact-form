module.exports = {
  // languages
  locales: ["default", "fr", "en"],
  // default language
  defaultLocale: "default",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/": ["index"],
    "/signup": ["signup"],
    "/signin": ["signin"],
    "/contact": ["contact"],
  },
};
