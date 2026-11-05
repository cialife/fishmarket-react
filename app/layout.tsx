import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Muara Baru",
  description: "Pasar Ikan Modern Muara Baru",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body>
        <AuthGuard>
          <Header />
          {children}
          <Footer />
        </AuthGuard>
      </body>
    </html>
  );
}
