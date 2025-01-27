// components/PostCard.tsx

"use client";
import Image from "next/image";
import { types } from "@/config/constants";
import { FaEye } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDiscountPercentFill, RiDiscountPercentLine } from "react-icons/ri";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { MdOutlineRemoveRedEye, MdUpdate } from "react-icons/md";
import { memberToK } from "@/utils/helper";
import { useState } from "react";
export default function IdCard({ id }) {
  const [isMember, setIsMember] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isPrice, setIsPrice] = useState(true);
  return (
    // <div className="p-8 mb-1 relative border-l-8 transition-all bg-white border-slate-400 hover:border-cyan-400 [counter-increment:post-index] before:content-[counter(post-index)] before:p-2 before:leading-none before:absolute before:top-0 before:right-0 before:transition-all before:bg-slate-100 hover:before:bg-cyan-100 ">

    // </div>
    <div
      className={` w-full col-span-1 h-[218px]   shadow-2xl relative bg-glass`}
      style={{ boxShadow: `2px 2px  5px ${id?.color}` }}
    >
      <div className=" w-full relative flex items-center justify-center text-[12px]">
        <div className="w-20 h-20   flex items-center justify-center p-2">
          <Image alt={""} width={100} height={100} src={id?.icon}></Image>
        </div>
        {/* <span className="absolute top-4 right-3  w-6 h-6 rounded-full ">
          <FaEye className="w-6 h-6"/>
        </span>
        <span className="absolute top-4 left-3  w-6 h-6 rounded-full ">
          <FaRegHeart className="w-6 h-6"/>
        </span> */}
        {/* <span className="absolute bottom-4 left-3  w-6 h-6 rounded-full ">
          <RiDiscountPercentFill className="w-6 h-6"/>
        </span> */}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="font-semibold text-header flex items-center justify-center mt-2 text-[12px] h-4 w-4">
          {id?.latin}
          <Image alt="1" width={20} height={20} src={id?.icon}></Image>
        </h2>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 border-blue-100 font-iranyekanBold ">
        سرگرمی
      </div>
      {isView && (
        <div className="flex items-center justify-center gap-1 mt-4 text-[12px] ">
          <p> {memberToK(150000)}</p>
          <MdOutlineRemoveRedEye />
        </div>
      )}
      {isMember && (
        <div className="flex items-center justify-center gap-1 mt-4 text-[12px] font-bold">
          <p> {memberToK(150000)}</p>
          <CiUser className="font-bold" />
        </div>
      )}
      {isPrice && 
        <div className="flex items-center justify-center gap-1 mt-4 text-[12px] font-bold">
        <p> {(150000).toLocaleString()+ " تومان"} </p>
        {/* <CiMoneyBill className="font-bold" /> */}
      </div>}
      {/* <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-12 hover:bg-blue-500">
        ارتباط با دارنده
      </div> */}
    </div>
  );
}
