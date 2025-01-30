import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import IdCard from "../List/IdCard";
import { messengers } from "@/config/constants";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { FaMoneyBillWave, FaUser } from "react-icons/fa";
import { GrView } from "react-icons/gr";

export default function SwiperTop10() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [action, setAction] = useState(1); //? 1 : member  -  2: price  -  3: views
  const [topTen, setTopTen] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getTop10 = async () => {
      const response = await fetch(`/api/ads/top10/${action}/0/10`);
      const data = await response.json();
      //  console.log("Datazzz--->",data);
      if (data.status == 201) {
        setTopTen(data?.idsCard);
        setIsLoaded(true);
      } else {
        toast.error("خطای دریافت  Top10");
        setIsLoaded(false);
      }
    };

    getTop10();
  }, [action]);
  return (
    <div className="bg-header/10 rounded-lg pb-4 px-4">
      <div className="flex justify-between items-center ">
        <div className="flex flex-grow gap-1  mr-4 md:mr-8 ">
          <span
            className={` text-white bg-btn-orange cursor-pointer p-2 md:px-4 text-[12px] rounded-b-lg ${
              action != 1 && "bg-btn-orange/60"
            }`}
            onClick={() => setAction(1)}
          >
            <span className="hidden md:flex">کاربران</span>
            <span className="flex md:hidden text-white text-[14px] font-bold text-3xl">
              <FaUser className=" text-white font-bold" />
            </span>
          </span>
          <span
            className={` text-white bg-btn-orange cursor-pointer p-2 md:px-4 text-[12px] rounded-b-lg ${
              action != 2 && "bg-btn-orange/60"
            }`}
            onClick={() => setAction(2)}
          >
            <span className="hidden md:flex">قیمت</span>
            <span className="flex md:hidden text-white text-[14px] font-bold text-3xl">
              <FaMoneyBillWave className=" text-white font-bold" />
            </span>
          </span>
          <span
            className={`  text-white bg-btn-orange cursor-pointer p-2 md:px-4 text-[12px] rounded-b-lg ${
              action != 3 && "bg-btn-orange/60 "
            }`}
            onClick={() => setAction(3)}
          >
            <span className="hidden md:flex">مشاهده</span>
            <span className="flex md:hidden text-white text-[14px] font-bold text-3xl">
              <GrView className=" text-white font-bold" />
            </span>
          </span>
        </div>
        <Image
          src={"/images/top10.png"}
          width={100}
          height={100}
          alt="Top10"
          className="w-8 h-8 mt-4"
        />
      </div>
      <Swiper
        loop
        onSwiper={setSwiperRef}
        slidesPerView={5}
        centeredSlides={false}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        freeMode={true}
        // centeredSlides={true}
        spaceBetween={50}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          540: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          960: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1480: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        // navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {topTen?.map((item) => {
          return (
            <SwiperSlide className="rounded-lg  bg-transparent">
              <IdCard ads={item} action={action} isLoaded={isLoaded} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
