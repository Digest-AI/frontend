"use server";

import { cookies } from "next/headers";
import { ITokens } from "@/types";

export async function getToken(type = "access") {
  const cookieStore = await cookies();
  return cookieStore.get(`${type}_token`)?.value;
}

export async function getPublicId() {
  const cookieStore = await cookies();
  return cookieStore.get(`public_id`)?.value;
}

export async function createRefreshTTL(longRefresh = false) {
  return {
    name: "refresh_token_long",
    value: longRefresh ? "true" : "false",
    maxAge: 2_592_000, //30 days
    path: "/",
    secure: true,
  };
}

export async function createToken(
  type: string,
  token: string,
  longRefresh = false,
) {
  return {
    name: `${type}_token`,
    value: token,
    maxAge: type === "refresh" ? (longRefresh ? 2_592_000 : 86_400) : 1_800, //30 days or 1 day or 30 minutes
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict" as const,
    priority: "high" as const,
  };
}

export async function createPublicId(publicId: string) {
  return {
    name: `public_id`,
    value: publicId,
    maxAge: 2_592_000, //30 days
    path: "/",
    secure: true,
  };
}

export async function setTokens(tokens: ITokens) {
  const cookieStore = await cookies();
  const [accessToken, refreshToken, refreshTokenLong] = await Promise.all([
    createToken("access", tokens.access),
    createToken("refresh", tokens.refresh, tokens.longRefresh),
    createRefreshTTL(tokens.longRefresh),
  ]);
  cookieStore.set(accessToken);
  cookieStore.set(refreshToken);
  cookieStore.set(refreshTokenLong);
}

export async function setPublicId(publicId: string) {
  const cookieStore = await cookies();
  const publicIdCookie = await createPublicId(publicId);
  cookieStore.set(publicIdCookie);
}

export async function deleteTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(`access_token`);
  cookieStore.delete(`refresh_token`);
  cookieStore.delete(`refresh_token_long`);
}

export async function deletePublicId() {
  const cookieStore = await cookies();
  cookieStore.delete(`public_id`);
}

export async function isLoggedIn() {
  const refresh = await getToken("refresh");
  return refresh !== undefined;
}
