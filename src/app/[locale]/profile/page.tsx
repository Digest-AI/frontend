import { isLoggedIn } from "@/app/actions";
import { fetchRecommendationsProfile } from "@/app/actions/recommendationsProfile";
import { ProfileEditor } from "@/components/profile";
import { redirect } from "@/i18n";
import { isError } from "@/requests";
import { fetchAuthUser } from "@/requests/user";
import type { IUser } from "@/types";

function emptyPreferences(publicId: string): IUser {
  return {
    userId: publicId,
    preferredCategories: [],
    preferredRawCategories: [],
    maxPrice: 0,
    freeOnly: false,
  };
}

export default async function ProfilePage() {
  if (!(await isLoggedIn())) {
    await redirect("/auth");
  }

  const res = await fetchAuthUser();
  if (isError(res)) {
    await redirect("/auth");
    return null;
  }

  const rec = await fetchRecommendationsProfile(res.publicId);

  let initialPreferences: IUser;
  let recommendationsMissing: boolean;
  let preferencesLoadError: string | null = null;

  if (isError(rec)) {
    initialPreferences = emptyPreferences(res.publicId);
    if (rec.code === 404) {
      recommendationsMissing = true;
    } else {
      recommendationsMissing = false;
      preferencesLoadError = rec.detail?.trim() ? rec.detail : null;
    }
  } else {
    initialPreferences = rec;
    recommendationsMissing = false;
  }

  return (
    <ProfileEditor
      initialUser={res}
      initialPreferences={initialPreferences}
      recommendationsMissing={recommendationsMissing}
      preferencesLoadError={preferencesLoadError}
    />
  );
}
