// /* eslint-disable @typescript-eslint/no-unused-vars */
// import type { Metadata } from "next";
// import { AuthProvider } from "./AuthProvider";
// import localFont from "next/font/local";
// import "./globals.css";
// import { updateExpiredPlans } from "@/app/api/SubscriptionCheck/server-task";
// import SessionExpiryManager from "@/app/components/SessionExpiryManager";
// import { GoogleAnalytics } from "@next/third-parties/google";
// import { startMealPlanScheduler } from "./lib/mealPlanScheduler";
// import Script from "next/script";
// import { generateWeeklyMealPlans } from "./lib/weeklyMealPlanGenerator";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "gbMeals",
//   description: "Get Control Your Health",
// };

// type LayoutProps = {
//   children: React.ReactNode;
//   title?: string;
//   description?: string;
// }


// export default function RootLayout({ 
//   children,
//   title = metadata.title as string,
//   description = metadata.description as string,
// }: LayoutProps) {



//   updateExpiredPlans();
//   setTimeout(async () => {
//     // await  generateWeeklyMealPlans()
//   }, 1000);
//   return (
//     <AuthProvider>
//       <html lang="en">
//         <head>
//           <link rel="icon" href="/favicon.png" />
//           <meta name="description" content={description} />
//           <title>{title}</title>

//           <Script
//             strategy="afterInteractive" // ensures script is loaded after page is interactive
//             src="https://www.googletagmanager.com/gtag/js?id=G-43L99VSCR0"
//             async
//           />
//           <Script
//             id="google-ads-script"
//             strategy="afterInteractive" // ensures script is loaded after page is interactive
//           >
//             {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());

//             gtag('config', 'G-43L99VSCR0');
//           `}
//           </Script>
//         </head>
//         <body
//           className={`bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           {children}
//           <GoogleAnalytics gaId="G-43L99VSCR0" />
//           {/* <SessionExpiryManager /> */}
//         </body>
//       </html>
//     </AuthProvider>
//   );
// }


import type { Metadata } from "next";
import { AuthProvider } from "./AuthProvider";
import localFont from "next/font/local";
import "./globals.css";
import { updateExpiredPlans } from "@/app/api/SubscriptionCheck/server-task";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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

export default function RootLayout({ 
  children,
  ...props
}: {
  children: React.ReactNode;
} & {
  title?: string;
  description?: string;
}) {
  const title = props.title || metadata.title;
  const description = props.description || metadata.description;
  
  updateExpiredPlans();
  
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" />
          <title>{title}</title>
          <meta name="description" content={description?.toString()} />
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-43L99VSCR0"
            async
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
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
        </body>
      </html>
    </AuthProvider>
  );
}