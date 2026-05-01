export type ICredentials = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type IAuthUser = Pick<ICredentials, "email"> & {
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

export type IEmailVerificationRequest = {
  email: string;
  code: string;
  rememberMe: boolean;
};

export type IPasswordVerificationRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export type RefreshTokenRequest = {
  refresh: string;
};

export type ITokens = {
  publicId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  rememberMe: boolean;
};
