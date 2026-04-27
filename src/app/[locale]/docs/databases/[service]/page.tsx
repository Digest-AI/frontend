"use server";

//i18n
import { Link } from "@/i18n";
//utils
import { DATABASES } from "./utils";
//mui components
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default async function Page({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const tables = DATABASES[service];

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
        <Link href="/docs/databases">
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
      </Stack>
      <Grid container spacing={2}>
        {tables.map((table, i) => {
          const hasFks = table.fks.length > 0;
          const hasM2ms = table.m2ms.length > 0;
          return (
            <Grid
              key={i}
              size={{ xs: 12, md: 6, lg: 4 }}
              sx={{ border: "1px solid #e0e0e0" }}
            >
              <Stack key={i} sx={{ p: 2, gap: 2 }}>
                <Typography variant="h4">{table.name}</Typography>
                <Divider />
                <Typography variant="h5">Fields</Typography>
                <List>
                  {table.fields.map((field, j) => {
                    return (
                      <ListItem key={j}>
                        <ListItemText primary={field} />
                      </ListItem>
                    );
                  })}
                </List>
                {hasFks && <Divider />}
                {hasFks && <Typography variant="h5">Foreign Keys</Typography>}
                {hasFks && (
                  <List>
                    {table.fks.map((fk, j) => {
                      return (
                        <ListItem key={j}>
                          <ListItemText primary={fk} />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
                {hasM2ms && <Divider />}
                {hasM2ms && <Typography variant="h5">Many-to-Many</Typography>}
                {hasM2ms && (
                  <List>
                    {table.m2ms.map((m2m, j) => {
                      return (
                        <ListItem key={j}>
                          <ListItemText primary={m2m} />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
