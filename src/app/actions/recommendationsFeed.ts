"use server";

import {
  isError,
  fetchEventsByIds,
  fetchNewRecommendations,
  fetchRecommendations,
} from "@/requests";
import type { IEventList } from "@/types/parser";

export type RecommendationFeedMode = "all" | "new";

export type LoadRecommendationEventsOptions = {
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
};

export async function loadRecommendationFeed(
  publicId: string,
  mode: RecommendationFeedMode,
) {
  const res =
    mode === "new"
      ? await fetchNewRecommendations(publicId)
      : await fetchRecommendations(publicId);
  return res;
}

/** POST by-ids + query: ordering, page, page_size, search. */
export async function loadRecommendationEventsPage(
  ids: number[],
  options: LoadRecommendationEventsOptions,
) {
  if (ids.length === 0) {
    const empty: IEventList = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
    return empty;
  }

  const res = await fetchEventsByIds(ids, {
    ordering: options.ordering,
    page: options.page ?? 1,
    page_size: options.page_size ?? 12,
    search: options.search?.trim() ? options.search.trim() : undefined,
  });

  if (isError(res)) {
    return res;
  }

  return res;
}
