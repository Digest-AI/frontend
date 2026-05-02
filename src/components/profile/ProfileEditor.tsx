"use client";

import { useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  createRecommendationsProfile,
  logoutThis,
  saveAuthUserProfile,
  updateRecommendationsProfile,
} from "@/app/actions";
import { CATEGORY_SLUGS } from "@/components/category";
import { isError } from "@/requests";
import type { IAuthUser, IUser } from "@/types";

import type { ProfileTelegramInitial } from "./editor/ProfileTelegramPanel";
import { ProfileAccountForm } from "./editor/ProfileAccountForm";
import { ProfileEmailCard } from "./editor/ProfileEmailCard";
import { ProfilePasswordCard } from "./editor/ProfilePasswordCard";
import { ProfilePreferencesPanel } from "./editor/ProfilePreferencesPanel";
import { ProfileTelegramPanel } from "./editor/ProfileTelegramPanel";
import {
  categoriesFromUser,
  normalizeGender,
} from "./editor/profileEditorUtils";

type Props = {
  initialUser: IAuthUser;
  initialPreferences: IUser;
  recommendationsMissing: boolean;
  preferencesLoadError: string | null;
  telegramInitial: ProfileTelegramInitial;
};

export function ProfileEditor({
  initialUser,
  initialPreferences,
  recommendationsMissing,
  preferencesLoadError,
  telegramInitial,
}: Props) {
  const t = useTranslations("Profile");
  const [user, setUser] = useState<IAuthUser>(initialUser);
  const [name, setName] = useState(initialUser.name ?? "");
  const [surname, setSurname] = useState(initialUser.surname ?? "");
  const [ageInput, setAgeInput] = useState(
    initialUser.age !== undefined && initialUser.age !== null
      ? String(initialUser.age)
      : "",
  );
  const [gender, setGender] = useState(() =>
    normalizeGender(initialUser.gender),
  );

  const [missingRecProfile, setMissingRecProfile] = useState(
    recommendationsMissing,
  );
  const [pickedCategories, setPickedCategories] = useState<Set<string>>(() =>
    categoriesFromUser(initialPreferences),
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    String(initialPreferences.maxPrice ?? 0),
  );
  const [freeOnly, setFreeOnly] = useState(initialPreferences.freeOnly);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [accountError, setAccountError] = useState<string | null>(null);
  const [accountSaved, setAccountSaved] = useState(false);
  const [accountPending, startAccountTransition] = useTransition();

  const [prefError, setPrefError] = useState<string | null>(null);
  const [prefSaved, setPrefSaved] = useState(false);
  const [prefPending, startPrefTransition] = useTransition();

  const [logoutPending, startLogoutTransition] = useTransition();

  function toggleCategory(slug: string) {
    setPickedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function submitAccount() {
    setAccountError(null);
    setAccountSaved(false);

    const ageNum = ageInput.trim() === "" ? 0 : Number.parseInt(ageInput, 10);
    if (
      ageInput.trim() !== "" &&
      (Number.isNaN(ageNum) || ageNum < 0 || ageNum > 130)
    ) {
      setAccountError(t("ageInvalid"));
      return;
    }

    if (name.trim() === "" || surname.trim() === "") {
      setAccountError(t("nameRequired"));
      return;
    }

    const payload: IAuthUser = {
      ...user,
      name: name.trim(),
      surname: surname.trim(),
      age: ageNum,
      gender: gender || "unspecified",
    };

    startAccountTransition(() => {
      void saveAuthUserProfile(payload).then((res) => {
        if (isError(res)) {
          setAccountError(
            res.detail?.trim() ? res.detail : t("saveErrorAccount"),
          );
          return;
        }
        setUser(res);
        setAccountSaved(true);
      });
    });
  }

  function submitPreferences() {
    setPrefError(null);
    setPrefSaved(false);

    if (missingRecProfile && !privacyAccepted) {
      return;
    }

    const maxRaw = maxPriceInput.trim();
    const maxPrice = maxRaw === "" ? 0 : Number(maxRaw);
    if (Number.isNaN(maxPrice) || maxPrice < 0) {
      setPrefError(t("maxPriceInvalid"));
      return;
    }

    const cats = Array.from(pickedCategories);
    const payload: IUser = {
      userId: user.publicId,
      preferredCategories: cats,
      preferredRawCategories: cats,
      maxPrice: maxPrice,
      freeOnly: freeOnly,
    };

    startPrefTransition(() => {
      const req = missingRecProfile
        ? createRecommendationsProfile(payload)
        : updateRecommendationsProfile(user.publicId, payload);

      void req.then((res) => {
        if (isError(res)) {
          setPrefError(
            res.detail?.trim() ? res.detail : t("saveErrorPreferences"),
          );
          return;
        }
        setMissingRecProfile(false);
        setMaxPriceInput(String(res.maxPrice ?? 0));
        setFreeOnly(res.freeOnly);
        setPickedCategories(categoriesFromUser(res));
        setPrivacyAccepted(false);
        setPrefSaved(true);
      });
    });
  }

  const preferencesSaveDisabled =
    prefPending || (missingRecProfile && !privacyAccepted);

  const selectedSlugs = useMemo(
    () => CATEGORY_SLUGS.filter((s) => pickedCategories.has(s)),
    [pickedCategories],
  );
  const unselectedSlugs = useMemo(
    () => CATEGORY_SLUGS.filter((s) => !pickedCategories.has(s)),
    [pickedCategories],
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
          {t("title")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            alignItems: "start",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          }}
        >
          <Stack spacing={2} sx={{ height: "100%" }}>
            <ProfileEmailCard email={user.email} isVerified={user.isVerified} />
            <ProfilePasswordCard />
            <ProfileAccountForm
              name={name}
              surname={surname}
              ageInput={ageInput}
              gender={gender}
              onNameChange={setName}
              onSurnameChange={setSurname}
              onAgeChange={setAgeInput}
              onGenderChange={setGender}
              accountError={accountError}
              accountSaved={accountSaved}
              accountPending={accountPending}
              onDismissError={() => setAccountError(null)}
              onSubmit={submitAccount}
            />
            <Button
              type="button"
              variant="outlined"
              color="error"
              disabled={
                logoutPending || accountPending || prefPending
              }
              onClick={() => {
                startLogoutTransition(() => {
                  void logoutThis();
                });
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {logoutPending ? t("loggingOut") : t("logout")}
            </Button>
          </Stack>

          <ProfilePreferencesPanel
            preferencesLoadError={preferencesLoadError}
            selectedSlugs={selectedSlugs}
            unselectedSlugs={unselectedSlugs}
            onToggleCategory={toggleCategory}
            maxPriceInput={maxPriceInput}
            onMaxPriceChange={setMaxPriceInput}
            freeOnly={freeOnly}
            onFreeOnlyChange={setFreeOnly}
            missingRecProfile={missingRecProfile}
            privacyAccepted={privacyAccepted}
            onPrivacyAcceptedChange={setPrivacyAccepted}
            prefError={prefError}
            prefSaved={prefSaved}
            preferencesSaveDisabled={preferencesSaveDisabled}
            prefPending={prefPending}
            onDismissPrefError={() => setPrefError(null)}
            onSubmitPreferences={submitPreferences}
          />
        </Box>

        <ProfileTelegramPanel publicId={user.publicId} initial={telegramInitial} />
      </Stack>
    </Container>
  );
}
