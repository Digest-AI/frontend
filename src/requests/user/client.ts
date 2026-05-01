import { IError } from "@/types";
import axios, { AxiosError } from "axios";
import { getLocale } from "next-intl/server";
import type { ResWithError } from "../core/serviceClient";
import { getToken } from "@/app/actions";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL! + "/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

function handleError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 500;

    if (error.response) {
      const errorData = error.response.data as IError;
      return { code: status, detail: errorData.detail, attr: errorData.attr };
    }

    return { code: status, detail: "internal server error", attr: null };
  }

  return { code: 500, detail: "internal server error", attr: null };
}

type GetFn = <R>(url: string) => ResWithError<R>;
type PostFn = <D, R>(
  url: string,
  data: D,
  useAuthorization?: boolean,
) => ResWithError<R>;
type PutFn = <D, R = D>(url: string, data: D) => ResWithError<R>;
type DestroyFn = (url: string) => ResWithError<null>;

export const get: GetFn = async (url) => {
  const locale = await getLocale();
  const token = await getToken("access");

  try {
    const response = await api.get(url, {
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const post: PostFn = async (url, data, useAuthorization = false) => {
  const token = useAuthorization ? await getToken("access") : undefined;
  const locale = await getLocale();

  try {
    const response = await api.post(url, data, {
      headers: {
        "Accept-Language": locale,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 204) {
      return null;
    }

    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const put: PutFn = async (url, data) => {
  const token = await getToken("access");
  const locale = await getLocale();

  try {
    const response = await api.put(url, data, {
      headers: {
        "Accept-Language": locale,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 204) {
      return null;
    }

    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const destroy: DestroyFn = async (url) => {
  const token = await getToken("access");
  const locale = await getLocale();

  try {
    await api.delete(url, {
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${token}`,
      },
    });
    return null;
  } catch (error: unknown) {
    return handleError(error);
  }
};
