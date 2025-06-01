"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DecorativeElements } from "@/components/general/decorative-elements";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

type StayDuration = "fri-sun" | "fri-sat" | "sat-sun" | "only-fri" | "only-sat";
type StayDurationOption = {
  label: string;
  value: StayDuration;
};

const stayDurationOptions: StayDurationOption[] = [
  { label: "Pe-su", value: "fri-sun" },
  { label: "Pe-la", value: "fri-sat" },
  { label: "La-su", value: "sat-sun" },
  { label: "Vain pe", value: "only-fri" },
  { label: "Vain la", value: "only-sat" },
];

type FormData = {
  name: string;
  stayDuration: StayDuration;
  diet: string;
  additionalInfo: string;
};

export default function SignupPage() {
  const createSignup = useMutation(api.signups.create);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    stayDuration: "fri-sun",
    diet: "",
    additionalInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSignup(formData);
      alert("Kiitos ilmoittautumisesta!");
      setFormData({
        name: "",
        stayDuration: "fri-sun",
        diet: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting signup:", error);
      alert("Virhe ilmoittautumisessa. Yritä uudelleen.");
    }
  };

  const handleStayDurationChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value as StayDuration;
    setFormData({ ...formData, stayDuration: value });
  };

  const selectClassName =
    "w-full rounded-none border-2 border-wood-primary bg-transparent p-2 text-lg focus:border-wood-secondary";

  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={8} />

      {/* Main content */}
      <div className="mx-auto max-w-2xl">
        <h1>ILMOITTAUTUMINEN</h1>

        <Card className="mt-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="mb-2 block text-xl font-bold">
                NIMI
              </label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Diet Input */}
            <div>
              <label htmlFor="diet" className="mb-2 block text-xl font-bold">
                RUOKAVALIO
              </label>
              <Input
                type="text"
                id="diet"
                value={formData.diet}
                onChange={(e) =>
                  setFormData({ ...formData, diet: e.target.value })
                }
                required
              />
            </div>

            {/* Stay duration */}
            <div>
              <label
                htmlFor="stayDuration"
                className="mb-2 block text-xl font-bold"
              >
                AIKA
              </label>
              <select
                id="stayDuration"
                value={formData.stayDuration}
                onChange={handleStayDurationChange}
                className={selectClassName}
                required
              >
                {stayDurationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Info */}
            <div>
              <label
                htmlFor="additionalInfo"
                className="mb-2 block text-xl font-bold"
              >
                MUITA TOIVEITA TARPEITA KOMMENTTEJA?
              </label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData({ ...formData, additionalInfo: e.target.value })
                }
                className="rounded-none border-2 border-wood-primary"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-none px-8 py-3 text-xl transition-all"
            >
              ILMOITTAUDU
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
