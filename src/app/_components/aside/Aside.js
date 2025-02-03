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
      <aside
        className={`w-[90%] md:w-1/2 lg:w-1/3 fixed top-0 right-0 min-h-screen  z-50  rounded-r-none  transition-all delay-150000 duration-300 ease-in-out  overflow-y-auto   `}
      >
        {/* <span className="absolute -left-16 top-4 w-8 h-8 bg-purple-600 rounded-full z-50"></span> */}
        <div
          className={`absolute max-w-[10%] flex top-20 left-0 cursor-pointer   bg-glass-dark rounded-r-none  p-1   ${
            !show && "fixed top-30 right-0"
          }`}
          onClick={() => setIsFilter((prev) => !prev)}
        >
          <TbFilterSearch className="text-btn-orange text-3xl" />
        </div>
        <div
          className={`w-[90%] min-h-screen gap-4 bg-glass-dark overflow-y-auto  ${
            !show && "hidden "
          }`}
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
