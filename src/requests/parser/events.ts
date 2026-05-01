import { parserClient } from "../core";
import type { IDetailedEvent, IEventList } from "@/types/parser";

export function fetchEventsForLanding() {
  return parserClient.request<IEventList>({
    url: "events/next-7-days/?page_size=8",
    method: "GET",
  });
}

export function fetchEvent(id: number) {
  return parserClient.request<IDetailedEvent>({
    url: `events/${id}/`,
    method: "GET",
  });
}
