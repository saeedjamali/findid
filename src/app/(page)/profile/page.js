"use client";
import ViewAds from "@/app/_components/ads/ViewAds";
import { useAppProvider } from "@/app/context/AppProvider";
import { addss } from "@/config/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Button } from "@nextui-org/react";
import { FaList } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

function Profile() {
  const { isAuthUser } = useAppProvider();
  const [view, setView] = useState(1); //? 1: profile - 2: myAds
  const router = useRouter();
  if (!isAuthUser) {
    router.push("/");
  }
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col lg:flex-row h-full bg-btn-orange rounded-2xl ">
        <div className="w-full lg:w-36 rounded-r-2xl">
          <ul className="space-y-0 lg:space-y-2 lg:mt-4 flex flex-row  lg:flex-col gap-x-4 lg:gap-x-0 ">
            <li className="">
              <Button
                className="w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center"
                onPress={() => setView(1)}
              >
                <CgProfile className="text-[19px]" />
                <span className="hidden lg:flex">پروفایل</span>
              </Button>
            </li>
            <li>
              <Button
                className="w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center"
                onPress={() => setView(2)}
              >
                <FaList className="text-[19px]" />
                <span className="hidden lg:flex">آگهی های من</span>
              </Button>
            </li>
            <li>
              <Button
                className="w-full flex text-[14px] text-header hover:text-white bg-orange-500 p-4 m-2 items-center lg:justify-start gap-x-2  rounded-lg justify-center"
                onPress={() => setView(2)}
              >
                <FaRegBookmark className="text-[19px]" />
                <span className="hidden lg:flex">نشان شده ها</span>
              </Button>
            </li>
          </ul>
        </div>
        <div className=" flex-1 rounded-2xl p-4 w-full h-full bg-orange-50 m-1">
          {view == 1 ? (
            <div className=" h-full w-full">Profile</div>
          ) : view == 2 ? (
            <div className=" h-full w-full">My Ads</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;
