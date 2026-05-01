import { isLoggedIn, loadRecommendationFeed } from "@/app/actions";
import { RecommendationsPageClient } from "@/components/recommendations";
import { redirect } from "@/i18n";
import { isError } from "@/requests";
import { fetchAuthUser } from "@/requests/user";

export default async function RecommendationsPage() {
  if (!(await isLoggedIn())) {
    await redirect("/auth");
  }

  const user = await fetchAuthUser();
  if (isError(user)) {
    await redirect("/auth");
    return null;
  }

  const raw = await loadRecommendationFeed(user.publicId, "all");
  const initialRecommendations = isError(raw) ? [] : raw;
  const initialRecErrorMessage = isError(raw)
    ? (raw.detail?.trim() ?? "")
    : null;

  return (
    <RecommendationsPageClient
      publicId={user.publicId}
      initialRecommendations={initialRecommendations}
      initialRecErrorMessage={initialRecErrorMessage}
    />
  );
}
