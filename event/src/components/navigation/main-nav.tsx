"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Koti", href: "/" },
  { name: "Info", href: "/info" },
  { name: "Aikataulu", href: "/timetable" },
  { name: "Ilmoittautuminen", href: "/signup" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="relative bg-wood-primary px-4 py-3 shadow-md">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-wood-secondary via-wood-primary to-wood-secondary" />

      <div className="mx-auto flex max-w-4xl items-center justify-center space-x-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative text-lg font-vt323 text-white transition-all duration-300",
                isActive && "text-wood-secondary"
              )}
            >
              {/* Hover effect underline */}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-0.5 w-0 bg-wood-secondary transition-all duration-300 group-hover:w-full",
                  isActive && "w-full"
                )}
              />
              {item.name.toUpperCase()}
            </Link>
          );
        })}
      </div>

      {/* Decorative bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-wood-secondary via-wood-primary to-wood-secondary" />
    </nav>
  );
} 