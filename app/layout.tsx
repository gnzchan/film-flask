import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";
import type { Metadata } from "next";

// change font
import { Inter } from "next/font/google";
import UserProvider from "@/components/providers/UserProvider";
import MainPage from "@/components/ui/MainPage";

const font = Inter({ subsets: ["latin"] });

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
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <MainPage>{children}</MainPage>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
