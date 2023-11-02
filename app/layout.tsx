import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge("min-w-[340px]", font.className)}>
        <ThemeProvider attribute="class">
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <MainPage>{children}</MainPage>
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
