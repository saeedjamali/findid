import { NextUIProvider } from "@nextui-org/react";
import Nav from "./_components/nav/Nav";
import "./globals.css";
import Header from "@/app/_components/header/Header";
import { getIds } from "@/actions/getIds";
import AppProvider from "./context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Footer from "./_components/footer/Footer";

// export const metadata = {
//   title: "مرجع تبادل شناسه های اینترنتی",
//   description:
//     "بزرگترین بستر تبادل آیدی و صفحات اینترنتی، خرید و فروش ، ارائه بستر تبلیغات و جذب ادمین",
// };

// export const openGraphImage = { images: "/images/logo.png" };

export function generateMetadata() {
  return {
    title: "مرکز تبادل شناسه های(آیدی) اینترنتی",
    description:
      "- بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف - فایند آیدی بستری برای ارتباط بین خریداران محتوی شامل کانال ، گروه ، پیج و صفحات اینترنتی و تولید کنندگان و صاحبان رسانه می باشد. آگهی های مندرج در سایت شامل آگهی فروش محتوی(کانال،پیج،گروه و ...) ، درخواست ادمین ، درخواست تبادل و ارائه بستر برای درج تبلیغات می باشد. بزرگترین بستر تبادل آیدی و صفحات اینترنتی، خرید و فروش ، ارائه بستر تبلیغات و جذب ادمین",
    openGraph: {
      title: " مرکز تبادل شناسه های اینترنتی",
      description:
        "بزرگترین بستر تبادل آیدی و صفحات اینترنتی، خرید و فروش ، ارائه بستر تبلیغات و جذب ادمین",
      url: "https://findid.ir",
      images: [
        {
          url: "https://findid.ir/images/logo.webp",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function RootLayout({ children, ads }) {
  const isAuthenticateUser = await authenticateUser();
  // const initialIds = await getIds(0, Id_PER_PAGE);

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
          className="h-64 w-64"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* <meta
          name="description"
          content="- بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف - فایند آیدی بستری برای
                ارتباط بین خریداران محتوی شامل کانال ، گروه ، پیج و صفحات
                اینترنتی و تولید کنندگان و صاحبان رسانه می باشد. آگهی های مندرج
                در سایت شامل آگهی فروش محتوی(کانال،پیج،گروه و ...) ، درخواست
                ادمین ، درخواست تبادل و ارائه بستر برای درج تبلیغات می باشد."
        /> */}

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://findid.ir" />

        {/* <meta property="og:image" content="https://findid.ir/images/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" value="Findid" />
        <meta
          property="og:title"
          content="مرجع تبادل شناسه های  اینترنتی FindId"
        />
        <meta
          property="og:description"
          content="بزرگترین بستر تبادل آیدی و صفحات اینترنتی"
        />
        <meta property="og:url" content="https://findid.ir/" /> */}
      </head>

      {/* <!-- Google tag (gtag.js) --> */}

      <body>
        <div>
          <AppProvider
            isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
          >
            <Header
              isAuthenticateUser={JSON.parse(
                JSON.stringify(isAuthenticateUser)
              )}
            />
            <main className="p-4 bg-header min-h-screen ">
              <div className="bg-[url('/images/bg-nav.svg')]  rounded-2xl bg-repeat ">
                {children}
              </div>
              <Footer />
            </main>
          </AppProvider>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addSiteJsonLd()}
          key="site-jsonld"
        />
      </body>
    </html>
  );
}
