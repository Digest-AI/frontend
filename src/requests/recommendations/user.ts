import { recommendationsClient } from "../core";
import type { IUser } from "@/types";

export function createProfile(user: IUser) {
  return recommendationsClient.request<IUser>({
    url: "profiles/",
    method: "POST",
    data: { ...user, maxPrice: user.freeOnly ? 0 : Math.max(user.maxPrice, 0) },
  });
}

export function fetchProfile(publicId: string) {
  return recommendationsClient.request<IUser>({
    url: `profiles/${publicId}/`,
    method: "GET",
  });
}

export async function editProfile(publicId: string, user: IUser) {
  return recommendationsClient.request<IUser>({
    url: `profiles/${publicId}/`,
    method: "PATCH",
    data: { ...user, maxPrice: user.freeOnly ? 0 : Math.max(user.maxPrice, 0) },
  });
}

export async function deleteProfile(publicId: string) {
  return recommendationsClient.request<null>({
    url: `profiles/${publicId}/`,
    method: "DELETE",
  });
}
