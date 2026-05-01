export type IUser = {
  userId: string;
  preferredCategories: string[];
  preferredRawCategories: string[];
  maxPrice: number;
  freeOnly: boolean;
};

export type IRecommendation = {
  rank: number;
  score: number;
  isNew: boolean;
  eventId: number;
};
