"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import Nav from "./_components/nav/Nav";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getApiUrl } from "@/utils/getApiUrl";
import LOADING from "./_components/pages/LOADING";
import { useAppProvider } from "./context/AppProvider";

export default function Home() {
  const [initialIds, setinitialIds] = useState([]);
  const [bookmarks, setIsBookmarks] = useState([]);
  const [sort, setSort] = useState(0);
  const [firstFetch, setFirstFetch] = useState(false);
  // const [filterList, setFilterList] = useState([]);
  const { isAuthUser, filterList, refresh, setRefresh } = useAppProvider();

  useEffect(() => {
    const getAds = async () => {
      const url = getApiUrl(0, Id_PER_PAGE);
      // /api/ads/get/all/${offset}/${limit}

      // console.log("filterList--->", filterList);
      try {
        const response = await fetch(`${url}/${isAuthUser?._id}/${sort}`);
        const data = await response.json();
        console.log("data--->", data);
        if (data.status == 201) {
          setinitialIds(data.idsCard);
          setIsBookmarks(data.bookmarksId);

          setFirstFetch(true);
        } else {
          toast("داده ای یافت نشد");
        }
      } catch (error) {
        console.log("error from main--->", error);
      }
    };
    getAds();
  }, [refresh]);

  // const authUser = await authenticateUser();
  // let bookmarksId = [];
  // if (authUser) {
  //   bookmarksId = await bookmarkModel.find({ user: authUser._id });
  // }

  return (
    <div>
      <Toaster />
      {/* <IdListInfinite initialIds={initialIds} /> */}
      <Nav />
      <div className=" container p-5 mx-auto mt-4  rounded-lg h-full">
        {!firstFetch ? (
          <LOADING />
        ) : (
          <IdListInfinite
            initialIds={initialIds}
            bookmarksId={JSON.parse(JSON.stringify(bookmarks))}
            setSort={setSort}
            sort={sort}
            setRefresh={setRefresh}
          />
        )}
      </div>
    </div>
  );
}
