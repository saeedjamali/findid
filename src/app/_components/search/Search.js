"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MdFilterListAlt } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useAppProvider } from "@/app/context/AppProvider";
import { content } from "../../../../tailwind.config";
export default function Search({ placeholder ,setIsFilter}) {
  const { search, setSearch,filterList } = useAppProvider();

  function handleSearch(term) {
    // console.log(term);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0 ">
      <input
        className="peer block w-full rounded-md border border-gray-200  pl-10 text-sm outline-2 placeholder:text-gray-500 p-3 text-[8px] md:text-[10px]"
        placeholder={placeholder}
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />
      <div className="absolute left-0 top-0 bottom-0 md:w-28 w-20   flex items-center justify-center rounded-l-md cursor-pointer">
        <span className="bg-btn-orange text-white peer-focus:text-gray-900 w-1/2 h-full flex items-center justify-center hover:bg-opacity-35">
          <FaSearch className="text-xl " />
        </span>
        <span
          className="relative bg-header rounded-l-md text-white peer-focus:text-gray-900  w-1/2 h-full flex items-center justify-center hover:bg-opacity-65"
          onClick={() => setIsFilter((prev) => !prev)}
        >
          <MdFilterListAlt className="text-xl " />
          {filterList?.length != 0 && (
            <span className="absolute -top-2 -left-2 bg-btn-orange text-white rounded-full w-5 h-5 text-[12px] flex items-center justify-center">
              {filterList?.length}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
