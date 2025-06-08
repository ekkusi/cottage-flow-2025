import { DecorativeElements } from "@/components/general/decorative-elements";
import WoodenPlank from "@/components/general/wooden-plank";

export default function ProgramPage() {
  // const schedule = {
  //   friday: [
  //     { time: "21:00", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
  //     { time: "24:00", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
  //   ],
  //   saturday: [
  //     { time: "14:00", artist: "MYSTEERI ARTISTI", venue: "Piha" },
  //     { time: "16:00", artist: "MYSTEERI ARTISTI", venue: "Olohuone" },
  //     { time: "21:30", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
  //     { time: "23:30", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
  //   ],
  // };

  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={10} />

      {/* Main content */}
      <div className="mx-auto max-w-4xl">
        <h1>OHJELMA</h1>

        {/* Coming Soon Banner */}
        <div className="mt-12 flex justify-center relative -rotate-2">
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

        {/* <div className="mt-12 grid gap-8 md:grid-cols-2"> */}
        {/*   <div className="space-y-6"> */}
        {/*     <Card> */}
        {/*       <h2 className="mb-6 font-bold text-wood-primary">PERJANTAI</h2> */}
        {/*       <div className="space-y-4"> */}
        {/*         {schedule.friday.map((event, index) => ( */}
        {/*           <div */}
        {/*             key={index} */}
        {/*             className="flex flex-col space-y-1 font-vt323" */}
        {/*           > */}
        {/*             <div className="flex items-baseline justify-between"> */}
        {/*               <span className="text-2xl">{event.time}</span> */}
        {/*               <span className="text-lg text-gray-600"> */}
        {/*                 {`{${event.venue}}`} */}
        {/*               </span> */}
        {/*             </div> */}
        {/*             <div className="text-xl font-bold">{event.artist}</div> */}
        {/*           </div> */}
        {/*         ))} */}
        {/*       </div> */}
        {/*     </Card> */}
        {/*   </div> */}
        {/**/}
        {/*   <div className="space-y-6"> */}
        {/*     <Card> */}
        {/*       <h2 className="mb-6 font-bold text-wood-primary">LAUANTAI</h2> */}
        {/*       <div className="space-y-4"> */}
        {/*         {schedule.saturday.map((event, index) => ( */}
        {/*           <div */}
        {/*             key={index} */}
        {/*             className="flex flex-col space-y-1 font-vt323" */}
        {/*           > */}
        {/*             <div className="flex items-baseline justify-between"> */}
        {/*               <span className="text-2xl">{event.time}</span> */}
        {/*               <span className="text-lg text-gray-600"> */}
        {/*                 {`{${event.venue}}`} */}
        {/*               </span> */}
        {/*             </div> */}
        {/*             <div className="text-xl font-bold">{event.artist}</div> */}
        {/*           </div> */}
        {/*         ))} */}
        {/*       </div> */}
        {/*     </Card> */}
        {/*   </div> */}
        {/* </div> */}
        {/**/}
        {/* <Card className="mt-8 rounded-none border-2 border-wood-primary bg-white/50 p-6 backdrop-blur-sm"> */}
        {/*   <h2 className="mb-4 font-bold text-wood-primary">PAIKAT</h2> */}
        {/*   <div className="grid gap-4 md:grid-cols-3"> */}
        {/*     <div> */}
        {/*       <h3 className="text-xl font-bold">PÄÄLAVA</h3> */}
        {/*       <p className="text-gray-600">Päälava talossa</p> */}
        {/*     </div> */}
        {/*     <div> */}
        {/*       <h3 className="text-xl font-bold">ULOHUONE</h3> */}
        {/*       <p className="text-gray-600">Talon sisällä olohuoneessa</p> */}
        {/*     </div> */}
        {/*     <div> */}
        {/*       <h3 className="text-xl font-bold">PIHA</h3> */}
        {/*       <p className="text-gray-600">Ulkosalla jossakin</p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </Card> */}
      </div>
    </div>
  );
}
