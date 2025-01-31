"use client";
import ViewAds from "@/app/_components/ads/ViewAds";
import DELETED from "@/app/_components/pages/DELETED";
import LOADING from "@/app/_components/pages/LOADING";
import NOTACTIVE from "@/app/_components/pages/NOTACTIVE";
import NOTFOUND from "@/app/_components/pages/NOTFOUND";
import { useAppProvider } from "@/app/context/AppProvider";
import { addss } from "@/config/constants";
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
      <title>FindId : {ads?.title}</title>
      <meta
        name="description"
        content={`مرجع تبادل شناسه های  اینترنتی FindId ${ads?.description}`}
      />

      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://findid.ir/view" />

      <meta property="og:site_name" value="Findid" />
      <meta
        property="og:title"
        content={`مرجع تبادل شناسه های  اینترنتی FindId ${ads?.id}`}
      />
      <meta
        property="og:description"
        content={`بزرگترین بستر تبادل آیدی و صفحات اینترنتی ${ads?.description}`}
      />
      <meta property="og:url" content={`https://findid.ir/${ads?.title}?id=${ads._id}`} />

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
