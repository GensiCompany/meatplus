import localFont from "next/font/local";
import { headers } from "next/headers";

import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ContactNow from "@/components/layout/contactNow/ContactNow";
import Body from "@/components/layout/Body";
import Provider from "@/components/Provider";

const geistMyriadPro = localFont({
  src: "../../public/fonts/myriadPro/MyriadPro-BoldCondIt.otf",
  variable: "--font-myriad-pro",
  weight: "700",
});

const geistRoboto = localFont({
  src: [
    {
      path: "../../public/fonts/roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Meat Plus No1 Korean BBQ - Thịt nướng hảo hạng Hàn Quốc",
  description:
    "Ra đời từ 2013, Meat Plus – thương hiệu thịt nướng nổi tiếng đến từ Hàn Quốc nay đã có mặt tại hầu khắp các quận nội thành của thủ đô.",
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  // If the current page is "/ping", return only children (no layout)
  if (pathname === "/ping") {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistRoboto.variable} ${geistMyriadPro.variable} min-h-[100vh] w-full flex flex-col`}
      >
        <Provider>
          <Header />
          <Body>{children}</Body>
          <Footer />
          <ContactNow />
        </Provider>
      </body>
    </html>
  );
}
