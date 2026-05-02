import { tgClient } from "../core";
import type { ITGVerficationRequest, ITGUser } from "@/types";

export async function verifyTGUser(request: ITGVerficationRequest) {
  return tgClient.request<ITGUser>({
    url: "verification-codes/verify/",
    method: "POST",
    data: request,
  });
}
