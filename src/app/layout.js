import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";

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
    icon: "/icon.svg", 
   
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Toaster 
          position="bottom-right" 
          toastOptions={{
            
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#FF3811', 
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#FF3811', 
                secondary: '#fff',
              },
            },
          }}
        />
        {children} 
        </AuthProvider>
        
      </body>
    </html>
  );
}