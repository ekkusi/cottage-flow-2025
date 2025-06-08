"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Id } from "../../../convex/_generated/dataModel";
import { useEffect } from "react";

const formSchema = z.object({
  driverName: z.string().min(2, "Nimen tulee olla vähintään 2 merkkiä pitkä"),
  phoneNumber: z.string().min(5, "Syötä kelvollinen puhelinnumero"),
  departureInfo: z.string().min(2, "Syötä lähtöpaikka ja -aika"),
  availableSeats: z
    .number()
    .min(0, "Ei voi olla negatiivinen luku")
    .max(10, "Enintään 10 paikkaa"),
});

interface CreateRideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editRideId?: Id<"carRides">;
  initialValues?: {
    driverName: string;
    phoneNumber: string;
    departureInfo: string;
    availableSeats: number;
  };
}

export function CreateRideDialog({
  open,
  onOpenChange,
  editRideId,
  initialValues,
}: CreateRideDialogProps) {
  const createRide = useMutation(api.carRides.create);
  const editRide = useMutation(api.carRides.editRide);
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverName: user?.fullName || "",
      phoneNumber: user?.phoneNumbers[0]?.phoneNumber || "",
      departureInfo: "",
      availableSeats: 4,
    },
  });

  // Update form values when editing
  useEffect(() => {
    if (initialValues && open) {
      form.reset(initialValues);
    } else if (!open) {
      form.reset({
        driverName: user?.fullName || "",
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber || "",
        departureInfo: "",
        availableSeats: 4,
      });
    }
  }, [initialValues, open, user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error("Sinun täytyy olla kirjautunut sisään");
      return;
    }

    try {
      if (editRideId) {
        await editRide({
          carRideId: editRideId,
          ...values,
        });
      } else {
        await createRide({
          ...values,
        });
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(
        editRideId
          ? "Kyydin päivittäminen epäonnistui"
          : "Kyydin lisääminen epäonnistui",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editRideId ? "Muokkaa kyytiä" : "Ilmoita uusi kyyti"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="driverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuljettajan nimi</FormLabel>
                  <FormControl>
                    <Input placeholder="Matti Meikäläinen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puhelinnumero</FormLabel>
                  <FormControl>
                    <Input placeholder="+358..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Puhelinnumero näytetään ainoastaan ilmoittautuneille
                    matkustajille.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lähtöpaikka ja -aika</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Helsinki, perjantaina klo 16"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vapaiden paikkojen määrä</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Peruuta
              </Button>
              <Button type="submit">
                {editRideId ? "Tallenna" : "Luo kyyti"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
