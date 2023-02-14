import type { NextRouter } from "next/router";

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

      case "form/[key]":
        return "/fr/formulaire/[key]";

      default:
        return `/fr${
          pathname ? `/${pathname}` : ""
        }`;
    }
  }

  hidePageTransition(): void {
    if (typeof window === "undefined") return;

    const pageTransition = document.querySelector(
      "#pageTransition",
    ) as HTMLDivElement;

    if (!pageTransition) return;

    pageTransition.classList.add(
      "page-transition-hide",
    );
  }

  redirect(
    e: React.MouseEvent<HTMLAnchorElement> | null,
    router: NextRouter,
    locale: string,
    pathname: string,
    object?: { name?: string; value?: string },
  ): void {
    if (e) e.preventDefault();

    if (
      window.location.pathname ===
      this.translate(locale, pathname)
    )
      return;

    this.hidePageTransition();

    if (!object) {
      setTimeout(
        () =>
          router.push(
            this.translate(locale, pathname),
          ),
        1_000,
      );
      return;
    }

    setTimeout(
      () =>
        router.push({
          pathname: this.translate(
            locale,
            pathname,
          ),
          query: {
            [object.name as string]: object.value,
          },
        }),
      1_000,
    );
  }

  reload(router: NextRouter) {
    this.hidePageTransition();

    setTimeout(() => router.reload(), 1_000);
  }
}
