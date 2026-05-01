import axios, { AxiosError } from "axios";
import { setupCache, type CacheRequestConfig } from "axios-cache-interceptor";
import { createNamespacedStorage, type ServiceName } from "./storage";
import { IError } from "@/types";
import { getLocale } from "next-intl/server";

type RequestFn = <T>(
  requestConfig: CacheRequestConfig & { requiresAuth?: boolean },
  customToken?: string,
) => ResWithError<T>;

export type ResWithError<T> = Promise<T | IError>;

export type ServiceConfig = {
  name: ServiceName;
  baseURL: string;
};

export type ServiceClient = {
  name: ServiceName;
  request: RequestFn;
  clearCache: () => Promise<void>;
};

function readAcceptLanguage(headers: unknown): string {
  if (headers == null || typeof headers !== "object") return "";
  const h = headers as { get?: (k: string) => unknown };
  if (typeof h.get === "function") {
    const v = h.get("Accept-Language");
    if (typeof v === "string") return v;
  }
  const raw = (headers as Record<string, unknown>)["Accept-Language"];
  return typeof raw === "string" ? raw : "";
}

function cacheRequestKey(request: {
  method?: string;
  url?: string;
  params?: unknown;
  headers?: unknown;
}): string {
  const method = request.method?.toLowerCase() ?? "get";
  const url = request.url ?? "";
  const lang = readAcceptLanguage(request.headers);
  let paramsKey = "";
  const raw = request.params;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const entries = Object.entries(raw as Record<string, unknown>)
      .filter(
        ([, v]) => v !== undefined && v !== null && v !== "" && v !== false,
      )
      .sort(([a], [b]) => a.localeCompare(b));
    paramsKey = JSON.stringify(entries);
  }
  return `${method}_${url}_${lang}_${paramsKey}`;
}

export function createServiceClient(config: ServiceConfig): ServiceClient {
  const api = setupCache(
    axios.create({
      baseURL: config.baseURL + "api/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    }),
    {
      storage: createNamespacedStorage(config.name),
      generateKey: (request) =>
        cacheRequestKey(
          request as {
            method?: string;
            url?: string;
            params?: unknown;
            headers?: unknown;
          },
        ),
      ttl: 1000 * 60 * 5, // 5 minutes
      interpretHeader: false,
      methods: ["get", "head", "options"],
      cachePredicate: {
        statusCheck: (status) => status >= 200 && status < 300,
      },
    },
  );

  const request: RequestFn = async (requestConfig) => {
    const locale = await getLocale();

    const params: Record<string, string> = {};
    if (requestConfig.params) {
      for (const [key, value] of Object.entries(requestConfig.params)) {
        if (value) {
          params[key] = value.toString();
        }
      }
    }

    try {
      const response = await api.request({
        ...requestConfig,
        method: requestConfig.method ?? "GET",
        headers: {
          ...requestConfig.headers,
          "Accept-Language": locale,
          "Content-Type":
            requestConfig.headers?.["Content-Type"] ?? "application/json",
        },
        params,
        cache: requestConfig.cache,
      });

      if (response.status === 204) {
        return null;
      }

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? 500;

        if (error.response) {
          const errorData = error.response.data as IError;
          return {
            code: status,
            detail: errorData.detail,
            attr: errorData.attr,
          };
        }

        return { code: status, detail: "internal server error", attr: null };
      }

      return { code: 500, detail: "internal server error", attr: null };
    }
  };

  async function clearCache() {
    if ("storage" in api && api.storage?.clear) {
      await api.storage.clear();
    }
  }

  return {
    name: config.name,
    request,
    clearCache,
  };
}
