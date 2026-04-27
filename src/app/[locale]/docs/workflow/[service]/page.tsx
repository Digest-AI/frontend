"use server";

//i18n
import { Link } from "@/i18n";
//utils
import { WORKFLOWS } from "./utils";
//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

export default async function Page({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const workflow = WORKFLOWS[service];

  return (
    <Stack
      sx={{
        height: "100vh",
        gap: 4,
        p: 4,
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          {service}
        </Typography>
        <Link href="/docs/workflow">
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="h2">Requests</Typography>
        <List>
          {workflow.requests.map((request) => (
            <ListItem
              key={request.who}
              sx={{ flexDirection: "column", alignItems: "flex-start", gap: 1 }}
            >
              <Typography variant="h4">{request.who}</Typography>
              <Typography variant="h5">{request.what}</Typography>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h2">Responds</Typography>
        <List>
          {workflow.responds.map((response) => (
            <ListItem
              key={response.whom}
              sx={{ flexDirection: "column", alignItems: "flex-start", gap: 1 }}
            >
              <Typography variant="h4">{response.whom}</Typography>
              <Typography variant="h5">{response.what}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
