import type {
  ITokens,
  IVerificationRequired,
  IVerificationRequest,
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

export async function sendVerificationRequest(request: IVerificationRequest) {
  return post<IVerificationRequest, ITokens>(
    `/auth/${request.purpose === "verify_email" ? "register" : "restore"}/confirm`,
    request,
  );
}
