import type { IAuthUser } from "@/types";
import { get, destroy, put } from "./client";

export function fetchAuthUser() {
  return get<IAuthUser>("/user/me/");
}

export function updateAuthUser(request: IAuthUser) {
  return put<IAuthUser>("/user/me/", request);
}

export function deleteAuthUser() {
  return destroy("/user/me/");
}
