import type { Metadata } from "next";
import { Inter, VT323 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Cottage Flow 2025",
  description: "A weekend of music and fun with friends",
};

const navigation = [
  { name: "Koti", href: "/" },
  { name: "Info", href: "/info" },
  { name: "Aikataulu", href: "/timetable" },
  { name: "Ilmoittautuminen", href: "/signup" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className="h-full">
      <body
        className={cn(
          inter.variable,
          vt323.variable,
          "min-h-screen bg-gray-100 background-repeat-none text-black antialiased flex flex-col ",
        )}
      >
        <nav className="flex justify-center space-x-4 bg-wood-primary p-4 text-white shadow-md">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xl hover:text-wood-secondary"
            >
              {item.name.toUpperCase()}
            </Link>
          ))}
        </nav>
        <main className="flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
}
