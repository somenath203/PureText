import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./globals.css";
import Navbar from "./_components/Navbar";


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

export const metadata = {
  title: "PureText",
  description: "an application to calculate the percentage of toxicity in a sentence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="synthwave">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased poppins-regular`}
      >
        <Navbar />

        {children}

        <ToastContainer />

      </body>
    </html>
  );
}
