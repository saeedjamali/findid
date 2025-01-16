"use client";
import ViewAds from "@/app/_components/ads/ViewAds";
import { useAppProvider } from "@/app/context/AppProvider";
import { addss } from "@/config/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Button, Card, Skeleton } from "@nextui-org/react";
import { FaList } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import MyAds from "../_components/dashboard/MyAds";
import MyBookmarks from "../_components/dashboard/MyBookmarks";
import { Toaster } from "react-hot-toast";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import Report from "../_components/dashboard/Report";


function Dashboard() {
  const { isAuthUser } = useAppProvider();
  const { role } = isAuthUser;
  const router = useRouter();
  // console.log("--------<", isAuthUser);
  const [view, setView] = useState(1); //? 1: My Ads - 2: My Bookmark

  if (!isAuthUser) {
    router.push("/");
  }

  const goToAds = async (id, title) => {
    window.open(`/view/${title}?id=${id}`, "_blank");
    // router.push(`/view/${title}?id=${id}`);
  };
  return (
    <div className="w-full h-screen">
      <Toaster />
      <div className="flex flex-col lg:flex-row h-full bg-btn-orange rounded-2xl ">
        <div className="w-full lg:w-36 rounded-r-2xl">
          <ul className="space-y-0 lg:space-y-2 lg:mt-4 flex flex-row  lg:flex-col gap-x-4 lg:gap-x-0 ">
            {/* <li className="">
              <Button
                className="w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center"
                onPress={() => setView(1)}
              >
                <CgProfile className="text-[19px]" />
                <span className="hidden lg:flex">پروفایل</span>
              </Button>
            </li> */}
            <li>
              <Button
                className={`w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center active:bg-orange-700 ${
                  view == 1 && "bg-orange-800 text-white"
                }`}
                onPress={() => setView(1)}
              >
                <FaList className="text-[19px]" />
                <span className="hidden lg:flex">آگهی های من</span>
              </Button>
            </li>
            <li>
              <Button
                className={`w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center active:bg-orange-700 ${
                  view == 2 && "bg-orange-800 text-white"
                }`}
                onPress={() => setView(2)}
              >
                <FaRegBookmark className="text-[19px]" />
                <span className="hidden lg:flex">نشان شده ها</span>
              </Button>
            </li>
            {role == "ADMIN" && (
              <li>
                <Button
                  className={`w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center active:bg-orange-700 ${
                    view == 3&& "bg-orange-800 text-white"
                  }`}
                  onPress={() => setView(3)}
                >
                  <MdOutlineReportGmailerrorred className="text-[19px]" />
                  <span className="hidden lg:flex">گزارش تخلفات</span>
                </Button>
              </li>
            )}
          </ul>
        </div>
        <div className=" flex-1 rounded-2xl p-4 w-full h-full bg-orange-50 m-1">
          {view == 1 ? (
            <div className=" h-full w-full">
              <MyAds ownerIdCard={isAuthUser._id} goToAds={goToAds} />
            </div>
          ) : view == 2 ? (
            <div className=" h-full w-full">
              <MyBookmarks ownerIdCard={isAuthUser._id} goToAds={goToAds} />

            </div>
          ) : 
          view == 3 ? (
            <div className=" h-full w-full">
              <Report ownerIdCard={isAuthUser._id} goToAds={goToAds} />

            </div>
          ) :null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
