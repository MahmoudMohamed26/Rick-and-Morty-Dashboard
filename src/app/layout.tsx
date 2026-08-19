import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const spaceGrotesk = localFont({
  src: "../fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rick & Morty Dashboard",
  description: "Rick & Morty Dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <NextTopLoader color="#171616" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
