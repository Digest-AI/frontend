/*
Auth Client Doesn't cache any requests and makes only POST requests
Therefore it doesn't need to be a service client
*/

export {
  sendLoginRequest,
  sendSignupRequest,
  sendRestoreRequest,
} from "./auth";
export { sendLogoutRequest } from "./token";
export { fetchAuthUser, updateAuthUser, deleteAuthUser } from "./user";
export { sendCodeResendRequest, sendVerificationRequest } from "./verification";
