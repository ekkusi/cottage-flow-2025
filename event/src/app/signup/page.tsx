"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DecorativeElements } from "@/components/general/decorative-elements";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const stayDurationOptions = [
  { label: "Pe-su", value: "1" },
  { label: "Pe-la", value: "2" },
  { label: "La-su", value: "3" },
  { label: "Vain pe", value: "4" },
  { label: "Vain la", value: "5" },
];

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    stayDuration: stayDurationOptions[0].value,
    diet: "",
    additionalInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    alert("Ilmoittautuminen ei ihan vielä toiminnassa..")
    // You can add your form submission logic here
  };
  const selectClassName = "w-full rounded-none border-2 border-wood-primary bg-transparent p-2 text-lg focus:border-wood-secondary";

  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={8} />

      {/* Main content */}
      <div className="mx-auto max-w-2xl">
        <h1 className="retro-shadow text-6xl font-bold text-wood-primary">
          ILMOITTAUTUMINEN
        </h1>

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
              <label htmlFor="stayDuration" className="mb-2 block text-xl font-bold">
                AIKA
              </label>
              <select
                id="stayDuration"
                value={formData.stayDuration}
                onChange={(e) =>
                  setFormData({ ...formData, stayDuration: e.target.value })
                }
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
