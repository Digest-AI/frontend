"use server";

//i18n
import { Link } from "@/i18n";

//mui components
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default async function Page() {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 4,
      }}
    >
      <Typography variant="h1">Docs</Typography>
      <Link href="/docs/databases">
        <Typography variant="h2" color="primary">
          Databases
        </Typography>
      </Link>
      <Link href="/docs/workflow">
        <Typography variant="h2" color="primary">
          Workflow
        </Typography>
      </Link>
    </Stack>
  );
}
