import { DecorativeElements } from "@/components/general/decorative-elements";
import { SignupsTable } from "@/components/signups/signups-table";
import { api } from "../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

export default async function SignupsPage() {
  const preloadedSignups = await preloadQuery(api.signups.list);

  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={8} />

      {/* Main content */}
      <div className="mx-auto max-w-4xl">
        <h1 className="retro-shadow mb-8 text-6xl font-bold text-wood-primary">
          ILMOITTAUTUMISET
        </h1>

        <SignupsTable initialSignups={preloadedSignups} />
      </div>
    </div>
  );
} 