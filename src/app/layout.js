import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/ShareComponents/NavBar";
import Footer from "@/ShareComponents/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Car Doctor | Top Notch Service",
  description: "Professional Car Repair and Maintenance",
  icons: {
    icon: "/icon.svg", // নিশ্চিত করুন ফাইলটি public ফোল্ডারে আছে
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar></NavBar>
        {children}
        <Footer></Footer>

      </body>
    </html>
  );
}
