import { recommendationsClient } from "../core";
import type { IRecommendation } from "@/types";

export function fetchRecommendations(publicId: string) {
  return recommendationsClient.request<Array<IRecommendation>>({
    url: `recommendations/?userId=${publicId}`,
    method: "GET",
  });
}

export function fetchNewRecommendations(publicId: string) {
  return recommendationsClient.request<Array<IRecommendation>>({
    url: `recommendations/new/?userId=${publicId}`,
    method: "GET",
  });
}
