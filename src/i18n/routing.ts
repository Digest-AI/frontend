import { defineRouting } from "next-intl/routing";

export const langs = [
  { code: "ro", name: "Română" },
  { code: "ru", name: "Русский" },
];

export const routing = defineRouting({
  locales: langs.map((lang) => lang.code),
  defaultLocale: "ro",
});
