"use server";

import { ErrorPage } from "@/components/layout";

export default async function Page() {
  return <ErrorPage code={403} />;
}
