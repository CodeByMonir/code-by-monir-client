import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
// import Footer from "../components/Footer";
import HeroBackgroundOnlyText from "@/component/HeroBackground";
import Navbar from "@/component/shared/Navbar";
import "./globals.css";
import Footer from "@/component/shared/Footer";
import { ThemeProvider } from "next-themes";

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
    default: "Monir Hossen | MERN Stack Developer | CodeByMonir",
    template: "%s | CodeByMonir",
  },
  description:
    "Portfolio of Monir Hossen (CodeByMonir), a passionate MERN Stack Developer building scalable web applications and turning ideas into responsive reality.",
  keywords: [
    "Monir Hossen",
    "CodeByMonir",
    "Code By Monir",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Monir Hossen" }],
  creator: "Monir Hossen",
  metadataBase: new URL("https://codebymonir.vercel.app"), // Eta LinkedIn & SEO er og:image path config-er jonno must

  // Open Graph (LinkedIn, Facebook preview-r jonno)
  openGraph: {
    title: "Monir Hossen | MERN Stack Developer",
    description:
      "Explore full-stack web applications and interactive projects built by Monir Hossen (@CodeByMonir).",
    url: "https://codebymonir.vercel.app",
    siteName: "Code By Monir Portfolio",
    images: [
      {
        url: "/og-image.webp", // public folder-e og-image.webp thakte hobe (1200x630px)
        width: 1200,
        height: 630,
        alt: "Monir Hossen Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Monir Hossen | MERN Stack Developer",
    description:
      "Explore full-stack web applications and interactive projects built by Monir Hossen (@CodeByMonir).",
    images: ["/og-image.webp"],
  },

  // Robots indexing
  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 transition-colors duration-500 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <HeroBackgroundOnlyText />
          </div>

          <div className="relative z-10 flex flex-col">
            <Navbar />

            <main>{children}</main>

            <Footer />
          </div>
          <ToastContainer position="top-right" theme="auto" />
        </ThemeProvider>
      </body>
    </html>
  );
}
