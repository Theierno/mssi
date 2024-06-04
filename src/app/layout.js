// src/app/layout.js
import { Inter } from "next/font/google";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sunu Vote Sn",
  description: "Une plateforme de vote citoyenne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CustomNavbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
