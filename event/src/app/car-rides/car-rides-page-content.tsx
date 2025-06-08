"use client";
import { CarRidesTable } from "@/components/car-rides/car-rides-table";
import { CreateRideDialog } from "@/components/car-rides/create-ride-dialog";
import { Button } from "@/components/ui/button";
import { Authenticated, Preloaded, Unauthenticated, useConvexAuth, usePreloadedQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { SignInButton } from "@clerk/nextjs";

type CarRidesPageContentProps = {
  initialRides: Preloaded<typeof api.carRides.list>;
};

export const CarRidesPageContent = ({
  initialRides,
}: CarRidesPageContentProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const rides = usePreloadedQuery(initialRides);

  const { isLoading } = useConvexAuth();

  // Check if user is already a passenger in any ride
  const isPassengerInAnyRide = rides.some((ride) => ride.isPassenger);
  const isCreatorInAnyRide = rides.some((ride) => ride.isCreator);

  if (isLoading) {
    return <div>
      <h1>Kyydit</h1>
      <p className="p-2 text-center">Ladataan...</p>
    </div>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold">Kyydit</h1>
        <Authenticated>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            disabled={isPassengerInAnyRide || isCreatorInAnyRide}
            title={isPassengerInAnyRide ? "Et voi ilmoittaa uutta kyytiä, koska olet jo matkustaja toisessa kyydissä" : isCreatorInAnyRide ? "Et voi ilmoittaa uutta kyytiä, koska olet jo kuljettaja toisessa kyydissä" : undefined}
          >
            Ilmoita kyyti
          </Button>
        </Authenticated>
      </div>

      <Authenticated>
        <CarRidesTable rides={rides} />
        <CreateRideDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </Authenticated>

      <Unauthenticated>
        <div className="text-center">
          <h2 className="mb-4">Kirjaudu sisään nähdäksesi kyydit</h2>
          <SignInButton mode="modal">
            <Button>Kirjaudu sisään</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </>
  );
};
