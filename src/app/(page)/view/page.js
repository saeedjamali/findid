"use client";
import ViewAds from "@/app/_components/ads/ViewAds";
import { useAppProvider } from "@/app/context/AppProvider";
import { addss } from "@/config/constants";
import React from "react";

function View() {
  const {isAuthUser} = useAppProvider();
  console.log("iss--->", isAuthUser);
  return (
    <div>
      <ViewAds ads={addss} />
    </div>
  );
}

export default View;
