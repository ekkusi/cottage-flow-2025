import type { Metadata } from "next";
import { Inter, VT323, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/navigation/main-nav";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});
const shadowsIntoLight = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shadows-into-light",
});

export const metadata: Metadata = {
  title: "Cottage Flow 2025",
  description: "A weekend of music and fun with friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className="h-full">
      <body
        className={cn(
          inter.variable,
          vt323.variable,
          shadowsIntoLight.variable,
          "min-h-screen bg-gray-100 background-repeat-none text-black antialiased flex flex-col",
        )}
      >
        <Providers>
          <MainNav />
          <main className="flex flex-col flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
