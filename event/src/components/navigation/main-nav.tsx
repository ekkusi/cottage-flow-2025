"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { MobileNav } from "./mobile-nav";

const navigation = [
  { name: "Koti", href: "/" },
  { name: "Info", href: "/info" },
  { name: "Ohjelma", href: "/program" },
  { name: "Ilmoittautuminen", href: "/signup" },
  { name: "Kyydit", href: "/car-rides" },
];

const startPositions: Record<number, number> = {
  0: 20,
  1: 140,
  2: 60,
};

export function MainNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useConvexAuth();

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const redirectUrl = origin + pathname;

  return (
    <nav className="relative bg-wood-primary px-4 py-3 shadow-md">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-wood-secondary via-wood-primary to-wood-secondary" />

      {/* Wooden planks background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((rowIndex) => (
          <div
            key={rowIndex}
            className="relative h-[33.33%] w-full border-b border-wood-secondary/30"
          >
            {/* Vertical lines for each row */}
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20,
            ].map((lineIndex) => (
              <div
                key={`${rowIndex}-${lineIndex}`}
                className="absolute h-full w-px bg-wood-secondary/20"
                style={{
                  left: `${startPositions[rowIndex] + 200 * lineIndex}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex items-center justify-between">
        <MobileNav />

        {/* Desktop Navigation */}
        <div className="relative mx-auto hidden md:flex max-w-4xl items-center justify-center space-x-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative text-lg font-vt323 text-white transition-all duration-300",
                  isActive && "text-wood-secondary",
                )}
              >
                {/* Hover effect underline */}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 w-0 bg-wood-secondary transition-all duration-300 group-hover:w-full",
                    isActive && "w-full",
                  )}
                />
                {item.name.toUpperCase()}
              </Link>
            );
          })}
        </div>

        {isAuthenticated && (
          <SignOutButton redirectUrl={redirectUrl}>
            <span className="absolute hidden md:block right-0 text-white cursor-pointer hover:opacity-70">
              Kirjaudu ulos
            </span>
          </SignOutButton>
        )}
      </div>

      {/* Decorative bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-wood-secondary via-wood-primary to-wood-secondary" />
    </nav>
  );
}
