/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { AuthProvider } from "./AuthProvider";
import localFont from "next/font/local";
import "./globals.css";
import { updateExpiredPlans } from "@/app/api/SubscriptionCheck/server-task";
import SessionExpiryManager from "@/app/components/SessionExpiryManager";
import { GoogleAnalytics } from "@next/third-parties/google";
import { startMealPlanScheduler } from "./lib/mealPlanScheduler";
import Script from "next/script";
import { generateWeeklyMealPlans } from "./lib/weeklyMealPlanGenerator";

interface RootLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "gbMeals",
  description: "Get Control Your Health",
};


// @ts-ignore
export default async function RootLayout({children,title = metadata.title,description = metadata.description,}: RootLayoutProps) {



  updateExpiredPlans();
  setTimeout(async () => {
    // await  generateWeeklyMealPlans()
  }, 1000);
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <Script
            strategy="afterInteractive" // ensures script is loaded after page is interactive
            src="https://www.googletagmanager.com/gtag/js?id=G-43L99VSCR0"
            async
          />
          <Script
            id="google-ads-script"
            strategy="afterInteractive" // ensures script is loaded after page is interactive
          >
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-43L99VSCR0');
          `}
          </Script>
        </head>
        <body
          className={`bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <GoogleAnalytics gaId="G-43L99VSCR0" />
          {/* <SessionExpiryManager /> */}
        </body>
      </html>
    </AuthProvider>
  );
}
