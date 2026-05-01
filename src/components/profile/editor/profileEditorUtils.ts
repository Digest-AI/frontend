import type { IUser } from "@/types";

export const GENDERS = ["male", "female", "other", "unspecified"] as const;

export function normalizeGender(raw: string | undefined) {
  const g = raw?.trim() ?? "";
  if ((GENDERS as readonly string[]).includes(g)) return g;
  return "unspecified";
}

export function categoriesFromUser(p: IUser) {
  const a = p.preferredCategories ?? [];
  if (a.length > 0) return new Set(a);
  return new Set(p.preferredRawCategories ?? []);
}
