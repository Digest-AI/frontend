"use server";

import { redirect } from "@/i18n";
import { isLoggedIn } from "@/app/actions";
import { AuthWrapper } from "@/components/auth";
import { AuthProvider } from "@/providers";

//mui components
import Stack from "@mui/material/Stack";

export default async function Page() {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    await redirect("/");
    return;
  }

  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <AuthProvider value={undefined}>
        <AuthWrapper />
      </AuthProvider>
    </Stack>
  );
}
