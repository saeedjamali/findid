import AppProvider from "@/app/context/AppProvider";
import { authenticateUser } from "@/utils/authenticateMe";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ویرایش آگهی ",
  description: "- بزرگترین بستر تبادل آیدی و صفحات اینترنتی- خرید و فروش کانال،پیج،گروه و آیدی های پیامرسان های مختلف",
};

export default async function newLayout({ children }) {
  const isAuthenticateUser = await authenticateUser();
  if (!isAuthenticateUser) {
    redirect("/");
  }
  return (
    <>
      <>
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://findid.ir/edit" />

        <meta property="og:site_name" value="Findid" />
        <meta
          property="og:title"
          content={`مرجع تبادل شناسه های  اینترنتی FindId `}
        />
        <meta
          property="og:description"
          content={`بزرگترین بستر تبادل آیدی و صفحات اینترنتی `}
        />
        <meta property="og:url" content={`https://findid.ir/`} />
      </>
      <AppProvider
        isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
      >
        {children}
      </AppProvider>
    </>
  );
}
