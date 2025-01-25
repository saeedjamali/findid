"use client";
import React, { useState } from "react";
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

function Nav() {
  const [isFilter, setIsFilter] = useState(false);
  const [isChecked, setIsCheked] = useState(false);
  const { filterList, setFilterList, setRefresh, search, setSearch } =
    useAppProvider();

  return (
    <div className=" w-full   ">
      <div className=" w-full flex flex-col items-center  p-4">
        <h1 className="text-header md:hidden my-8 font-bold text-2xl">
          مرجع تبادل شناسه های اینترنتی{" "}
        </h1>
        <div className="w-full md:w-1/2 md:mt-28 mt-8">
          <Search
            placeholder={"جستجو بر حسب آیدی یا عنوان"}
            setIsFilter={setIsFilter}
          />
        </div>

        <div
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

            {/* <div className="mt-4 flex items-end justify-end">
                <Button
                  onClick={() => {
                    setRefresh((prev) => !prev);
                  }}
                  className={
                    "bg-white  text-header  px-8 py-2 rounded-md hover:opacity-80 text-[12px] "
                  }
                >
                  اعمال فیلتر{" "}
                  {`${
                    filterList.length != 0 ? "(" + filterList.length + ")" : ""
                  }`}
                </Button>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
