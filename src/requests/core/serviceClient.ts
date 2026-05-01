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
        `${request.method?.toLowerCase() ?? "get"}_${request.url}`,
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
