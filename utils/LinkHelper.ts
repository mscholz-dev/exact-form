export default class LinkHelper {
  translate(
    locale: string,
    pathname: string,
  ): string {
    // locale: en
    if (locale === "en")
      return `/${locale}${
        pathname ? `/${pathname}` : ""
      }`;

    // locale: fr
    switch (pathname) {
      case "signup":
        return "/fr/inscription";

      case "signin":
        return "/fr/connexion";

      case "profile":
        return "/fr/profil";

      case "form":
        return "/fr/formulaire";

      case "form/creation":
        return "/fr/formulaire/creation";

      default:
        // form/:key
        if (pathname.includes("form"))
          return `/fr/formulaire/${pathname.replace(
            "form/",
            "",
          )}`;

        return `/fr${
          pathname ? `/${pathname}` : ""
        }`;
    }
  }
}
