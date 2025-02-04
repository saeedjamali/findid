"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE, messengers } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import Nav from "./_components/nav/Nav";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { getApiUrl } from "@/utils/getApiUrl";
import LOADING from "./_components/pages/LOADING";
import { useAppProvider } from "./context/AppProvider";
import IdCard from "./_components/List/IdCard";
import SwiperTop10 from "./_components/swiper/SwiperTop10";
import Aside from "./_components/aside/Aside";
import OutsideClick from "./hook/OutsideClick";
import { TbFilterSearch } from "react-icons/tb";
import Image from "next/image";

export default function Home() {
  const [initialIds, setinitialIds] = useState([]);
  const [bookmarks, setIsBookmarks] = useState([]);
  const [sort, setSort] = useState(0);
  const [firstFetch, setFirstFetch] = useState(false);

  const {
    isFilter,
    isAuthUser,
    filterList,
    refresh,
    setRefresh,
    setFilterList,
  } = useAppProvider();

  useEffect(() => {
    setFilterList([]);
  }, []);
  return (
    <div className="relative">
      <Toaster />
      {/* <IdListInfinite initialIds={initialIds} /> */}
      <Aside show={isFilter} />
      {/* <Nav /> */}
      <div className="lg:container p-5 mx-auto  rounded-lg h-full ">
        <div className="w-full flex items-center justify-center my-16  md:hidden gap-4 ">
          <Image
            src={"/images/logo.png"}
            width={220}
            height={100}
            alt="logo-findid"
            className="cursor-pointer h-8 w-8"
            onClick={() => {
              setRefresh((prev) => !prev);
              router.push("/", { scroll: true });
              // router.refresh();
              // location.reload();
            }}
          />
          <h1
            className=" text-header font-shabnamBold text-[20px]  text-center  [text-shadow:_0_4px_8px_#182B54] 
                            text-xl md:text-2xl leading-snug font-manrope 
                            font-extrabold"
          >
            مرجع تبادل شناسه های اینترنتی
          </h1>
        </div>
        <SwiperTop10 />
        <IdListInfinite
          initialIds={initialIds}
          bookmarksId={JSON.parse(JSON.stringify(bookmarks))}
          setSort={setSort}
          sort={sort}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}
