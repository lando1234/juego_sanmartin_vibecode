import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furgon Final",
  description: "Beat'em up arcade del tren San Martin hecho con Next.js y React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
