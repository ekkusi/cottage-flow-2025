"use client";

import { DecorativeElements } from "@/components/general/decorative-elements";
import WoodenPlank from "@/components/general/wooden-plank";

// type StayDuration = "fri-sun" | "fri-sat" | "sat-sun" | "only-fri" | "only-sat";
// type StayDurationOption = {
//   label: string;
//   value: StayDuration;
// };
//
// const stayDurationOptions: StayDurationOption[] = [
//   { label: "Pe-su", value: "fri-sun" },
//   { label: "Pe-la", value: "fri-sat" },
//   { label: "La-su", value: "sat-sun" },
//   { label: "Vain pe", value: "only-fri" },
//   { label: "Vain la", value: "only-sat" },
// ];
//
// type FormData = {
//   name: string;
//   stayDuration: StayDuration;
//   diet: string;
//   additionalInfo: string;
// };

export default function SignupPage() {
  // const createSignup = useMutation(api.signups.create);
  // const [formData, setFormData] = useState<FormData>({
  //   name: "",
  //   stayDuration: "fri-sun",
  //   diet: "",
  //   additionalInfo: "",
  // });
  //
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await createSignup(formData);
  //     alert("Kiitos ilmoittautumisesta!");
  //     setFormData({
  //       name: "",
  //       stayDuration: "fri-sun",
  //       diet: "",
  //       additionalInfo: "",
  //     });
  //   } catch (error) {
  //     console.error("Error submitting signup:", error);
  //     alert("Virhe ilmoittautumisessa. Yritä uudelleen.");
  //   }
  // };
  //
  // const handleStayDurationChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   const value = e.target.value as StayDuration;
  //   setFormData({ ...formData, stayDuration: value });
  // };
  //
  // const selectClassName =
  //   "w-full rounded-none border-2 border-wood-primary bg-transparent p-2 text-lg focus:border-wood-secondary";

  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={8} />

      {/* Main content */}
      <div className="mx-auto max-w-2xl">
        <h1>ILMOITTAUTUMINEN</h1>
        <div className="mt-12 flex justify-center relative rotate-2">
          <WoodenPlank
            rows={8}
            className="flex h-[250px] md:h-[350px] max-w-[600px] items-center justify-center relative z-10 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl text-[#8B5E3C] text-center leading-8 md:leading-10 px-12 font-shadows-into-light">
              TULOSSA HIUKKASEN MYÖHEMMIN
            </h2>
          </WoodenPlank>
          {/* Vertical support stick */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-12 translate-y-full">
            {/* Main stick */}
            <div className="w-8 h-[250px] md:h-[300px] bg-gradient-to-r from-[#8B5E3C] via-[#6F4E37] to-[#8B5E3C] rounded-full shadow-[4px_4px_6px_rgba(0,0,0,0.3)]" />
            {/* Highlight effect */}
            <div className="absolute left-[6px] top-0 bottom-0 w-[2px] bg-[#A67C52] opacity-50 rounded-full" />
            {/* End cap */}
            {/* <div className="absolute -bottom-4 left-0 w-8 h-8 bg-gradient-to-br from-[#8B5E3C] to-[#6F4E37] rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.2)]" /> */}
          </div>
        </div>

        {/* <Card className="mt-12"> */}
        {/*   <form onSubmit={handleSubmit} className="space-y-6"> */}
        {/*     <div> */}
        {/*       <label htmlFor="name" className="mb-2 block text-xl font-bold"> */}
        {/*         NIMI */}
        {/*       </label> */}
        {/*       <Input */}
        {/*         type="text" */}
        {/*         id="name" */}
        {/*         value={formData.name} */}
        {/*         onChange={(e) => */}
        {/*           setFormData({ ...formData, name: e.target.value }) */}
        {/*         } */}
        {/*         required */}
        {/*       /> */}
        {/*     </div> */}
        {/**/}
        {/*     <div> */}
        {/*       <label htmlFor="diet" className="mb-2 block text-xl font-bold"> */}
        {/*         RUOKAVALIO */}
        {/*       </label> */}
        {/*       <Input */}
        {/*         type="text" */}
        {/*         id="diet" */}
        {/*         value={formData.diet} */}
        {/*         onChange={(e) => */}
        {/*           setFormData({ ...formData, diet: e.target.value }) */}
        {/*         } */}
        {/*         required */}
        {/*       /> */}
        {/*     </div> */}
        {/**/}
        {/*     <div> */}
        {/*       <label */}
        {/*         htmlFor="stayDuration" */}
        {/*         className="mb-2 block text-xl font-bold" */}
        {/*       > */}
        {/*         AIKA */}
        {/*       </label> */}
        {/*       <select */}
        {/*         id="stayDuration" */}
        {/*         value={formData.stayDuration} */}
        {/*         onChange={handleStayDurationChange} */}
        {/*         className={selectClassName} */}
        {/*         required */}
        {/*       > */}
        {/*         {stayDurationOptions.map((option) => ( */}
        {/*           <option key={option.value} value={option.value}> */}
        {/*             {option.label} */}
        {/*           </option> */}
        {/*         ))} */}
        {/*       </select> */}
        {/*     </div> */}
        {/**/}
        {/*     <div> */}
        {/*       <label */}
        {/*         htmlFor="additionalInfo" */}
        {/*         className="mb-2 block text-xl font-bold" */}
        {/*       > */}
        {/*         MUITA TOIVEITA TARPEITA KOMMENTTEJA? */}
        {/*       </label> */}
        {/*       <Textarea */}
        {/*         id="additionalInfo" */}
        {/*         value={formData.additionalInfo} */}
        {/*         onChange={(e) => */}
        {/*           setFormData({ ...formData, additionalInfo: e.target.value }) */}
        {/*         } */}
        {/*         className="rounded-none border-2 border-wood-primary" */}
        {/*       /> */}
        {/*     </div> */}
        {/**/}
        {/*     <Button */}
        {/*       type="submit" */}
        {/*       className="w-full rounded-none px-8 py-3 text-xl transition-all" */}
        {/*     > */}
        {/*       ILMOITTAUDU */}
        {/*     </Button> */}
        {/*   </form> */}
        {/* </Card> */}
      </div>
    </div>
  );
}
