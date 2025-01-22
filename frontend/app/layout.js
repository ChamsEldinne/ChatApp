import localFont from "next/font/local";
import "./globals.css";
import ThreeDotes from "./componnents/ThreeDotes";
import Provider from './util/Provider'

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

export const metaData={
  title:"Chat",
  description:""
}




export default function RootLayout({ children }) {

  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased  w-screen h-screen overflow-hidden`}>
          <div className="flex flex-col  bg-gray-900 w-screen h-screen overflow-hidden">
            <ThreeDotes />
            <Provider>
              {children}
            </Provider>
          </div>
        </body>
      </html>
  );
}
