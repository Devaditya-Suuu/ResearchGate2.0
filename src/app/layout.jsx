import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/ui/navbar";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ResearchGate Club",
    template: "%s | ResearchGate Club",
  },
  description:
    "Official site for the college ResearchGate Club: events, members, publications, merchandise, and more.",
  icons: { icon: "/icons/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/icons/favicon.png" sizes="any" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Navbar */}
            <Navbar />
            <main className="pt-20 flex-1">{children}</main>
            <footer className="border-t py-10 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} ResearchGate Club. All rights reserved.
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
