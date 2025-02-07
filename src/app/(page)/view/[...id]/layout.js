import { getIds } from "@/actions/getIds";
import AppProvider from "@/app/context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";
import { authenticateUser } from "@/utils/authenticateMe";
import { addSiteJsonLd } from "@/utils/schemasSeo";

export const metadata = {
  title: "مشاهده آگهی",
  description:
    "- بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف -هدف از پیاده سازی سامانه فایند آیدی فراهم آوردن بستری برای ارتباط بین خریداران محتوی شامل کانال ، گروه ، پیج و صفحات اینترنتی و تولید کنندگان و صاحبان رسانه می باشد. آگهی های مندرج  در سایت شامل آگهی فروش محتوی(کانال،پیج،گروه و ...) ، درخواست ادمین ، درخواست تبادل و ارائه بستر برای درج تبلیغات می باشد. ",
};

export default async function RootLayout({ children }) {
  const isAuthenticateUser = await authenticateUser();
  // const initialIds = await getIds(0, Id_PER_PAGE);
  return (
    <>
      <AppProvider
        isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
      >
        {children}
      </AppProvider>
    </>
  );
}
