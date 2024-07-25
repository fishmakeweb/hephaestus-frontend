import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NewNavbar from "./navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "./footer";

export const metadata: Metadata = {
  title: "Hephaestus",
  description: "An online jewelry shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NewNavbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
