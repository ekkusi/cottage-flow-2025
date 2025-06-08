"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RegisterPassengerDialog } from "./register-passenger-dialog";
import { Id } from "../../../convex/_generated/dataModel";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";
import { CreateRideDialog } from "./create-ride-dialog";

type CarRide = {
  _id: Id<"carRides">;
  _creationTime: number;
  driverName: string;
  phoneNumber: string;
  departureInfo: string;
  passengers: Array<{
    name: string;
    phoneNumber: string;
  }>;
  availableSeats: number;
  isCreator: boolean;
  isPassenger: boolean;
};

interface CarRidesTableProps {
  rides: CarRide[];
}

export function CarRidesTable({ rides }: CarRidesTableProps) {
  const [selectedRideId, setSelectedRideId] = useState<Id<"carRides"> | null>(
    null,
  );
  const [deleteRideId, setDeleteRideId] = useState<Id<"carRides"> | null>(null);
  const [unregisterRideId, setUnregisterRideId] =
    useState<Id<"carRides"> | null>(null);
  const [editRide, setEditRide] = useState<CarRide | null>(null);

  const deleteRideMutation = useMutation(api.carRides.deleteRide);
  const unregisterFromRide = useMutation(api.carRides.unregisterFromRide);

  // Check if user is already a passenger in any ride
  const isPassengerInAnyRide = rides.some((ride) => ride.isPassenger);

  // Helper function to determine if phone number should be visible
  const shouldShowPhoneNumber = (ride: CarRide) => {
    return ride.isCreator || ride.isPassenger;
  };

  // Helper function to format phone number based on visibility
  const formatPhoneNumber = (ride: CarRide) => {
    if (shouldShowPhoneNumber(ride)) {
      return ride.phoneNumber;
    }
    return "***";
  };

  // Helper function to format passenger info based on visibility
  const formatPassengers = (ride: CarRide) => {
    if (ride.isCreator) {
      return ride.passengers
        .map((p) => `${p.name} - ${p.phoneNumber}`)
        .join(", ");
    }
    return ride.passengers.map((p) => p.name).join(", ");
  };

  const handleDeleteRide = async () => {
    if (!deleteRideId) return;

    try {
      await deleteRideMutation({ carRideId: deleteRideId });
    } catch (error) {
      console.error(error);
      toast.error("Kyydin poistaminen epäonnistui");
    }
  };

  const handleUnregister = async () => {
    if (!unregisterRideId) return;

    try {
      await unregisterFromRide({ carRideId: unregisterRideId });
    } catch (error) {
      console.error(error);
      toast.error("Ilmoittautumisen peruminen epäonnistui");
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kuljettaja</TableHead>
              <TableHead>Puhelin</TableHead>
              <TableHead>Lähtöpaikka ja -aika</TableHead>
              <TableHead>Vapaita paikkoja</TableHead>
              <TableHead>Matkustajat</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.length > 0 ? (
              rides.map((ride) => (
                <TableRow key={ride._id}>
                  <TableCell>{ride.driverName}</TableCell>
                  <TableCell>{formatPhoneNumber(ride)}</TableCell>
                  <TableCell>{ride.departureInfo}</TableCell>
                  <TableCell>{ride.availableSeats}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatPassengers(ride)}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <div className="flex flex-row">
                      {!ride.isCreator && !isPassengerInAnyRide && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={ride.availableSeats === 0}
                          onClick={() => setSelectedRideId(ride._id)}
                        >
                          Ilmoittaudu
                        </Button>
                      )}
                      {ride.isCreator && (
                        <>
                          <Button
                            variant="icon"
                            size="sm"
                            className="block"
                            onClick={() => setEditRide(ride)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="icon"
                            size="sm"
                            className="block"
                            onClick={() => setDeleteRideId(ride._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {ride.isPassenger && (
                        <Button
                          variant="icon"
                          size="sm"
                          onClick={() => setUnregisterRideId(ride._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Ei ilmoitettuja kyytejä
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <RegisterPassengerDialog
        open={selectedRideId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRideId(null);
        }}
        rideId={selectedRideId}
      />

      <CreateRideDialog
        open={editRide !== null}
        onOpenChange={(open) => !open && setEditRide(null)}
        editRideId={editRide?._id}
        initialValues={
          editRide
            ? {
                driverName: editRide.driverName,
                phoneNumber: editRide.phoneNumber,
                departureInfo: editRide.departureInfo,
                availableSeats: editRide.availableSeats,
              }
            : undefined
        }
      />

      <ConfirmationDialog
        open={deleteRideId !== null}
        onOpenChange={(open) => !open && setDeleteRideId(null)}
        title="Poista kyyti"
        description="Haluatko varmasti poistaa kyydin? Tätä toimintoa ei voi perua. Mikäli perut kyydin, muista ilmoittaa kaikille ilmoittautuneille matkustajille."
        onConfirm={handleDeleteRide}
        confirmText="Poista"
      />

      <ConfirmationDialog
        open={unregisterRideId !== null}
        onOpenChange={(open) => !open && setUnregisterRideId(null)}
        title="Peru ilmoittautuminen"
        description="Haluatko varmasti perua ilmoittautumisesi kyytiin?"
        onConfirm={handleUnregister}
        confirmText="Peru ilmoittautuminen"
      />
    </>
  );
}
