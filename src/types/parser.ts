export type IProvider = {
  id: number;
  slug: string;
  name: string;
  url: string;
};

export type ICategory = {
  id: number;
  slug: string;
  nameRu: string;
  nameRo: string;
};

export type IEvent = {
  id: number;
  slug: string;
  url: string;
  titleRu: string;
  titleRo: string;
  dateStart: string;
  address: string;
  place: string;
  city: string;
  priceFrom: string;
  priceTo: string;
  imageUrl: string;
  provider: IProvider;
  categories: ICategory[];
};

export type IDetailedEvent = IEvent & {
  externalId: string;
  descriptionRu: string;
  descriptionRo: string;
  dateEnd: string;
  ticketsUrl: string;
  createdAt: string;
};

export type IEventList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IEvent[];
};
