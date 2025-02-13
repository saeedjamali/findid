import { getIds } from "@/actions/getIds";
import AppProvider from "@/app/context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";
import { NextSeo } from "next-seo";

export const metadata = {
  title: "مشاهده آگهی",
  description:
    "بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف",
};
export default async function RootLayout({ children, searchParams }) {
  const isAuthenticateUser = await authenticateUser();

  // const initialIds = await getIds(0, Id_PER_PAGE);
  return (
    <>
      <NextSeo
        title={"ads?.title"}
        description={"ads?.description"}
        openGraph={{
          title: "openGraph - ads?.title",
          description: "openGraph - ads?.description",
          url: ` ${GLOBAL_URL}/view/${"ads?.title"}?id=${"ads?._id"}`,
          images: [
            {
              url: `https://findid.ir/api/ads/image/173930059008288613profile%20(5).jpg/profile`,
            },
          ],
        }}
      />
      <AppProvider
        isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
      >
        {children}
      </AppProvider>
    </>
  );
}
