import { useAppProvider } from "@/app/context/AppProvider";
import React, { useRef } from "react";
import Messengers from "../nav/Messengers";
import Types from "../nav/Types";
import Subjects from "../nav/Subjects";
import Search from "../search/Search";
import { ImCancelCircle } from "react-icons/im";
import OutsideClick from "@/app/hook/OutsideClick";
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
    <div className={!show && "hidden"} >
      <aside className=" max-w-96 w-[90%] md:w-1/2 lg:w-1/3 fixed top-0 right-0 h-screen z-50 bg-glass rounded-r-none  transition-all delay-150000 duration-300 ease-in-out  overflow-y-auto ">
        <div className="w-full my-8">
          <Search
            placeholder={"جستجو بر حسب آیدی یا عنوان"}
            setIsFilter={setIsFilter}
          />
        </div>{" "}
        <Messengers />
        <div className="grid grid-cols-1 gap-2 w-full  mt-2">
          <Types />
          <Subjects />
        </div>
        <span
          className="absolute bottom-7 right-[45%] cursor-pointer"
          onClick={() => setIsFilter((prev) => !prev)}
        >
          <ImCancelCircle className="text-btn-orange text-3xl" />
        </span>
      </aside>
    </div>
  );
}

export default Aside;
