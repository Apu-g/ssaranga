import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SvgFilterDefs from "@/components/SvgFilterDefs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SsaRanga — The Mind Spa | Nurturing Roots, Strengthening Minds",
  description:
    "A nurturing space for calm minds, clear thinking and confident growth. Wellness programs for children, women and elders in Bengaluru.",
  keywords: [
    "SsaRanga",
    "Mind Spa",
    "wellness",
    "children",
    "mindfulness",
    "Bengaluru",
    "personal growth",
    "emotional wellbeing",
    "confidence building",
  ],
  openGraph: {
    title: "SsaRanga — The Mind Spa",
    description:
      "A nurturing space for calm minds, clear thinking and confident growth.",
    type: "website",
    locale: "en_IN",
    siteName: "SsaRanga",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <SvgFilterDefs />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
