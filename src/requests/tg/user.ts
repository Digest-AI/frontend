import { tgClient } from "../core";
import type { ITGUser } from "@/types";

export async function fetchTGUser(publicId: string) {
  return tgClient.request<ITGUser>({
    url: `users/${publicId}/`,
  });
}

export async function deleteTGUser(publicId: string) {
  return tgClient.request<void>({
    url: `users/${publicId}/`,
    method: "DELETE",
  });
}
