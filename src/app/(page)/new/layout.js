import AppProvider from "@/app/context/AppProvider";
import { authenticateUser } from "@/utils/authenticateMe";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ثبت آگهی جدید",
  description: "ّFindId مرجع تبادل شناسه های اینترنتی",
};

export default async function newLayout({ children }) {
  const isAuthenticateUser = await authenticateUser();
  if (!isAuthenticateUser) {
    redirect("/");
  }
  return (
    <>
      <>
        <meta
          name="description"
          content={`مرجع تبادل شناسه های  اینترنتی FindId `}
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://findid.ir/new" />

        <meta property="og:site_name" value="Findid" />
        <meta
          property="og:title"
          content={`مرجع تبادل شناسه های  اینترنتی FindId `}
        />
        <meta
          property="og:description"
          content={`بزرگترین بستر تبادل آیدی و صفحات اینترنتی `}
        />
        <meta
          property="og:url"
          content={`https://findid.ir/`}
        />
      </>
      <AppProvider
        isAuthenticateUser={JSON.parse(JSON.stringify(isAuthenticateUser))}
      >
        {children}
      </AppProvider>
    </>
  );
}
