import { DecorativeElements } from "@/components/general/decorative-elements";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background decorative elements */}
      <DecorativeElements count={6} />

      {/* Main content */}
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        {/* COTTAGE FLOW text with wooden plank effect */}
        <h1 className="wooden-text mb-0 text-8xl font-bold tracking-wider">
          COTTAGE FLOW
        </h1>

        {/* TEISKO DRIFT text with layered effect */}
        <h2 className="flow-text text-6xl font-bold tracking-wider">
          TEISKO DRIFT
        </h2>

        {/* Year */}
        <p className="mt-8 text-4xl text-gray-700">18.-20.7.2025</p>

        {/* Sign up button */}
        <div className="mt-12">
          <Link
            href="/info"
            className={buttonVariants()}
          >
            INFO
          </Link>
        </div>
      </div>
    </div>
  );
}
