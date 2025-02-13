"use client";
import ViewAds from "@/app/_components/ads/ViewAds";
import DELETED from "@/app/_components/pages/DELETED";
import LOADING from "@/app/_components/pages/LOADING";
import NOTACTIVE from "@/app/_components/pages/NOTACTIVE";
import NOTFOUND from "@/app/_components/pages/NOTFOUND";
import { useAppProvider } from "@/app/context/AppProvider";
import { addss } from "@/config/constants";
import { addBreadCrumbsJsonLd, addProductJsonLd } from "@/utils/schemasSeo";
import Head from "next/head";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function View() {
  const [ads, setAds] = useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  // const pathname = usePathname();
  // const params = useParams();

  // console.log("searchParams--->", searchParams.get("id"));
  // console.log("pathname--->", pathname);
  // console.log("params--->", params.id);

  useEffect(() => {
    const getAds = async (id) => {
      try {
        const response = await fetch(`/api/ads/get/adsid/${id}`);
        const data = await response.json();
        if (data.status == 201) {
          setAds(data?.idsCard);
        } else {
          setAds(null);
        }

        setIsLoading(true);
        // console.log("data--->", data);
      } catch (error) {
        console.log("error from getAds by id--->", error);
        setIsLoading(true);
      }
    };

    getAds(searchParams.get("id"));
  }, [searchParams]);
  return (
    <div className="min-h-screen w-full ">
      <></>
      {isLoading ? (
        !ads || ads == null ? (
          <NOTFOUND />
        ) : ads?.isRemoved ? (
          <DELETED />
        ) : !ads?.isShow ? (
          <NOTACTIVE />
        ) : (
          // : "zfsdfsd"

          <ViewAds ads={ads} />
        )
      ) : (
        <LOADING />
      )}
    </div>
  );
}

export default View;
