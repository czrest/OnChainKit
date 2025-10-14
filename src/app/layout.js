import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layouts/Footer";

export const metadata = {
  title: "Decentralized Survey Hub",
  description:
    "Create, answer, and finalize ETH-rewarded surveys on a decentralized platform. Connect your wallet, interact with smart contracts, and explore dynamic transitions.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl:
        "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_2091ae51-06b5-48e5-ba22-ea1e91f62021-3qyXk9dPw8djbomBEoEFgVCC8DlHvz",
      button: {
        title: "Open with Ohara",
        action: {
          type: "launch_frame",
          name: "Decentralized Survey Hub",
          url: "https://receive-thank-811.app.ohara.ai",
          splashImageUrl:
            "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg",
          splashBackgroundColor: "#ffffff",
        },
      },
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <PageTransition>
              <Navbar />
              {children}
              <Footer/>
            </PageTransition>
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
