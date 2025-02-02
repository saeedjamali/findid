"use client";
import React, { useCallback, useEffect, useState } from "react";
import "@/lib/directus";
import Search from "../search/Search";
import Image from "next/image";
import { messengers, types, subjects } from "@/data/constant";
import { Checkbox, Tooltip } from "@nextui-org/react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@headlessui/react";
import Messengers from "./Messengers";
import Types from "./Types";
import Subjects from "./Subjects";
import { useAppProvider } from "@/app/context/AppProvider";
import { TbFilterSearch } from "react-icons/tb";

function Nav() {
  const [outScrool, setOutScrool] = useState(false);
  const {
    isFilter,
    setIsFilter,
    filterList,
    setFilterList,
    setRefresh,
    search,
    setSearch,
  } = useAppProvider();

  const onScroll = useCallback((event) => {
    const { scrollY, screen, outerHeight, pageYOffset } = window;

    if (screen.height < pageYOffset) {
      setOutScrool(true);
    } else {
      setOutScrool(false);
    }

    console.log(scrollY, screen, outerHeight, pageYOffset);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);
  return (
    <section className=" w-full   ">
      <div className=" w-full flex flex-col items-center  p-4">
        <h1 className="text-header md:hidden my-8 font-bold text-2xl ">
          <strong> مرجع تبادل شناسه های اینترنتی </strong>
        </h1>
        <div className="w-full  md:flex md:w-1/2 md:mt-12 mt-8">
          <Search
            placeholder={"جستجو بر حسب آیدی یا عنوان"}
            setIsFilter={setIsFilter}
          />
        </div>
        {outScrool && (
          <span
            className="bg-header rounded-full  fixed p-2 text-btn-orange text-3xl left-12 bottom-8 cursor-pointer hover:opacity-80 z-50"
            onClick={() => setIsFilter((prev) => !prev)}
          >
            <TbFilterSearch />
          </span>
        )}
        {/* <div
          className={`mt-8 bg-gradient-to-r from-header to-pink-700 rounded-xl p-2 ${
            !isFilter && "hidden"
          } `}
        >
          <div>
            <Messengers />
            <div className="grid grid-cols-1 gap-2 w-full  mt-2">
              <Types />
              <Subjects />
            </div>

            
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Nav;
