// components/PostCard.tsx

"use client";
import Image from "next/image";
import { messengers, types } from "@/config/constants";
import { FaEye, FaUser } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDiscountPercentFill, RiDiscountPercentLine } from "react-icons/ri";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { MdOutlineRemoveRedEye, MdUpdate } from "react-icons/md";
import { memberToK } from "@/utils/helper";
import { useEffect, useState } from "react";
import ImageLoader from "../imageUploader/imageLoader";
import { GrView } from "react-icons/gr";
import { Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function IdCard({ ads, action, isLoaded, rate, counter }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [isShow, setIsShow] = useState(action || 1); //? 1 : member  -  2: views  -  3: price

  useEffect(() => {
    setIsShow(action);
  }, [action]);

  console.log("ads---------->", ads?._id);
  return (
    <article className="p-2 relative">
      {counter && (
        <span
          className="absolute top-1 right-1 w-5 h-5 z-40 rounded-full bg-white flex items-center justify-center ring-1 text-center font-bold text-header text-[10px]"
          style={{
            boxShadow: `2px 2px  5px ${messengers[ads?.messenger - 1]?.color}`,
          }}
        >
          {rate}
        </span>
      )}
      <div
        className={` w-full col-span-1 h-[180px]   shadow-2xl relative bg-glass bg-white cursor-pointer`}
        style={{
          boxShadow: `2px 2px  5px ${messengers[ads?.messenger - 1]?.color}`,
        }}
        onClick={() => router.push(`/view/${ads?.title}?id=${ads?._id}`)}
      >
        <div className=" w-full relative flex items-center justify-center ">
          <Skeleton className="rounded-full h-12" isLoaded={isLoaded}>
            <span className="rounded-full w-12 h-12 flex items-center justify-center  cursor-pointer overflow-hidden object-fill relative">
              {ads?.thumbnail?.length != 0 ? (
                <ImageLoader
                  imageUrl={ads?.thumbnail[0]}
                  code={"thumbnail"}
                  size={"64px"}
                />
              ) : (
                <>
                  <Image
                    src={"/images/logo.webp"}
                    className=" h-8 w-8 rounded-full object-fill p-1 opacity-25"
                    width={100}
                    height={100}
                    alt="profile"
                    // effect="blur"
                    // wrapperProps={{
                    //   // If you need to, you can tweak the effect transition using the wrapper style.
                    //   style: {
                    //     transitionDelay: "1s",
                    //   },
                    // }}
                  />
                  {/* <p className="absolute font-shabnam text-3xl text-gray-700 opacity-40">
                  تصویر یافت نشد
                </p> */}
                </>
              )}
            </span>
          </Skeleton>
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
        <Skeleton className="rounded-md mt-1 h-5" isLoaded={isLoaded}>
          <div
            className="w-full flex items-center justify-center px-2 gap-1 mt-2 "
            dir="ltr"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <Image
                alt="1"
                width={20}
                height={20}
                src={messengers[ads?.messenger - 1]?.icon}
              ></Image>
            </span>
            <h2 className="font-semibold text-header flex items-center justify-center text-[12px] h-4 text-left">
              {(ads?.id).length < 11 ? ads?.id : (ads?.id).slice(0, 10) + "..."}
            </h2>
          </div>
        </Skeleton>
        <Skeleton className="rounded-md mt-1 h-6" isLoaded={isLoaded}>
          <div className="flex items-center justify-center mt-2 font-iranyekanBold text-[10px] ">
            {ads?.title}
          </div>
        </Skeleton>

        <Skeleton className="rounded-md mt-1 h-16" isLoaded={isLoaded}>
          <div className="flex items-center justify-between text-header flex-grow">
            <span
              className={`flex items-center justify-center gap-1  text-[10px] bg-blue-100 rounded-lg p-2 min-w-0 md:min-w-16 w-auto ${
                isShow == 1 && "font-extrabold "
              }`}
            >
              <p className="my-auto h-3"> {memberToK(ads?.members)}</p>
              <FaUser className="font-bold h-3" />
            </span>

            <div
              className={`flex items-center justify-center gap-1 mt-1 text-[10px] bg-blue-100 rounded-lg p-2 min-w-0 md:min-w-16 w-auto ${
                isShow == 3 && "font-extrabold "
              }`}
            >
              <p className="my-auto h-3"> {memberToK(ads?.counter.views)}</p>
              <GrView />
            </div>
          </div>
          <div
            className={`flex items-center justify-center gap-1  text-[10px] bg-blue-100 rounded-lg p-1  w-auto mt-1 ${
              isShow == 2 && "font-extrabold "
            }`}
          >
            <p className="my-auto h-3">
              {" "}
              {ads?.agreedPrice
                ? "قیمت توافقی"
                : Number(ads?.price)?.toLocaleString() + " تومان"}{" "}
            </p>
            {/* <CiMoneyBill className="font-bold" /> */}
          </div>
        </Skeleton>
        {/* <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-12 hover:bg-blue-500">
        ارتباط با دارنده
      </div> */}
      </div>
      {/* <div className="w-full flex items-center justify-between gap-1  text-[12px] p-2">
        <p> {(150000).toLocaleString() + " تومان"} </p>
        <p> {(150000).toLocaleString() + " تومان"} </p>
      </div> */}
    </article>
  );
}
