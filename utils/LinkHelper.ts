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

      default:
        return `/fr${
          pathname ? `/${pathname}` : ""
        }`;
    }
  }
}
