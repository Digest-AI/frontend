import type {
  ITokens,
  IVerificationRequired,
  IEmailVerificationRequest,
  IPasswordVerificationRequest,
} from "@/types";
import { post } from "./client";

export async function sendCodeResendRequest(
  email: string,
  purpose: IVerificationRequired["purpose"],
) {
  return post<{ email: string }, IVerificationRequired>(
    `/auth/${purpose === "verify_email" ? "register" : "restore"}/resend-code`,
    { email },
  );
}

export async function sendEmailVerificationRequest(
  request: IEmailVerificationRequest,
) {
  return post<IEmailVerificationRequest, ITokens>(
    `auth/email/confirm`,
    request,
  );
}

export async function sendPasswordVerificationRequest(
  request: IPasswordVerificationRequest,
) {
  return post<IPasswordVerificationRequest, ITokens>(
    `auth/password/confirm`,
    request,
  );
}
