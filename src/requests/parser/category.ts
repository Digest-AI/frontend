import { parserClient } from "../core";
import type { ICategory } from "@/types/parser";

export function fetchCategories() {
  return parserClient.request<Array<ICategory & { count: number }>>({
    url: "categories/",
    method: "GET",
  });
}
