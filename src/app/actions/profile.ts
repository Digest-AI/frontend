"use server";

import { updateAuthUser } from "@/requests";
import type { IAuthUser } from "@/types";

export async function saveAuthUserProfile(user: IAuthUser) {
  return updateAuthUser(user);
}
