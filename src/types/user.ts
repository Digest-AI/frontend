export type ICredentials = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type IAuthUser = ICredentials & {
  publicId: string;
  isVerified: boolean;
  name: string;
  surname: string;
  age: number;
  gender: string;
};

export type IVerificationRequired = {
  purpose: "verify_email" | "restore_password";
};

export type IVerificationRequest = {
  email: string;
  code: string;
  password: string;
  purpose: "verify_email" | "restore_password";
  rememberMe?: boolean;
};

export type RefreshTokenRequest = {
  refresh: string;
};

export type ITokens = {
  access: string;
  refresh: string;
  longRefresh: boolean;
};
