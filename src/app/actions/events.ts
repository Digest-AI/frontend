"use server";

import {
  fetchCategories,
  fetchEvent,
  fetchEventsList,
  fetchEventsPreset,
  fetchProviders,
  type EventsListQuery,
  type EventsPeriodPreset,
} from "@/requests/parser";

export async function getEventDetail(id: number) {
  return fetchEvent(id);
}

export async function getEventsPreset(
  preset: EventsPeriodPreset,
  params?: Pick<EventsListQuery, "ordering" | "page" | "page_size">,
) {
  return fetchEventsPreset(preset, params);
}

export async function getEventsList(query: EventsListQuery) {
  return fetchEventsList(query);
}

export async function getParserSources() {
  return fetchProviders();
}

export async function getParserCategories() {
  return fetchCategories();
}
