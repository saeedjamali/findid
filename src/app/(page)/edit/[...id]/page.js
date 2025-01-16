"use client";
import Ads from "@/app/_components/ads/Ads";
import LOADING from "@/app/_components/pages/LOADING";
import { useAppProvider } from "@/app/context/AppProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

//?Action 1 : new -    2: new  with draft - 3: edit for user - 4: edit for admin

export default function Home() {
  const { isAuthUser } = useAppProvider();
  const { _id } = isAuthUser;
  const searchParam = useSearchParams();
  const [ads, setAds] = useState();
  const [refresh, setRefresh] = useState(false);
  const route = useRouter();

  // console.log("isAuthenticateUser--->", searchParam.get("id"));

  useEffect(() => {
    const getAd = async () => {
      try {
        const response = await fetch(
          `/api/ads/edit/get/${_id}/${searchParam.get("id")}`
        );
        const data = await response.json();
        if (data.status == 200) {
          setAds(data.idsCard);
          setRefresh(true);
        } else {
          route.push("/");
        }
        //  console.log("Data----->", data);
      } catch (error) {
        console.log("Error from catch edit----->", error);
      }
    };
    getAd();
  }, []);

  return <div>{refresh ? <Ads action={3} ad={ads} /> : <LOADING />}</div>;
}
