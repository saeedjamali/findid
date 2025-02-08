"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE, messengers, services } from "@/config/constants";
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
import ServiceCard from "./_components/card/ServiceCard";

export default function Home() {
  const [initialIds, setinitialIds] = useState([]);
  const [bookmarks, setIsBookmarks] = useState([]);
  const [sort, setSort] = useState(0);
  const [service, setService] = useState(0);
  const [firstFetch, setFirstFetch] = useState(false);
  const [isErrorService, setIsErrorService] = useState(false);
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
      <Aside />
      {/* <Nav /> */}
      <div className="lg:container p-5 mx-auto  rounded-lg h-full ">
        <div className="w-full flex items-center justify-center my-16   gap-4 ">
          <Image
            src={"/images/logo.webp"}
            width={220}
            height={100}
            alt="logo-findid"
            className="cursor-pointer md:h-12 md:w-12 h-8 w-8"
            onClick={() => {
              setRefresh((prev) => !prev);
              router.push("/", { scroll: true });
              // router.refresh();
              // location.reload();
            }}
          />
          <h1
            className=" text-header font-shabnamBold text-[20px]  text-center  [text-shadow:_0_4px_8px_#182B54] text-2xl  md:text-3xl lg:text-4xl leading-10  font-extrabold "
          >
            <strong>مرجع تبادل شناسه های اینترنتی</strong>
          </h1>
          {/* <h1
            className=" text-header font-shabnamBold text-[20px]  text-center  [text-shadow:_0_4px_8px_#182B54] 
                            text-xl  md:text-2xl lg:text-3xl leading-10  
                            font-extrabold md:hidden"
          >
            مرجع تبادل شناسه های اینترنتی
          </h1> */}
        </div>
        <div className={`w-full  p-2 my-4`}>
          <ServiceCard
            services={services}
            server={false} //? برای نمایش عنوان در سرویس اsj
            setService={setService}
            current={service}
            isErrorService={isErrorService}
          />
        </div>
        <SwiperTop10 />
        <IdListInfinite
          initialIds={initialIds}
          bookmarksId={JSON.parse(JSON.stringify(bookmarks))}
          setSort={setSort}
          sort={sort}
          setRefresh={setRefresh}
          service={service}
        />
      </div>
    </div>
  );
}
