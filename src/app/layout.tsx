import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactSidebar from "@/components/layout/ContactSidebar";
import Background from "@/components/effects/Background";
import Cursor from "@/components/effects/Cursor";
import Loader from "@/components/effects/Loader";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WEBXPRO | MUHAMMAD UMAIR & TEAM - Digital Solutions",
    template: "%s | WEBXPRO - Digital Solutions",
  },
  description:
    "Muhammad Umair & Team deliver ultra-modern website development, custom SaaS software, hospital management portals, hair transplant clinics systems, and POS automation globally.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Loader />
        <Cursor />
        <Background />
        <ContactSidebar />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
