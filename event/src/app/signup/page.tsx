"use client";

import { DecorativeElements } from "@/components/general/decorative-elements";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";

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
  wantsToEat: boolean;
  diet: string;
  otherDietRestrictions: string;
  additionalInfo: string;
};

const initialData: FormData = {
  name: "",
  stayDuration: "fri-sun",
  wantsToEat: false,
  diet: "",
  otherDietRestrictions: "",
  additionalInfo: "",
}

export default function SignupPage() {
  const createSignup = useMutation(api.signups.create);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createSignup(formData);
      setFormData(initialData);
      setIsComplete(true);
    } catch (error) {
      console.error("Error submitting signup:", error);
      alert("Virhe ilmoittautumisessa. Yritä uudelleen tai ota yhteyttä Ekeen.");
    }
    setIsLoading(false);
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

      <div className="mx-auto max-w-2xl">
        {/* <h1>ILMOITTAUTUMINEN</h1> */}
        {/* <div className="mt-12 flex justify-center relative rotate-2"> */}
        {/*   <WoodenPlank */}
        {/*     rows={8} */}
        {/*     className="flex h-[250px] md:h-[350px] max-w-[600px] items-center justify-center relative z-10 shadow-2xl" */}
        {/*   > */}
        {/*     <h2 className="text-4xl md:text-5xl text-[#8B5E3C] text-center leading-8 md:leading-10 px-12 font-shadows-into-light"> */}
        {/*       TULOSSA HIUKKASEN MYÖHEMMIN */}
        {/*     </h2> */}
        {/*   </WoodenPlank> */}
        {/*   <div className="absolute left-1/2 -translate-x-1/2 bottom-12 translate-y-full"> */}
        {/*     <div className="w-8 h-[250px] md:h-[300px] bg-gradient-to-r from-[#8B5E3C] via-[#6F4E37] to-[#8B5E3C] rounded-full shadow-[4px_4px_6px_rgba(0,0,0,0.3)]" /> */}
        {/*     <div className="absolute left-[6px] top-0 bottom-0 w-[2px] bg-[#A67C52] opacity-50 rounded-full" /> */}
        {/*   </div> */}
        {/* </div> */}

        <Card className="mt-12">
          {isComplete ?
            <div className="py-6">
              <h2 className="text-center">Ilmoittautuminen vastaanotettu! Siunausta!</h2>
            </div>
            : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div>
                  <label
                    htmlFor="stayDuration"
                    className="mb-2 block text-xl font-bold"
                  >
                    TULEN JUHLIIN AIKAVÄLILLE
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
                  <p className="mt-1 -mb-2">Tää on kartoitusta vaan. Ei niin justiinsa, jos vielä muuttuu.</p>
                </div>

                <div>
                  <p className="text-xl font-bold">
                    RUOKA
                  </p>
                  <div className="flex items-center gap-2">
                    <Checkbox id="wantsToEat" onClick={() => {
                      setFormData({ ...formData, wantsToEat: !formData.wantsToEat })
                    }} />
                    <label htmlFor="wantsToEat" className="text-lg">
                      Syön hodareita lauantaina, jos tämmmönen järjestetään
                    </label>
                  </div>
                  {formData.wantsToEat && (
                    <>
                      <div>
                        <p className="mt-1 font-bold">NAKKIPREFERENSSI</p>
                        <RadioGroup defaultValue="option-one" className="gap-1 ml-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Liha" id="meat" onClick={() => {
                              setFormData({ ...formData, diet: "Liha" })
                            }} />
                            <label htmlFor="meat">Liha</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="veg" onClick={() => {
                              setFormData({ ...formData, diet: "Kasvis" })
                            }} />
                            <label htmlFor="veg">Kasvis</label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <label htmlFor="otherDietRestrictions" className="block my-1 font-bold">MUITA ERIKOISRUOKAVALIOITA</label>
                        <Input
                          type="text"
                          id="otherDietRestrictions"
                          value={formData.otherDietRestrictions}
                          onChange={(e) =>
                            setFormData({ ...formData, otherDietRestrictions: e.target.value })
                          }
                        />
                      </div>
                    </>
                  )}
                  <p className="mt-3">Tän järjestäminen on vielä harkinnassa. Kulut jaettaisiin syöpöttelijöiden kesken.</p>
                </div>


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

                <Button
                  type="submit"
                  className="w-full rounded-none px-8 py-3 text-xl transition-all"
                  disabled={isLoading}
                >
                  ILMOITTAUDU
                  {isLoading && <Spinner />}
                </Button>
              </form>
            )}
        </Card>
      </div>
    </div>
  );
}
