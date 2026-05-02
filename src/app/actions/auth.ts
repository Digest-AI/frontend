"use server";

import { redirect } from "@/i18n";

import {
  sendLoginRequest,
  sendSignupRequest,
  sendRestoreRequest,
  sendEmailVerificationRequest,
  sendPasswordVerificationRequest,
  sendLogoutRequest,
  isError,
} from "@/requests";
import { deletePublicId, deleteTokens, setTokens } from "./token";
import type { ITokens, IVerificationRequired, IError } from "@/types";

type Validatable<T = string> = { value: T; error: string };

export type AuthFormState = {
  type: "login" | "signup" | "restore" | "verification";
  email: Validatable;
  password: Validatable;
  code: Validatable & IVerificationRequired;
  rememberMe: boolean;
};

async function handleResponse(
  response: ITokens | IVerificationRequired | IError,
  state: AuthFormState,
): Promise<AuthFormState> {
  console.error(JSON.stringify(response, null, 2));
  if (isError(response)) {
    switch (response.attr) {
      case "email":
        return { ...state, email: { ...state.email, error: response.detail } };
      case "password":
        return {
          ...state,
          password: { ...state.password, error: response.detail },
        };
      case "code":
        return { ...state, code: { ...state.code, error: response.detail } };
      default:
        //await redirect("/error");
        break;
    }
  } else if ("purpose" in response) {
    return {
      ...state,
      type: "verification",
      code: {
        value: "",
        error: "",
        purpose: state.type === "restore" ? "restore_password" : "verify_email",
      },
    };
  } else {
    await setTokens(response as ITokens);
    await redirect(state.type === "login" ? "/" : "/profile");
  }
  return state;
}

export async function dispatchAuthAction(
  state: AuthFormState,
): Promise<AuthFormState> {
  let response: ITokens | IVerificationRequired | IError;
  switch (state.type) {
    case "verification": {
      if (state.code.purpose === "verify_email") {
        response = await sendEmailVerificationRequest({
          email: state.email.value,
          code: state.code.value,
          rememberMe: state.rememberMe,
        });
      } else {
        response = await sendPasswordVerificationRequest({
          email: state.email.value,
          code: state.code.value,
          newPassword: state.password.value,
        });
      }

      if (isError(response) && response.code === 404) {
        return { ...state, type: "signup" };
      }
      break;
    }
    case "login":
      response = await sendLoginRequest({
        email: state.email.value,
        password: state.password.value,
        rememberMe: state.rememberMe,
      });
      break;
    case "signup":
      response = await sendSignupRequest({
        email: state.email.value,
        password: state.password.value,
        rememberMe: state.rememberMe,
      });
      break;
    case "restore":
      response = await sendRestoreRequest(state.email.value);
      break;
  }
  return handleResponse(response, state);
}

async function logout(all = false) {
  await sendLogoutRequest(all);
  await deletePublicId();
  await deleteTokens();
  await redirect("/auth");
}

export async function logoutThis() {
  await logout();
}

export async function logoutAll() {
  await logout(true);
}
