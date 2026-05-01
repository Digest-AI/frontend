import { parserClient } from "../core";
import type { IProvider } from "@/types/parser";

export function fetchProviders() {
  return parserClient.request<Array<IProvider & { count: number }>>({
    url: "sources/",
    method: "GET",
  });
}
