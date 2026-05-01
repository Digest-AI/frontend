"use server";

import { fetchEvent } from "@/requests/parser";

export async function getEventDetail(id: number) {
  return fetchEvent(id);
}
