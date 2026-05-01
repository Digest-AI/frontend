import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./middlewareFactoryType";
import {
  createAuthRedirect,
  extractRequestTokens,
  updateResponseTokens,
} from "@/utils/cookies";
import { logger, maskToken } from "./logger";

const AUTH_URL = process.env.NEXT_PUBLIC_USER_URL!;

const log = logger("auth");

export const authMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const requiresAuth = pathname.includes("/profile");

    if (!requiresAuth) {
      return next(request, _next);
    }

    let response = (await next(request, _next)) as
      | NextResponse
      | undefined
      | null
      | void;
    if (!response) {
      response = NextResponse.next();
    }

    // Extract tokens from cookies
    const tokens = extractRequestTokens(request);

    log.info("incoming request", {
      pathname,
      hasAccess: Boolean(tokens.access),
      access: maskToken(tokens.access),
      hasRefresh: Boolean(tokens.refresh),
      refresh: maskToken(tokens.refresh),
    });

    // Step 1: Validate refresh token (required)
    if (!tokens.refresh) {
      log.warn("missing refresh token; redirecting to auth");
      return createAuthRedirect(request);
    }

    // Step 2: Ensure access token is valid (refresh if needed)
    if (!tokens.access) {
      log.info("refreshing access token", {
        refresh: maskToken(tokens.refresh),
      });

      try {
        const refreshRes = await fetch(`${AUTH_URL}/api/auth/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: tokens.refresh }),
        });

        if (!refreshRes.ok) {
          log.warn(`failed to refresh access token`, {
            status: refreshRes.status,
            detail: await refreshRes.json(),
          });
          return createAuthRedirect(request);
        }
        const refreshedTokens = await refreshRes.json();
        if (!refreshedTokens) {
          return createAuthRedirect(request);
        }
        await updateResponseTokens(response, refreshedTokens);
        log.info("set new access and refresh tokens (token rotation)", {
          access: maskToken(refreshedTokens.access),
          refresh: maskToken(refreshedTokens.refresh),
        });
      } catch (error) {
        log.error("refresh request threw", { error });
        return createAuthRedirect(request);
      }
    }

    return response;
  };
};
