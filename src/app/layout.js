import { NextUIProvider } from "@nextui-org/react";
import Nav from "./_components/nav/Nav";
import "./globals.css";
import Header from "@/app/_components/header/Header";
import { getIds } from "@/actions/getIds";
import AppProvider from "./context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";

export const metadata = {
  openGraph: {
    title: "مرجع تبادل شناسه های اینترنتی FindId",
    description: "بزرگترین بستر تبادل آیدی و صفحات اینترنتی",
  },
};

export const openGraphImage = { images: "/images/logo.png" };

export default async function RootLayout({ children }) {
  const isAuthenticateUser = await authenticateUser();
  // const initialIds = await getIds(0, Id_PER_PAGE);

  return (
    <html lang="fa" dir="rtl" >
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
          className="h-64 w-64"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>مرجع تبادل شناسه های اینترنتی FindId</title>
        <meta
          name="description"
          content="- بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف - هدف از پیاده سازی سامانه فایند آیدی فراهم آوردن بستری برای
                ارتباط بین خریداران محتوی شامل کانال ، گروه ، پیج و صفحات
                اینترنتی و تولید کنندگان و صاحبان رسانه می باشد. آگهی های مندرج
                در سایت شامل آگهی فروش محتوی(کانال،پیج،گروه و ...) ، درخواست
                ادمین ، درخواست تبادل و ارائه بستر برای درج تبلیغات می باشد."
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://findid.ir" />

        <meta property="og:site_name" value="Findid" />
        <meta
          property="og:title"
          content="مرجع تبادل شناسه های  اینترنتی FindId"
        />
        <meta
          property="og:description"
          content="بزرگترین بستر تبادل آیدی و صفحات اینترنتی"
        />
        <meta property="og:url" content="https://findid.ir/" />
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
              <div className="bg-[url('/images/bg-nav.svg')] bg-fixed rounded-2xl  ">
                {children}
              </div>
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
