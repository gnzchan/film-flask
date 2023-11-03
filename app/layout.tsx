import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";

// change font
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import UserProvider from "@/components/providers/UserProvider";
import MainPage from "@/components/customUI/MainPage";
import ModalProvider from "@/components/providers/ModalProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { defaultOgImg, description } from "@/constants";

const font = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://film-flask.vercel.app"),
//   title: "Film Flask - Home",
//   description: description,
//   appleWebApp: true,
//   openGraph: {
//     title: "Film Flask - Home",
//     description: description,
//     url: "https://film-flask.vercel.app",
//     siteName: "Film Flask",
//     images: [defaultOgImg],
//     locale: "en_US",
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Film Flask" key="ogsitename" />
        <meta
          property="og:url"
          content="https://film-flask.vercel.app/"
          key="ogurl"
        />
        <meta property="og:title" content="Film Flask - Home" key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={defaultOgImg.url} key="ogimage" />
      </head>
      <body className={twMerge("min-w-[340px]", font.className)}>
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
