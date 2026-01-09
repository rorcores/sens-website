import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SENS Social Club | A Luxury Wellness Community for Women",
  description: "Shape social wellness through sensory-led experiences. A curated community for discerning women seeking connection, flow, and presence.",
  keywords: ["wellness", "women", "community", "luxury", "social club", "sensory experiences"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
