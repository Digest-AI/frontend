export type ITGUser = {
  publicId: string;
  username: string;
  telegramId: string;
};

export type ITGVerficationRequest = {
  code: string;
  publicId: string;
};
