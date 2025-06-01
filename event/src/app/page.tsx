import { DecorativeElements } from "@/components/general/decorative-elements";
// import { ArcText } from "@/components/general/arc-text-2";
import ReactCurvedText from "@/components/general/curved-text";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Background decorative elements */}
      <DecorativeElements count={6} />

      {/* Main content */}
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        {/* COTTAGE FLOW text with wooden plank effect */}
        <div className="hidden md:block -mt-28">
          <ReactCurvedText
            text="COTTAGE FLOW"
            // className="wooden-text text-8xl font-bold tracking-wider"
            width={700}
            height={300}
            cx={350}
            cy={300}
            rx={270}
            ry={70}
            reversed={true}
            textProps={{
              style: {
                fontSize: 120,
                fontFamily: "var(--font-vt323)",
                fill: "var(--color-wood-primary)",
                textShadow:
                  "2px 2px 0px var(--color-wood-secondary), -1px -1px 0px var(--color-wood-secondary), 1px -1px 0px var(--color-wood-secondary), -1px 1px 0px var(--color-wood-secondary), 3px 3px 5px rgba(0, 0, 0, 0.4)",
              },
            }}
          />
        </div>

        <h1 className="block md:hidden mb-8 text-6xl tracking-wider">
          COTTAGE FLOW
        </h1>

        {/* TEISKO DRIFT text with layered effect */}
        <h2 className="flow-text text-5xl md:text-6xl font-bold tracking-wider -mt-6">
          TEISKO DRIFT
        </h2>

        {/* Year */}
        <p className="mt-8 text-4xl text-gray-700">18.-20.7.2025</p>

        {/* Sign up button */}
        <div className="mt-12">
          <Link href="/info" className={buttonVariants()}>
            INFO
          </Link>
        </div>
      </div>
    </div>
  );
}
