"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import Nav from "./_components/nav/Nav";
import { Toaster } from "react-hot-toast";
// import { authenticateUser } from "@/utils/authenticateMe";
// import bookmarkModel from "@/models/IDCard/Bookmarks";
// import { useAppProvider } from "./context/AppProvider";
import { useEffect, useState } from "react";
import { getApiUrl } from "@/utils/getApiUrl";
import LOADING from "./_components/pages/LOADING";

export default function Home() {
  const [initialIds, setinitialIds] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getAds = async () => {
      const url = getApiUrl(0, Id_PER_PAGE);
      // console.log("filterList--->", filterList);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("data--->", data);
        if (data.status == 201) {
          setinitialIds(data.idsCard);
          setRefresh(true);
        } else {
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
  console.log("data root--->", initialIds);
  return (
    <div>
      <Toaster />
      {/* <IdListInfinite initialIds={initialIds} /> */}
      <Nav />
      <div className=" container p-5 mx-auto mt-4  rounded-lg ">
        {!refresh ? (
          <LOADING />
        ) : (
          <IdListInfinite
            initialIds={initialIds}
            // bookmarksId={JSON.parse(JSON.stringify(bookmarksId))}
          />
        )}
      </div>
    </div>
  );
}
