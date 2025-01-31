"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE, messengers } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import Nav from "./_components/nav/Nav";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getApiUrl } from "@/utils/getApiUrl";
import LOADING from "./_components/pages/LOADING";
import { useAppProvider } from "./context/AppProvider";
import IdCard from "./_components/List/IdCard";
import SwiperTop10 from "./_components/swiper/SwiperTop10";

export default function Home() {
  const [initialIds, setinitialIds] = useState([]);
  const [bookmarks, setIsBookmarks] = useState([]);
  const [sort, setSort] = useState(0);
  const [firstFetch, setFirstFetch] = useState(false);

  const { isAuthUser, filterList, refresh, setRefresh } = useAppProvider();

  return (
    <div>
      <Toaster />
      {/* <IdListInfinite initialIds={initialIds} /> */}
      <Nav />
      <div className="lg:container p-5 mx-auto  rounded-lg h-full">
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
