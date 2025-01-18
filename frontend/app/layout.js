'use client'
import localFont from "next/font/local";
import "./globals.css";
// import axiosClient from "./axiosClient";
import ThreeDotes from "./componnents/ThreeDotes";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";

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



const queryClient=new QueryClient() ;

export default function RootLayout({ children }) {
  // async function fetchSession(){
  //   await axiosClient.get('/sanctum/csrf-cookie',{
  //       headers:{
  //         'Authorization': `Bearer 1|UH3dWYiDSvi82Lpfn5TZsjevLjW0KfNS99fJOoEYfb70a914`,
  //       }
  //    })
  // }
  // fetchSession()
  return (
    <QueryClientProvider  client={queryClient}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased  w-screen h-screen overflow-hidden`}>
          <div className="flex flex-col  bg-gray-900 w-screen h-screen overflow-hidden">
            <ThreeDotes />
            <div className="h-[96vh]">
            {children}
            </div>
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
