import { api } from "../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { CarRidesPageContent } from "./car-rides-page-content";

export default async function CarRidesPage() {
  const rides = await preloadQuery(api.carRides.list);

  return (
    <div className="container py-10 max-w-6xl px-4 mx-auto">
      <CarRidesPageContent initialRides={rides} />
    </div>
  );
}
