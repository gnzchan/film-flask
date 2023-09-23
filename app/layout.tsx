import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

// change font
import { Inter } from "next/font/google";
import UserProvider from "@/components/providers/UserProvider";
import MainPage from "@/components/ui/MainPage";
import ModalProvider from "@/components/providers/ModalProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";

const font = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Film Flask",
  description: "A storage for films, made for Jessa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
      </head>
      <body className={twMerge("min-w-[340px]", font.className)}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ThemeProvider attribute="class">
              <ModalProvider />
              <MainPage>{children}</MainPage>
            </ThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
