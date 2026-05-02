"use server";

import { verifyTGUser } from "@/requests/tg/verfication";

export async function verifyTelegramLink(publicId: string, code: string) {
  return verifyTGUser({ publicId, code: code.trim() });
}
