"use server";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { redirect, routing } from "@/i18n";
import { Footer, Header } from "@/components/layout";

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
    await redirect("/");
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <Stack spacing={0} sx={{ minHeight: "100%" }}>
        <Header />
        <Stack
          id="main"
          component="main"
          sx={{
            flex: 1,
            minHeight: "100%",
          }}
        >
          {children}
        </Stack>
        <Footer />
      </Stack>
    </NextIntlClientProvider>
  );
}
