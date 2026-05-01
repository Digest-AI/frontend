"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  getEventsList,
  getParserCategories,
  getParserSources,
} from "@/app/actions";
import { isError } from "@/requests";
import {
  listDateRangeForPreset,
  type EventsPeriodPreset,
} from "@/requests/parser";
import type { ICategory, IEventList, IProvider } from "@/types/parser";

import { EventsPeriodSelector } from "./EventsPeriodSelector";
import { categoryLabel } from "./eventLocale";
import { EventList } from "./List";

const PAGE_SIZE = 12;

const PRESETS: EventsPeriodPreset[] = [
  "this-week",
  "today",
  "upcoming",
  "next-7-days",
  "next-14-days",
  "next-month",
  "next-3-months",
];

const ORDERING = [
  { value: "-date_start", labelKey: "sortDateDesc" as const },
  { value: "date_start", labelKey: "sortDateAsc" as const },
  { value: "price_from", labelKey: "sortPriceAsc" as const },
  { value: "-price_from", labelKey: "sortPriceDesc" as const },
];

export function EventsBrowsePage() {
  const t = useTranslations("Events");
  const locale = useLocale();

  const [period, setPeriod] = useState<EventsPeriodPreset>("this-week");
  const [ordering, setOrdering] = useState("-date_start");
  const [page, setPage] = useState(1);

  const [qInput, setQInput] = useState("");
  const [qDebounced, setQDebounced] = useState("");

  const [categorySlug, setCategorySlug] = useState("");
  const [providerSlug, setProviderSlug] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [place, setPlace] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [sources, setSources] = useState<Array<IProvider & { count: number }>>(
    [],
  );
  const [categories, setCategories] = useState<
    Array<ICategory & { count: number }>
  >([]);
  const [metaError, setMetaError] = useState(false);

  const [list, setList] = useState<IEventList | null>(null);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setQDebounced(qInput.trim()), 400);
    return () => window.clearTimeout(id);
  }, [qInput]);

  const hasCustomDateRange = Boolean(dateFrom || dateTo);
  const range = hasCustomDateRange
    ? {
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      }
    : listDateRangeForPreset(period);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [
    period,
    ordering,
    qDebounced,
    categorySlug,
    providerSlug,
    dateFrom,
    dateTo,
    place,
    priceMin,
    priceMax,
  ]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const s = await getParserSources();
      const c = await getParserCategories();
      if (cancelled) return;
      if (isError(s) || isError(c)) {
        setMetaError(true);
      } else {
        setMetaError(false);
        setSources(s);
        setCategories(c);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setListError(null);

    void (async () => {
      const res = await getEventsList({
        q: qDebounced || undefined,
        category: categorySlug || undefined,
        provider: providerSlug || undefined,
        date_from: range.date_from,
        date_to: range.date_to,
        place: place.trim() || undefined,
        price_min: priceMin || undefined,
        price_max: priceMax || undefined,
        ordering,
        page,
        page_size: PAGE_SIZE,
      });

      if (cancelled) return;

      if (isError(res)) {
        setList(null);
        setListError(t("loadError"));
      } else {
        setList(res);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [
    period,
    ordering,
    page,
    qDebounced,
    categorySlug,
    providerSlug,
    dateFrom,
    dateTo,
    range.date_from,
    range.date_to,
    place,
    priceMin,
    priceMax,
    t,
  ]);

  const pageCount = list ? Math.max(1, Math.ceil(list.count / PAGE_SIZE)) : 1;

  function clearAdvanced() {
    setQInput("");
    setQDebounced("");
    setCategorySlug("");
    setProviderSlug("");
    setDateFrom("");
    setDateTo("");
    setPlace("");
    setPriceMin("");
    setPriceMax("");
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
          {t("title")}
        </Typography>

        {metaError ? <Alert severity="warning">{t("metaError")}</Alert> : null}

        <Stack spacing={2}>
          <EventsPeriodSelector
            presets={PRESETS}
            value={period}
            onChange={setPeriod}
            getLabel={(p) => t(`period.${p}`)}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: { sm: "center" } }}
          >
            <TextField
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder={t("searchPlaceholder")}
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
            <FormControl size="small" sx={{ minWidth: { sm: 220 } }}>
              <InputLabel id="events-sort-label">{t("sortLabel")}</InputLabel>
              <Select
                labelId="events-sort-label"
                label={t("sortLabel")}
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                {ORDERING.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {t(o.labelKey)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Accordion
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <Typography sx={{ fontWeight: 600 }}>
                {t("advancedTitle")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  useFlexGap
                >
                  <FormControl size="small" fullWidth>
                    <InputLabel id="events-category-label">
                      {t("category")}
                    </InputLabel>
                    <Select
                      labelId="events-category-label"
                      label={t("category")}
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                    >
                      <MenuItem value="">{t("all")}</MenuItem>
                      {categories.map((c) => (
                        <MenuItem key={c.id} value={c.slug}>
                          {categoryLabel(c, locale)} ({c.count})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="events-provider-label">
                      {t("provider")}
                    </InputLabel>
                    <Select
                      labelId="events-provider-label"
                      label={t("provider")}
                      value={providerSlug}
                      onChange={(e) => setProviderSlug(e.target.value)}
                    >
                      <MenuItem value="">{t("all")}</MenuItem>
                      {sources.map((s) => (
                        <MenuItem key={s.id} value={s.slug}>
                          {s.name} ({s.count})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  useFlexGap
                >
                  <TextField
                    label={t("dateFrom")}
                    type="date"
                    size="small"
                    fullWidth
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <TextField
                    label={t("dateTo")}
                    type="date"
                    size="small"
                    fullWidth
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Stack>
                <TextField
                  label={t("place")}
                  size="small"
                  fullWidth
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  useFlexGap
                >
                  <TextField
                    label={t("priceMin")}
                    size="small"
                    fullWidth
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                  <TextField
                    label={t("priceMax")}
                    size="small"
                    fullWidth
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </Stack>
                <Button
                  variant="outlined"
                  onClick={clearAdvanced}
                  sx={{ alignSelf: "flex-start" }}
                >
                  {t("clearFilters")}
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>

        {listError ? <Alert severity="error">{listError}</Alert> : null}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : list && list.results.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 4 }}>
            {t("empty")}
          </Typography>
        ) : list ? (
          <>
            <EventList events={list.results} layoutGroupId="events-browse" />
            {pageCount > 1 ? (
              <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, p) => setPage(p)}
                  color="primary"
                />
              </Box>
            ) : null}
          </>
        ) : null}
      </Stack>
    </Container>
  );
}
