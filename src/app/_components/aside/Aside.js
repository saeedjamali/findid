import { useAppProvider } from "@/app/context/AppProvider";
import React, { useRef, useState } from "react";
import Messengers from "../nav/Messengers";
import Types from "../nav/Types";
import Subjects from "../nav/Subjects";
import Search from "../search/Search";
import { ImCancelCircle } from "react-icons/im";
import OutsideClick from "@/app/hook/OutsideClick";
import { TbFilterSearch } from "react-icons/tb";
import { LuBadgeHelp } from "react-icons/lu";
import { services } from "@/config/constants";
import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";
import Image from "next/image";
function Aside() {
  const {
    isFilter,
    setIsFilter,
    filterList,
    setFilterList,
    setRefresh,
    search,
    setSearch,
  } = useAppProvider();

  const copyToClipboard = (value, label) => {
    try {
      navigator.clipboard.writeText(value);
      toast.success(label);
      //   toast.success(label);
    } catch (err) {
      console.error(err);
    }
  };
  const [showHelper, setShowHelper] = useState(false);
  const boxRef = useRef(null);
  const boxHelperRef = useRef(null);
  OutsideClick(boxRef, setIsFilter);
  OutsideClick(boxHelperRef, setShowHelper);
  return (
    <>
      {(isFilter || showHelper) && (
        <div className="w-[85%] md:w-1/2 lg:w-1/3  h-screen z-40 bg-transparent fixed top-5  left-0 bottom-0">
          <span className="text-slate-500 absolute -right-8 text-xl bg-glass px-2 rounded-l-none cursor-pointer">
            <ImCancelCircle />
          </span>
        </div>
      )}
      <div
        className={`fixed w-12 flex top-24 cursor-pointer  z-50   bg-glass-dark rounded-r-none  p-1 pr-2 ${
          isFilter ? "-right-9" : "right-0"
        }`}
        onClick={() => {
          setShowHelper(false);
          setIsFilter((prev) => !prev);
        }}
      >
        <TbFilterSearch className="text-btn-orange text-3xl" />
        {filterList?.length != 0 && (
          <span className="absolute -top-2 -left-2 bg-btn-orange text-white rounded-full w-5 h-5 text-[12px] flex items-center justify-center">
            {filterList?.length}
          </span>
        )}
      </div>
      <div
        className={`fixed w-12 flex top-36 cursor-pointer  z-50   bg-glass-dark rounded-r-none  p-1 pr-2 ${
          showHelper ? "-right-9" : "right-0"
        }`}
        onClick={() => {
          setIsFilter(false);
          setShowHelper((prev) => !prev);
        }}
      >
        <LuBadgeHelp className="text-btn-orange text-3xl" />
      </div>

      <aside
        className={`w-[85%] md:w-1/2 lg:w-1/3 fixed top-0 left-0 bottom-0 min-h-screen  z-50  overflow-y-auto   transition-all delay-150000 duration-300 ease-in-out   ${
          !isFilter && "hidden"
        }`}
        ref={boxRef}
      >
        <div
          className={`w-full min-h-screen gap-4 bg-glass-dark overflow-y-auto rounded-l-none   `}
        >
          <Search
            placeholder={"جستجو بر حسب آیدی یا عنوان"}
            setIsFilter={setIsFilter}
          />
          <div className="grid grid-cols-1 gap-2 w-full  mt-2">
            <Messengers />
            <Types />
            <Subjects />
          </div>
        </div>
      </aside>

      {showHelper && (
        <aside
          className={`w-[85%] md:w-1/2 lg:w-1/3 fixed top-0 left-0 bottom-0 min-h-screen  z-50  overflow-y-auto   transition-all delay-150000 duration-300 ease-in-out  `}
          ref={boxHelperRef}
        >
          <div
            className={`w-full min-h-screen gap-4 bg-glass-dark   rounded-l-none p-4  `}
          >
            <div className="relative ring-header ring-1 p-4 rounded-lg mt-8">
              <h2 className="text-h1-color text-[14px] font-shabnamBold text-right my-4 absolute -top-7 right-4 px-4 bg-slate-50 rounded-lg z-50">
                اهداف و تعاریف
              </h2>
              <h3 className="text-h2-color text-justify text-[12px]">
                هدف از پیاده سازی سامانه فایند آیدی فراهم آوردن بستری برای
                ارتباط بین خریداران محتوی شامل کانال ، گروه ، پیج و صفحات
                اینترنتی و تولید کنندگان و صاحبان رسانه می باشد. آگهی های مندرج
                در سایت شامل آگهی فروش محتوی(کانال،پیج،گروه و ...) ، درخواست
                ادمین ، درخواست تبادل و ارائه بستر برای درج تبلیغات می باشد.
              </h3>
            </div>
            <div className="relative ring-header ring-1 p-4 rounded-lg mt-8">
              <h2 className="text-h1-color text-[14px] font-shabnamBold text-right my-4 absolute -top-7 right-4 px-4 bg-slate-50 rounded-lg z-50">
                امکانات
              </h2>
              <h3 className="text-h2-color text-justify text-[12px]">
                در این بستر ما سرویس های زیر را ارائه خواهیم داد:
                <ul>
                  {services.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex flex-col items-start justify-start text-right text-[12px] gap-2 mt-4"
                      >
                        <span className="flex justify-start items-start gap-2">
                          <span className="text-md">{item?.icon}</span>
                          <h2 className="text-header text-nowrap">
                            {item?.title1}
                          </h2>{" "}
                        </span>
                        <span className="">{item.description}</span>
                      </li>
                    );
                  })}
                </ul>
              </h3>
            </div>

            <div className="relative ring-header ring-1 p-4 rounded-lg mt-8">
              <h2 className="text-h1-color text-[14px] font-shabnamBold text-right my-4 absolute -top-7 right-4 px-4 bg-slate-50 rounded-lg z-50">
                ارتباط با پشتیبان
              </h2>
              <div className="flex justify-between items-center w-full text-[12px]">
                <span>آیدی تلگرام </span>
                <span
                  className="gap-2 flex items-center justify-center text-left rtl:left-0 text-[12px] cursor-pointer"
                  onClick={() =>
                    copyToClipboard("@ findid_support", "آیدی پشتیبان کپی شد")
                  }
                >
                  <span>findid_support</span>

                  <span className="w-6 h-6">
                    <Image
                      src={"/images/messengers/icons/telegram-ic.png"}
                      width={100}
                      height={100}
                      alt="telegram"
                    />
                  </span>
                  <IoCopy />
                </span>
              </div>
              <div className="flex justify-between items-center w-full text-[12px] mt-2">
                <span>آیدی بله </span>
                <span
                  className="gap-2 flex items-center justify-center text-left rtl:left-0 text-[12px] cursor-pointer"
                  onClick={() =>
                    copyToClipboard("@findid_sup", "آیدی پشتیبان کپی شد")
                  }
                >
                  <span>findid_sup</span>

                  <span className="w-6 h-6">
                    <Image
                      src={"/images/messengers/icons/bale-ic.png"}
                      width={100}
                      height={100}
                      alt="telegram"
                    />
                  </span>
                  <IoCopy />
                </span>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default Aside;
