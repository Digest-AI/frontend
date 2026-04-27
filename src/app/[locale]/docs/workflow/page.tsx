"use server";

//i18n
import { Link } from "@/i18n";

//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SERVICES = [
  "user-service",
  "parser-service",
  "recommendations-service",
  "tg-service",
];

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
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", gap: 8 }}
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Workflow
        </Typography>
        <Link href="/docs">
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
      </Stack>
      {SERVICES.map((service) => (
        <Link href={`/docs/workflow/${service}`} key={service}>
          <Typography variant="h3" color="primary">
            {service.split("-")[0]}
          </Typography>
        </Link>
      ))}
    </Stack>
  );
}
