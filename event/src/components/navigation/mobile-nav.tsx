"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Menu, X } from "lucide-react";
import WoodenPlank from "../general/wooden-plank";
import { Button } from "../ui/button";

const navigation = [
  { name: "Koti", href: "/" },
  { name: "Info", href: "/info" },
  { name: "Ohjelma", href: "/program" },
  { name: "Ilmoittautuminen", href: "/signup" },
  { name: "Kyydit", href: "/car-rides" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useConvexAuth();

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const redirectUrl = origin + pathname;

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <Button
        variant="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 py-0 px-0 -ml-2 text-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Full screen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-wood-primary transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Wooden planks background pattern */}
        <WoodenPlank
          linesPerRow={3}
          rows={25}
          className="absolute inset-0"
          noBorders
        />

        {/* Navigation links */}
        <nav className="relative flex h-full flex-col items-center justify-center space-y-8 -mt-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-3xl font-vt323 text-white transition-all duration-300",
                  isActive && "text-wood-secondary underline",
                )}
              >
                {item.name.toUpperCase()}
              </Link>
            );
          })}
          {isAuthenticated && (
            <SignOutButton redirectUrl={redirectUrl}>
              <span className="absolute bottom-10 text-2xl text-white cursor-pointer hover:opacity-70">
                KIRJAUDU ULOS
              </span>
            </SignOutButton>
          )}
        </nav>

        {/* Decorative borders */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-wood-secondary via-wood-primary to-wood-secondary" />
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-wood-secondary via-wood-primary to-wood-secondary" />
      </div>
    </div>
  );
}

