import { addDays, endOfWeek, format, startOfDay, startOfWeek } from "date-fns";

import { parserClient } from "../core";

import type { IDetailedEvent, IEventList } from "@/types/parser";

export type EventsPeriodPreset =
  | "this-week"
  | "today"
  | "upcoming"
  | "next-7-days"
  | "next-14-days"
  | "next-month"
  | "next-3-months";

const PRESET_PATHS: Record<EventsPeriodPreset, string> = {
  "this-week": "events/this-week/",
  today: "events/today/",
  upcoming: "events/upcoming/",
  "next-7-days": "events/next-7-days/",
  "next-14-days": "events/next-14-days/",
  "next-month": "events/next-month/",
  "next-3-months": "events/next-3-months/",
};

export type EventsListQuery = {
  category?: string;
  provider?: string;
  q?: string;
  date_from?: string;
  date_to?: string;
  place?: string;
  price_min?: string;
  price_max?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
};

/** Те же окна дат, что и у пресетов API, для `GET events/` (сортировка/пагинация там работают). */
export function listDateRangeForPreset(preset: EventsPeriodPreset): {
  date_from?: string;
  date_to?: string;
} {
  const today = startOfDay(new Date());
  const ymd = (d: Date) => format(d, "yyyy-MM-dd");

  switch (preset) {
    case "today":
      return { date_from: ymd(today), date_to: ymd(today) };
    case "this-week": {
      const start = startOfWeek(today, { weekStartsOn: 1 });
      const end = endOfWeek(today, { weekStartsOn: 1 });
      return { date_from: ymd(start), date_to: ymd(end) };
    }
    case "upcoming":
      return { date_from: ymd(today) };
    case "next-7-days":
      return { date_from: ymd(today), date_to: ymd(addDays(today, 7)) };
    case "next-14-days":
      return { date_from: ymd(today), date_to: ymd(addDays(today, 14)) };
    case "next-month":
      return { date_from: ymd(today), date_to: ymd(addDays(today, 30)) };
    case "next-3-months":
      return { date_from: ymd(today), date_to: ymd(addDays(today, 90)) };
  }
}

export function fetchEventsPreset(
  preset: EventsPeriodPreset,
  params?: Pick<EventsListQuery, "ordering" | "page" | "page_size">,
) {
  return parserClient.request<IEventList>({
    url: PRESET_PATHS[preset],
    method: "GET",
    params,
  });
}

export function fetchEventsList(params: EventsListQuery) {
  return parserClient.request<IEventList>({
    url: "events/",
    method: "GET",
    params,
  });
}

export function fetchEventsForLanding() {
  return fetchEventsPreset("next-7-days", { page_size: 8 });
}

export function fetchEvent(id: number) {
  return parserClient.request<IDetailedEvent>({
    url: `events/${id}/`,
    method: "GET",
  });
}
