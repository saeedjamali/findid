import { getIds } from "@/actions/getIds";
import AppProvider from "@/app/context/AppProvider";
import { BASE_URL, GLOBAL_URL, Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";
import Head from "next/head";
import { headers } from "next/headers";

// export const metadata = {
//   title: "مشاهده آگهی",
//   description:
//     "بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف",
// };

// export function generateMetadata({ params }) {
//   console.log("params-------------->", params);
//   return {
//     title: "inline title ",
//     description: "inline description.",
//     openGraph: {
//       title: " opengraph inline title",
//       description: "opengraph inline title description",
//       url: "https://findid.ir",
//       images: [
//         {
//           url: "https://findid.ir/api/ads/image/173930052196860090profile%20(1).jpg/profile",
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//   };
// }

export default async function ViewLayout({ children, params }) {
  const isAuthenticateUser = await authenticateUser();
  const [id] = await params?.id;

  const response = await fetch(`${GLOBAL_URL}/api/ads/get/adsid/${id}`, {
    cache: "no-store",
  });
  const { idsCard } = await response.json();
  return (
    <>
      <Head>
        <title>FindId : {idsCard?.title}</title>
        <meta
          name="description"
          content={`مرجع تبادل شناسه های  اینترنتی FindId ${idsCard?.description}`}
        />

        <meta property="og:site_name" value="Findid" />
        <meta
          property="og:title"
          content={`مرجع تبادل شناسه های  اینترنتی FindId ${idsCard?.id}`}
        />
        <meta
          property="og:description"
          content={`بزرگترین بستر تبادل آیدی و صفحات اینترنتی ${idsCard?.description}`}
        />
        <meta
          property="og:url"
          content={`https://findid.ir/${idsCard?._id}?id=${idsCard.id}`}
        />
      </Head>
      <AppProvider
        isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
        viewAd={idsCard}
      >
        {children}
      </AppProvider>
    </>
  );
}
