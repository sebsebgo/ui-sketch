import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Sketch",
  description: "Sketch or speak to generate Park UI components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
