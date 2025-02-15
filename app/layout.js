import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/Navbar";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "manrope",
});

export const metadata = {
  title: "Hyoteki | Improve your Japanese language skills",
  description: "Learn Japanese with practice tests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${interTight.className} antialiased overflow-hidden h-dvh w-full bg-[#0D1B2A] text-[#E0E1DD]`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
