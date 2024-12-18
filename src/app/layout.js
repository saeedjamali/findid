import { NextUIProvider } from "@nextui-org/react";
import Nav from "./_components/nav/Nav";
import "./globals.css";
import Header from "@/app/_components/header/Header";
import { getIds } from "@/actions/getIds";
import AppProvider from "./context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  const initialIds = await getIds(0, Id_PER_PAGE);
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div>
          <Header />

          <div className="bg-[url('/images/bg-nav.svg')] bg-fixed h-screen">
            <div className=" ">
              <Nav />
              <AppProvider>{children}</AppProvider>
        
             
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
