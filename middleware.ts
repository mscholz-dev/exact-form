import {
  NextRequest,
  NextResponse,
} from "next/server";

// source
//https://medium.com/@d.goerdes/next-js-12-i18n-default-locale-prefix-bd535c7320a2

const PUBLIC_FILE = /\.([a-zA-Z0-9]+$)/;

export default function middleware(
  request: NextRequest,
) {
  // We need to clean up the pathName as for some reason the vercel hosted
  // middleware gets the locale in the path.
  // This is not the case when the code runs locally.
  const cleanPathName =
    request.nextUrl.pathname.startsWith(
      "/default",
    )
      ? request.nextUrl.pathname
          .replace("/default", "/")
          .replace("//", "/")
      : request.nextUrl.pathname;

  const shouldHandleLocale =
    !PUBLIC_FILE.test(cleanPathName) &&
    !cleanPathName.includes("/api/") &&
    request.nextUrl.locale === "default";

  return shouldHandleLocale
    ? NextResponse.redirect(
        new URL(
          `/fr${cleanPathName}`,
          request.url,
        ),
      )
    : undefined;
}
