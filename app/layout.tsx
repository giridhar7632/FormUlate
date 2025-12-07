import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/Theme";
import { AuthProvider } from "@/app/Auth";

const prompt = Prompt({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://formulate-six.vercel.app"),
  title: {
    default: "FormUlate simple forms from language",
    template: "%s | FormUlate",
  },
  description:
    "Type in your requirements and get the beautiful forms generated with AI.",
  openGraph: {
    title: "FormUlate simple forms from language",
    description:
      "Type in your requirements and get the beautiful forms generated with AI.",
    url: "https://formulate-six.vercel.app",
    siteName: "FormUlate",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "FormUlate simple forms from language",
    card: "summary_large_image",
  },
  verification: {
    google: "2MoK1TYNBlfHGllJGjNf-OjxhPujgb4FrznsWELiVkU",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${prompt.className} dark:bg-gray-900`}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
  );
}
