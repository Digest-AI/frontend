import { createServiceClient, type ServiceConfig } from "./serviceClient";

const configs: ServiceConfig[] = [
  {
    name: "parser",
    baseURL: process.env.NEXT_PUBLIC_PARSER_URL!,
  },
  {
    name: "recommendations",
    baseURL: process.env.NEXT_PUBLIC_RECOMMENDATIONS_URL!,
  },
  {
    name: "tg",
    baseURL: process.env.NEXT_PUBLIC_TG_URL!,
  },
];

export const [parserClient, recommendationsClient, tgClient] =
  configs.map(createServiceClient);
