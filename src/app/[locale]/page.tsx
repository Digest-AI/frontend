import {
  EventsSection,
  Hero,
  ProvidersSection,
  RecommendationsCta,
} from "@/components/landing";
import { fetchEventsForLanding, isError } from "@/requests";

export default async function Page() {
  const eventsRes = await fetchEventsForLanding();
  const events = !isError(eventsRes) ? eventsRes.results : [];

  return (
    <>
      <Hero />
      <EventsSection events={events} />
      <RecommendationsCta />
      <ProvidersSection />
    </>
  );
}
