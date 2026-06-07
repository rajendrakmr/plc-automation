import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
// import "@/app/css/style.css";


import ToastProvider from "@/app/components/providers/ToastProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "PLC Automation India | New & Obsolete Industrial Spare Parts",
    template: "%s | PLC Automation India",
  },
  description:
    "Leading supplier of new, discontinued, and obsolete automation spare parts. 3M+ parts in stock. Global shipping.",
  keywords: ["PLC", "automation", "spare parts", "Siemens", "Allen Bradley", "industrial"],
  authors: [{ name: "PLC Automation" }],
  openGraph: {
    title: "PLC Automation India",
    description: "Industrial automation spare parts supplier",
    type: "website",
    locale: "en_IN",
    url: "https://plcautomation.in",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${dmSans.variable} ${syne.variable} font-sans antialiased`}
      >
        <Header />
          <ToastProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}