import { post } from "./client";
import { getToken } from "@/app/actions";
import type { ITokens, RefreshTokenRequest } from "@/types";

export async function sendLogoutRequest(all = false) {
  const access = await getToken("access");

  if (!access) {
    return { code: 401, detail: "unauthorized" };
  }

  const refresh = await getToken("refresh");

  if (!refresh) {
    return { code: 401, detail: "unauthorized" };
  }

  return post<RefreshTokenRequest, ITokens>(
    `/logout${all ? "-all" : ""}/`,
    { refresh },
    true,
  );
}
