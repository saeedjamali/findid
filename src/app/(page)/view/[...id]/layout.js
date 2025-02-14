import { getIds } from "@/actions/getIds";
import AppProvider from "@/app/context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";
import Head from "next/head";
import { headers } from "next/headers";

// export const metadata = {
//   title: "مشاهده آگهی",
//   description:
//     "بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف",
// };
export default async function ViewLayout({ children, params }) {
  const isAuthenticateUser = await authenticateUser();
  // const initialIds = await getIds(0, Id_PER_PAGE);
  const headersList = headers();
  const fullUrl = headersList.get("referer") || ""; // Get the full URL
  const pathname = new URL(fullUrl).pathname;
  const searchParams = new URL(fullUrl, "https://findid.ir/view").search;

  // console.log("params------------------>", fullUrl);
  // console.log("pathname------------------>", pathname);
  let value = searchParams.split("=")[1];
  console.log("searchParams------------------>", value);
  return (
    <>
      <head>
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
