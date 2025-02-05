import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ClientContext from "@/components/context/client-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starty 0.1",
  description: "Baseado em Create Next App + Tailwind v4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme accentColor="iris" grayColor="mauve" panelBackground="solid" radius="large" scaling="105%">
          <ClientContext>
            {children}
          </ClientContext>
        </Theme>
      </body>
    </html>
  );
};
