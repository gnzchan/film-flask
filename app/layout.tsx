import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";

// change font
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import UserProvider from "@/components/providers/UserProvider";
import MainPage from "@/components/ui/MainPage";
import ModalProvider from "@/components/providers/ModalProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { defaultOgImg, description } from "@/constants";

// const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Film Flask - Home",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Film Flask - Home",
    description: description,
    url: "https://film-flask.vercel.app/",
    siteName: "Film Flask",
    images: [defaultOgImg],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          "min-w-[340px]",
          // , font.className
        )}
      >
        <ThemeProvider attribute="class">
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <MainPage>
                {children}
                <Analytics />
              </MainPage>
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
