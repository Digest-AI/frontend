import type { IAuthUser } from "@/types";
import { get, destroy, put } from "./client";

export function fetchAuthUser() {
  return get<IAuthUser>("user/me/");
}

export function updateAuthUser(request: IAuthUser) {
  return put<
    { name: string; surname: string; age: number; gender: string },
    IAuthUser
  >("user/me/", {
    name: request.name,
    surname: request.surname,
    age: request.age,
    gender: request.gender,
  });
}

export function deleteAuthUser() {
  return destroy("user/me/");
}
