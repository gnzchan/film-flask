import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";

// change font
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import UserProvider from "@/components/providers/UserProvider";
import MainPage from "@/components/custom-ui/MainPage";
import ModalProvider from "@/components/providers/ModalProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { defaultOgImg, description } from "@/constants";
import { Suspense } from "react";
import LoadingContent from "@/components/custom-ui/LoadingContent";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://film-flask.vercel.app/"),
  title: "Film Flask - Home",
  description: description,
  appleWebApp: true,
  openGraph: {
    title: "Film Flask - Home",
    description: description,
    url: "https://film-flask.vercel.app",
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
      <body className={twMerge("min-w-[340px]", font.className)}>
        <ThemeProvider attribute="class" enableSystem>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <MainPage>
                <Suspense
                  fallback={
                    <LoadingContent
                      className="h-[100dvh] w-full"
                      string="Your adventure awaits..."
                    />
                  }
                >
                  {children}
                </Suspense>
                <Analytics />
              </MainPage>
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
