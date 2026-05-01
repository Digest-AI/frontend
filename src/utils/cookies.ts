import { createToken, createRefreshTTL } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";
import { ITokens } from "@/types";

export async function updateResponseCookie(
  response: NextResponse,
  type: string,
  value: string,
  longRefresh = false,
) {
  const tokenCookie = await createToken(type, value, longRefresh);
  const { name: tokenName, value: tokenValue, ...tokenOptions } = tokenCookie;
  response.cookies.set(tokenName, tokenValue, tokenOptions);
  return response;
}

export function extractRequestToken(
  request: NextRequest,
  type: "access" | "refresh" | "subscriptions",
) {
  return request.cookies.get(`${type}_token`)?.value;
}

export function extractRequestTokens(request: NextRequest) {
  return {
    access: extractRequestToken(request, "access"),
    refresh: extractRequestToken(request, "refresh"),
  };
}

export async function updateResponseTokens(
  response: NextResponse,
  tokens: ITokens,
) {
  response = await updateResponseCookie(response, "access", tokens.access);
  response = await updateResponseCookie(
    response,
    "refresh",
    tokens.refresh,
    tokens.longRefresh,
  );

  const refreshTokenLongCookie = await createRefreshTTL(tokens.longRefresh);
  const {
    name: refreshTokenLongName,
    value: refreshTokenLongValue,
    ...refreshTokenLongOptions
  } = refreshTokenLongCookie;
  response.cookies.set(
    refreshTokenLongName,
    refreshTokenLongValue,
    refreshTokenLongOptions,
  );

  return response;
}

export function createAuthRedirect(request: NextRequest): NextResponse {
  const redirectResponse = NextResponse.redirect(
    new URL("/auth", request.nextUrl.origin),
  );
  redirectResponse.cookies.delete("refresh_token");
  redirectResponse.cookies.delete("refresh_token_long");
  return redirectResponse;
}
