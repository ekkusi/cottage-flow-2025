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
import { Id } from "../../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  passengerName: z
    .string()
    .min(2, "Nimen tulee olla vähintään 2 merkkiä pitkä"),
  passengerPhone: z.string().min(5, "Syötä kelvollinen puhelinnumero"),
});

interface RegisterPassengerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideId: Id<"carRides"> | null;
}

export function RegisterPassengerDialog({
  open,
  onOpenChange,
  rideId,
}: RegisterPassengerDialogProps) {
  const registerForRide = useMutation(api.carRides.registerForRide);
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengerName: user?.fullName || "",
      passengerPhone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!rideId) return;
    if (!user) {
      toast.error("Sinun täytyy olla kirjautunut sisään");
      return;
    }

    try {
      const success = await registerForRide({
        carRideId: rideId,
        ...values,
      });

      if (success) {
        form.reset();
        onOpenChange(false);
      } else {
        toast.error(
          "Ilmoittautuminen epäonnistui. Kyyti saattaa olla täynnä tai olet jo ilmoittautunut.",
        );
      }
    } catch (error) {
      console.error(error);

      toast.error("Ilmoittautuminen epäonnistui");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ilmoittaudu kyytiin</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="passengerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nimesi</FormLabel>
                  <FormControl>
                    <Input placeholder="Matti Meikäläinen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passengerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puhelinnumerosi</FormLabel>
                  <FormControl>
                    <Input placeholder="+358..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Puhelinnumero näytetään ainoastaan kuljettajalle.
                  </FormDescription>
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
              <Button type="submit">Ilmoittaudu</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
