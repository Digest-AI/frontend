import type { ICredentials, ITokens, IVerificationRequired } from "@/types";
import { post } from "./client";

export async function sendSignupRequest(request: ICredentials) {
  return post<ICredentials, IVerificationRequired>("auth/register", request);
}

export async function sendRestoreRequest(email: string) {
  return post<{ email: string }, ITokens>("auth/restore", { email });
}

export async function sendLoginRequest(request: ICredentials) {
  return post<ICredentials, ITokens | IVerificationRequired>(
    "auth/login",
    request,
  );
}
