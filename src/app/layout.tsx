import type { Metadata } from "next";
import QueryProvider from "@/provider/QueryProvider";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Challenge",
  description: "ELSOLNEC Frontend Developer Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-3xl m-auto pb-28 `}
      >
        <Navbar />
        <main className="flex-auto min-w-0 mt-8 flex flex-col md:px-0">
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
