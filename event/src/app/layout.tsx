import type { Metadata } from "next";
import { VT323, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/navigation/main-nav";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
  title: "Cottage Flow - Teisko Drift",
  description: "Kesän toisiksi paras viikonloppu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className="h-full">
      <ClerkProvider>
        <Providers>
          <body
            className={cn(
              vt323.variable,
              shadowsIntoLight.variable,
              "min-h-screen bg-gray-100 background-repeat-none text-black antialiased flex flex-col",
            )}
          >
            <MainNav />
            <main className="flex flex-col flex-1">{children}</main>
            <Toaster />
          </body>
        </Providers>
      </ClerkProvider>
    </html>
  );
}
