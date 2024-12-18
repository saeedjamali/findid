// components/PostCard.tsx

import Image from "next/image";
import { types } from "@/config/constants";
import { FaEye } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDiscountPercentFill, RiDiscountPercentLine } from "react-icons/ri";
export default function IdCard({ id }) {
  console.log(id.color);
  return (
    // <div className="p-8 mb-1 relative border-l-8 transition-all bg-white border-slate-400 hover:border-cyan-400 [counter-increment:post-index] before:content-[counter(post-index)] before:p-2 before:leading-none before:absolute before:top-0 before:right-0 before:transition-all before:bg-slate-100 hover:before:bg-cyan-100 ">

    // </div>
    <div
      className={` w-full col-span-1 h-[490px]   shadow-2xl relative bg-glass`}
      style={{ boxShadow: `2px 2px  5px ${id.color}` }}
    >
      <div className="h-1/2  w-full relative flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-purple-500 flex items-center justify-center">
          <Image alt={""} width={100} height={100} src={id.icon}></Image>
        </div>
        <span className="absolute top-4 right-3  w-6 h-6 rounded-full ">
          <FaEye className="w-6 h-6"/>
        </span>
        <span className="absolute top-4 left-3  w-6 h-6 rounded-full ">
          <FaRegHeart className="w-6 h-6"/>
        </span>
        <span className="absolute bottom-4 left-3  w-6 h-6 rounded-full ">
          <RiDiscountPercentFill className="w-6 h-6"/>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold">{id.name}</h1>
        <h2 className="font-semibold text-header flex mt-2">
          {id.latin}
          <Image alt="1" width={20} height={20} src={id.icon}></Image>
        </h2>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 border-blue-100 ">
        {types.map((item) => {
          return (
            <div key={item.id} className="border-1 px-4 rounded-xl">
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 border-blue-100 ">
        <p>125 هزار تومان</p>
      </div>
      <div className="mt-8 flex items-center justify-center px-8">
        <p>این کانال با هدف خرید و فروش کتاب ایجاد شده است</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-12 hover:bg-blue-500">
        ارتباط با دارنده
      </div>
    </div>
  );
}
