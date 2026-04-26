import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n";
import { NextRequest, NextFetchEvent } from "next/server";
import { MiddlewareFactory } from "./middlewareFactoryType";

const localesMiddleware = createMiddleware(routing);

const excludedRoutes = [
  "api",
  "trpc",
  "_next",
  "_vercel",
  ".well-known",
  "images",
  "favicon.ico",
  "logo.png",
  "manifest",
  "robots.txt",
  "sitemap.xml",
];

export const localesMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    // Skip locale middleware for excluded routes (API routes, static files, etc.)
    const isExcluded = excludedRoutes.some(
      (route) => pathname.startsWith(`/${route}`) || pathname === `/${route}`,
    );

    if (!isExcluded) {
      return localesMiddleware(request);
    }
    return next(request, _next);
  };
};
