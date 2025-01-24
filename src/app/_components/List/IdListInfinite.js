// components/PostListInfinite.tsx

"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Id_PER_PAGE, sorts } from "@/config/constants";
import { getIds } from "@/actions/getIds";
import IdCard from "./IdCard";
import IdCard2 from "./IdCard2";
import { messengers } from "@/config/constants";
import { off } from "process";
import LOADING from "../pages/LOADING";
import { useAppProvider } from "@/app/context/AppProvider";
import { getApiUrl } from "@/utils/getApiUrl";
import { Switch } from "@heroui/switch";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { CiImageOff, CiImageOn } from "react-icons/ci";
import { Select, SelectSection, SelectItem } from "@heroui/select";

export default function IdListInfinite({
  // initialIds,
  // bookmarksId,
  setSort,
  sort,
  setRefresh,
}) {
  const [offset, setOffset] = useState(Id_PER_PAGE);
  const [bookmarks, setIsBookmarks] = useState([]);
  const [ids, setIds] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const scrollTrigger = useRef(null);
  const { filterList, isAuthUser } = useAppProvider();
  const [showImage, setShowImage] = useState(true);
  // useEffect(() => {
  //   let value = localStorage.getItem("showImage") || true;
  //   console.log("showImage first-->", showImage);
  //   setShowImage(value);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("showImage", showImage);
  //   console.log("showImage sec-->", showImage);
  // }, [showImage]);

  useEffect(() => {
    const getAds = async () => {
      const url = getApiUrl(0, Id_PER_PAGE);
      // /api/ads/get/all/${offset}/${limit}

      try {
        const response = await fetch(`${url}/${isAuthUser?._id}/${sort}`);
        const data = await response.json();
        console.log("Running Page 1 data--->", data);
        if (data.status == 201) {
          setIds(data.idsCard);
          setIsBookmarks(data.bookmarksId);
          setHasMoreData(true);
          setOffset(Id_PER_PAGE);
        } else {
          toast("داده ای یافت نشد");
        }
      } catch (error) {
        console.log("error from main--->", error);
      }
    };
    getAds();
  }, [sort]);

  const loadMoreIds = async () => {
    const url = getApiUrl(offset, Id_PER_PAGE);
    if (hasMoreData) {
      // console.log("offset-->data", data);
      let apiIds = [];
      try {
        const response = await fetch(`${url}/${isAuthUser?._id}/${sort}`);
        const data = await response.json();
        if (data.status == 201) {
          apiIds = data.idsCard;
        } else {
          toast("داده ای یافت نشد");
        }
      } catch (error) {
        console.log("error from main--->", error);
      }
      // const apiIds = await getIds(offset, Id_PER_PAGE);

      if (!apiIds.length) {
        setHasMoreData(false);
      }

      setIds((prevIds) => [...prevIds, ...apiIds]);
      setOffset((prevOffset) => prevOffset + Id_PER_PAGE);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreIds();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  }, [hasMoreData, offset]);

  return (
    <div>
      <div className="flex justify-end items-center w-full my-4">
        <Switch
          isSelected={showImage}
          onValueChange={setShowImage}
          defaultSelected={false}
          className="text-[12px] p-4"
          color="success"
          endContent={<CiImageOff />}
          size="sm"
          startContent={<CiImageOn />}
        ></Switch>
        <Select
          className={"w-40"}
          defaultSelectedKeys={0}
          // label="مرتب سازی"
          placeholder="مرتب سازی"
          labelPlacement="outside-left"
          selectedKeys={sort}
          variant="bordered"
          onChange={(e) => {
            setSort(e.target.value);
            setRefresh((prev) => !prev);
          }}
        >
          {sorts.map((st) => (
            <SelectItem key={st.id}>{st.title}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-2  w-full gap-2 xl:gap-4 container mx-auto ">
        {ids?.map((item) => (
          <Suspense
            key={item._id}
            fallback={
              <p className="w-full flex items-center justify-center">
                در انتظار دریافت
              </p>
            }
          >
            <IdCard2
              key={item._id}
              item={item}
              bookmarks={bookmarks}
              showImage={showImage}
            />
          </Suspense>
        ))}
      </div>

      <div className="text-center text-slate-600 mt-5">
        {hasMoreData ? (
          <div ref={scrollTrigger}>
            <LOADING />
          </div>
        ) : (
          <p className="text-slate-600">کل آیدی ها دریافت شد</p>
        )}
      </div>
    </div>
  );
}
