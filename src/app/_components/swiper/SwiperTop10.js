import React, { useRef, useState } from "react";
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

export default function SwiperTop10() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="bg-header p-4 rounded-lg">
      <div className="flex justify-between items-center ">
        <div className="flex flex-grow gap-1 md:gap-2 px-2 ">
          <span className="hover:bg-slate-100 hover:text-orange-700 text-white bg-btn-orange cursor-pointer p-2  text-[12px] rounded-lg">
            عضو
          </span>
          <span className="hover:bg-slate-100 hover:text-orange-700  text-white bg-btn-orange cursor-pointer p-2  text-[12px] rounded-lg">
            مشاهده
          </span>
          <span className="hover:bg-slate-100 hover:text-orange-700 text-white bg-btn-orange cursor-pointer p-2  text-[12px] rounded-lg">
            قیمت
          </span>
        </div>
        <Image
          src={"/images/top10.png"}
          width={100}
          height={100}
          alt="Top10"
          className="w-8 h-8"
        />
      </div>
      <Swiper
        loop
        onSwiper={setSwiperRef}
        slidesPerView={5}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
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
          1280: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1480: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        // navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {messengers.map((item) => {
          return (
            <SwiperSlide className="rounded-lg  bg-transparent">
              <IdCard id={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
