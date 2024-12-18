import Image from "next/image";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { CiUser } from "react-icons/ci";

function Header() {
  return (
    <div className=" w-full h-20  bg-header ">
      <div className="container flex justify-between items-center h-full mx-auto">
        <Image
          src={"/images/logo-text-right.png"}
          width={220}
          height={100}
          alt="logo-findid"
        />

        <h1 className=" text-white font-shabnam text-[16px] mr-8 hidden md:flex">
          مرجع تبادل شناسه های اینترنتی
        </h1>
        <div className="mr-auto flex items-center gap-2 text-xl text-font-light-color font-shabnamBold">
          <span className="  cursor-pointer ">
            {" "}
            <CiUser className="font-bold text-btn-orange text-2xl hover:text-white" />
          </span>
          {/* یا
          <span className=" hover:text-btn-orange cursor-pointer">
            {" "}
            ثبت نام
          </span> */}
          <button className="text-white  text-[14px] mx-4 md:ml-8 bg-btn-orange px-4 py-1 rounded-md flex items-center justify-between hover:text-header">
            <IoMdAdd className="font-iranSans md:ml-2 text-2xl" />
            <span className="hidden md:flex">درج آیدی</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
