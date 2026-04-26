"use server";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { redirect, routing } from "@/i18n";

//mui components
import Stack from "@mui/material/Stack";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    await redirect("/en");
  }

  return (
    <NextIntlClientProvider>
      <Stack
        id="main"
        component="main"
        sx={{
          minHeight: "100%",
        }}
      >
        {children}
      </Stack>
    </NextIntlClientProvider>
  );
}
