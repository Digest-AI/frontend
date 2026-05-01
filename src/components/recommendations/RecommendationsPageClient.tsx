"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import SearchRounded from "@mui/icons-material/SearchRounded";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  loadRecommendationEventsPage,
  loadRecommendationFeed,
  type RecommendationFeedMode,
} from "@/app/actions";
import { EventList, EventsPagination } from "@/components/events";
import { Link } from "@/i18n";
import { isError } from "@/requests";
import type { IEvent } from "@/types/parser";
import type { IRecommendation } from "@/types";

import { RecommendationsForYouHeading } from "./RecommendationsForYouHeading";

const PAGE_SIZE = 12;

const ORDERING = [
  { value: "-date_start", labelKey: "sortDateDesc" as const },
  { value: "date_start", labelKey: "sortDateAsc" as const },
  { value: "price_from", labelKey: "sortPriceAsc" as const },
  { value: "-price_from", labelKey: "sortPriceDesc" as const },
];

type Props = {
  publicId: string;
  initialRecommendations: IRecommendation[];
  /** `null` — ошибки не было; строка (в т.ч. пустая) — показать алерт, пустая → общий текст */
  initialRecErrorMessage: string | null;
};

export function RecommendationsPageClient({
  publicId,
  initialRecommendations,
  initialRecErrorMessage,
}: Props) {
  const t = useTranslations("RecommendationsPage");
  const tEvents = useTranslations("Events");
  const [mode, setMode] = useState<RecommendationFeedMode>("all");
  const [recommendations, setRecommendations] = useState(
    initialRecommendations,
  );
  const [recError, setRecError] = useState<string | null>(
    initialRecErrorMessage,
  );
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-date_start");
  const [searchInput, setSearchInput] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

  const [events, setEvents] = useState<IEvent[]>([]);
  const [listCount, setListCount] = useState(0);
  const [eventsError, setEventsError] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const idsInOrder = useMemo(
    () => recommendations.map((r) => r.eventId),
    [recommendations],
  );
  const idsKey = idsInOrder.join(",");

  const totalPages = Math.max(1, Math.ceil(listCount / PAGE_SIZE));

  const newIdsOnPage = useMemo(() => {
    if (mode !== "all") return undefined;
    const recByEventId = new Map(recommendations.map((r) => [r.eventId, r]));
    const set = new Set<number>();
    for (const e of events) {
      if (recByEventId.get(e.id)?.isNew) set.add(e.id);
    }
    return set;
  }, [events, recommendations, mode]);

  useEffect(() => {
    const id = window.setTimeout(
      () => setSearchDebounced(searchInput.trim()),
      400,
    );
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [ordering, searchDebounced, idsKey, mode]);

  useEffect(() => {
    const tp = Math.max(1, Math.ceil(listCount / PAGE_SIZE));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (page > tp) setPage(tp);
  }, [listCount, page]);

  useEffect(() => {
    let cancelled = false;
    if (idsInOrder.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEvents([]);
      setListCount(0);
      setEventsError(false);
      setLoadingEvents(false);
      return;
    }
    setLoadingEvents(true);
    setEventsError(false);
    void loadRecommendationEventsPage(idsInOrder, {
      page,
      page_size: PAGE_SIZE,
      ordering,
      search: searchDebounced || undefined,
    }).then((res) => {
      if (cancelled) return;
      if (isError(res)) {
        setEventsError(true);
        setEvents([]);
        setListCount(0);
      } else {
        setEvents(res.results ?? []);
        setListCount(res.count ?? 0);
      }
      setLoadingEvents(false);
    });
    return () => {
      cancelled = true;
    };
  }, [idsKey, page, ordering, searchDebounced, idsInOrder.length, idsInOrder]);

  const onModeChange = useCallback(
    async (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const next: RecommendationFeedMode = checked ? "new" : "all";
      setMode(next);
      setLoadingRecs(true);
      setRecError(null);
      setPage(1);
      const res = await loadRecommendationFeed(publicId, next);
      setLoadingRecs(false);
      if (isError(res)) {
        setRecError(res.detail ?? "");
        setRecommendations([]);
        return;
      }
      setRecommendations(res);
    },
    [publicId],
  );

  const retryRecs = useCallback(async () => {
    setLoadingRecs(true);
    setRecError(null);
    const res = await loadRecommendationFeed(publicId, mode);
    setLoadingRecs(false);
    if (isError(res)) {
      setRecError(res.detail ?? "");
      setRecommendations([]);
      return;
    }
    setRecommendations(res);
  }, [publicId, mode]);

  const showEmpty =
    recError === null && !loadingRecs && recommendations.length === 0;
  const emptyMessage = mode === "new" ? t("emptyNew") : t("empty");

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}
    >
      <Stack spacing={3} sx={{ alignItems: "stretch" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <RecommendationsForYouHeading />

          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 800, mb: 1 }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 520, mx: "auto" }}
            >
              {t("subtitle")}
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={mode === "new"}
                  onChange={onModeChange}
                  disabled={loadingRecs}
                  color="secondary"
                />
              }
              label={
                <Typography component="span" sx={{ fontWeight: 600 }}>
                  {t("onlyNew")}
                </Typography>
              }
              sx={{ m: 0 }}
            />
            <Button
              component={Link}
              href="/profile"
              variant="outlined"
              size="small"
            >
              {t("goToProfile")}
            </Button>
          </Stack>
        </Box>

        {!showEmpty && recError === null ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { sm: "center" },
              alignSelf: "center",
              width: "100%",
              maxWidth: 720,
            }}
          >
            <TextField
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={tEvents("searchPlaceholder")}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl
              size="small"
              sx={{ minWidth: { sm: 220 }, width: { xs: "100%", sm: "auto" } }}
            >
              <InputLabel id="rec-events-sort-label">
                {tEvents("sortLabel")}
              </InputLabel>
              <Select
                labelId="rec-events-sort-label"
                label={tEvents("sortLabel")}
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                {ORDERING.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {tEvents(o.labelKey)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : null}

        {recError !== null ? (
          <Alert
            severity="error"
            sx={{
              alignSelf: "center",
              width: "100%",
              maxWidth: 560,
              textAlign: "left",
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => void retryRecs()}
              >
                {t("retry")}
              </Button>
            }
          >
            {recError.trim() ? recError : t("loadRecsError")}
          </Alert>
        ) : null}

        {showEmpty ? (
          <Alert
            severity="info"
            sx={{
              alignSelf: "center",
              width: "100%",
              maxWidth: 560,
              textAlign: "left",
            }}
          >
            {emptyMessage}
          </Alert>
        ) : null}

        {!showEmpty && recError === null && loadingEvents ? (
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              width: "100%",
              textAlign: "left",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                sx={{
                  height: { xs: 380, sm: 400 },
                  borderRadius: "18px",
                  bgcolor: "action.hover",
                }}
              />
            ))}
          </Box>
        ) : null}

        {eventsError && !loadingEvents ? (
          <Alert
            severity="warning"
            sx={{
              alignSelf: "center",
              width: "100%",
              maxWidth: 560,
              textAlign: "left",
            }}
          >
            {t("loadEventsError")}
          </Alert>
        ) : null}

        {!loadingEvents && events.length > 0 ? (
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <EventList
              events={events}
              layoutGroupId="recommendations-feed"
              newEventIds={newIdsOnPage}
            />
          </Box>
        ) : null}

        {!showEmpty && recError === null && !loadingEvents && listCount > 0 ? (
          <EventsPagination
            count={totalPages}
            page={page}
            onPageChange={setPage}
            ariaLabel={tEvents("paginationAria")}
          />
        ) : null}
      </Stack>
    </Container>
  );
}
