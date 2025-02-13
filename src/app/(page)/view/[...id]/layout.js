import { getIds } from "@/actions/getIds";
import AppProvider from "@/app/context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";
import Head from "next/head";

// export const metadata = {
//   title: "مشاهده آگهی",
//   description:
//     "بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف",
// };
export default async function ViewLayout({ children }) {
  const isAuthenticateUser = await authenticateUser();
  // const initialIds = await getIds(0, Id_PER_PAGE);
  return (
    <>
      <head>
       
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>مرجع تبادل شناسه های اینترنتی </title>
        <meta
          name="description"
          content="- ----------------------------------------راشد."
        />

      
        <meta property="og:image" content="https://findid.ir/images/logo.png" />
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
        <meta property="og:url" content="https://findid.ir/" />
      </head>
      {/* <Head>
        <title>FindId : {"ads?.title"}</title>
        <meta
          name="description"
          content={`مرجع تبادل شناسه های  اینترنتی FindId ${"ads?.description"}`}
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://findid.ir/view" />

        <meta property="og:site_name" value="Findid" />
        <meta
          property="og:title"
          content={`مرجع تبادل شناسه های  اینترنتی FindId ${"ads?.id"}`}
        />
        <meta
          property="og:description"
          content={`بزرگترین بستر تبادل آیدی و صفحات اینترنتی ${"ads?.description"}`}
        />
        <meta
          property="og:url"
          content={`https://findid.ir/${"ads?.title"}?id=${"ads._id"}`}
        />
      </Head> */}
      <AppProvider
        isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
      >
        {children}
      </AppProvider>
    </>
  );
}
