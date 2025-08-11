
import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { PageTrackingProvider } from "@/components/PageTrackingProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "起業ストーリーズ",
  description: "大手企業出身者の起業体験談を共有するメディアサイト",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=TBUDGothic+Std+SL:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${pacifico.variable} antialiased`}
        style={{ fontFamily: "'TBUDゴシック Std SL', sans-serif" }}
      >
        <GoogleAnalytics />
        <AuthProvider>
          <Suspense fallback={null}>
            <PageTrackingProvider>
              {children}
            </PageTrackingProvider>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
