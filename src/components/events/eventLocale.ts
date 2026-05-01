import { format, parseISO } from "date-fns";
import { ro, ru } from "date-fns/locale";

import type { ICategory, IDetailedEvent, IEvent } from "@/types/parser";

export function eventTitle(event: IEvent, locale: string) {
  return locale === "ru"
    ? event.titleRu || event.titleRo
    : event.titleRo || event.titleRu;
}

export function eventDescription(detailed: IDetailedEvent, locale: string) {
  return locale === "ru"
    ? detailed.descriptionRu || detailed.descriptionRo
    : detailed.descriptionRo || detailed.descriptionRu;
}

export function categoryLabel(category: ICategory, locale: string) {
  return locale === "ru"
    ? category.nameRu || category.nameRo
    : category.nameRo || category.nameRu;
}

const df = { ru, ro } as const;

export function formatEventDateRange(
  dateStart: string,
  dateEnd: string | undefined | null,
  locale: string,
) {
  const loc = locale === "ru" ? df.ru : df.ro;
  const line = (iso: string) => {
    try {
      return format(parseISO(iso), "d MMM, HH:mm", { locale: loc });
    } catch {
      return iso;
    }
  };
  const start = line(dateStart);
  if (!dateEnd) return start;
  return `${start} — ${line(dateEnd)}`;
}

export function formatLocationLine(event: Pick<IEvent, "city" | "place" | "address">) {
  return [event.city, event.place, event.address].filter(Boolean).join(" · ");
}

export function formatPriceMdl(event: Pick<IEvent, "priceFrom" | "priceTo">) {
  const from = event.priceFrom?.trim();
  const to = event.priceTo?.trim();
  if (!from && !to) return "—";
  const core = from === to ? from || to || "" : [from, to].filter(Boolean).join(" — ");
  if (!core) return "—";
  return `${core} MDL`;
}
