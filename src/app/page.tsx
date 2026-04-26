"use server";

import { permanentRedirect } from "@/i18n";

export default async function Page() {
  await permanentRedirect("/");
}
