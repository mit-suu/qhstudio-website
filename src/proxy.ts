import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

// Country headers set by the hosting edge (Vercel, Cloudflare).
const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry"];

function hasLocalePrefix(pathname: string) {
  return routing.locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

// First visit without a locale in the URL: visitors from Vietnam get /vi, everyone else /en.
// A saved choice (cookie) wins; without a country header next-intl falls back to Accept-Language.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!hasLocalePrefix(pathname) && !request.cookies.has(LOCALE_COOKIE)) {
    const country = COUNTRY_HEADERS.map((name) => request.headers.get(name)).find(Boolean);
    if (country) {
      const locale = country.toUpperCase() === "VN" ? "vi" : "en";
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return intlProxy(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
