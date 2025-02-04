import { useAppProvider } from "@/app/context/AppProvider";
import React, { useRef } from "react";
import Messengers from "../nav/Messengers";
import Types from "../nav/Types";
import Subjects from "../nav/Subjects";
import Search from "../search/Search";
import { ImCancelCircle } from "react-icons/im";
import OutsideClick from "@/app/hook/OutsideClick";
import { TbFilterSearch } from "react-icons/tb";
function Aside({ show }) {
  const {
    isFilter,
    setIsFilter,
    filterList,
    setFilterList,
    setRefresh,
    search,
    setSearch,
  } = useAppProvider();
  //   const boxRef = useRef(null);
  //   OutsideClick(boxRef, setIsFilter, isFilter);
  //   console.log("boxOutsideClick--->", boxOutsideClick);
  return (
    <>
      <div
        className={`fixed w-12 flex top-28 right-0 cursor-pointer  z-50   bg-glass-dark rounded-r-none  p-1  `}
        onClick={() => setIsFilter((prev) => !prev)}
      >
        <TbFilterSearch className="text-btn-orange text-3xl" />
      </div>

      <aside
        className={`w-[80%] md:w-1/2 lg:w-1/3 fixed top-0 left-0 min-h-screen  z-50    transition-all delay-150000 duration-300 ease-in-out  overflow-y-auto flex justify-end ${
          !show && "hidden"
        }`}
      >
        <div
          className={`w-full min-h-screen gap-4 bg-glass-dark overflow-y-auto rounded-l-none   `}
        >
          <Search
            placeholder={"جستجو بر حسب آیدی یا عنوان"}
            setIsFilter={setIsFilter}
          />
          <div className="grid grid-cols-1 gap-2 w-full  mt-2">
            <Messengers />
            <Types />
            <Subjects />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Aside;
