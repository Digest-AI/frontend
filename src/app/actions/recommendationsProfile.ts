"use server";

import axios, { AxiosError } from "axios";
import { getLocale } from "next-intl/server";

import type { IError, IUser } from "@/types";

import { getToken } from "./token";

function recBaseUrl() {
  return `${process.env.NEXT_PUBLIC_RECOMMENDATIONS_URL!.replace(/\/$/, "")}/api/`;
}

async function recAuthHeaders() {
  const [token, locale] = await Promise.all([
    getToken("access"),
    getLocale(),
  ]);
  return {
    "Content-Type": "application/json",
    "Accept-Language": locale,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as Record<string, string>;
}

function toIError(error: unknown): IError {
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as {
      detail?: string;
      message?: string;
    };
    const detail =
      (typeof data?.detail === "string" && data.detail) ||
      (typeof data?.message === "string" && data.message) ||
      "error";
    return { code: error.response.status, detail, attr: null };
  }
  return { code: 500, detail: "internal server error", attr: null };
}

export async function fetchRecommendationsProfile(
  publicId: string,
): Promise<IUser | IError> {
  try {
    const res = await axios.get<IUser>(`${recBaseUrl()}profiles/${publicId}/`, {
      headers: await recAuthHeaders(),
    });
    return res.data;
  } catch (e) {
    return toIError(e);
  }
}

export async function createRecommendationsProfile(
  user: IUser,
): Promise<IUser | IError> {
  try {
    const res = await axios.post<IUser>(`${recBaseUrl()}profiles/`, user, {
      headers: await recAuthHeaders(),
    });
    return res.data;
  } catch (e) {
    return toIError(e);
  }
}

export async function updateRecommendationsProfile(
  publicId: string,
  user: IUser,
): Promise<IUser | IError> {
  try {
    const res = await axios.patch<IUser>(
      `${recBaseUrl()}profiles/${publicId}/`,
      user,
      { headers: await recAuthHeaders() },
    );
    return res.data;
  } catch (e) {
    return toIError(e);
  }
}
