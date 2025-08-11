
import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { PageTrackingProvider } from "@/components/PageTrackingProvider";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

export const metadata: Metadata = {
  title: "起業ストーリーズ",
  description: "大手企業出身者の起業体験談を共有するメディアサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Suspense fallback={null}>
          <PageTrackingProvider>
            {children}
          </PageTrackingProvider>
        </Suspense>
      </body>
    </html>
  );
}
