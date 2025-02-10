import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import IdCard from "../List/IdCard";
import { messengers } from "@/config/constants";
import { Button } from "@nextui-org/react";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { FaMoneyBillWave, FaUser } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import LOADINGMINI from "../pages/LAODINGMINI";

function SwiperCp({ ids, action, isLoaded, counter, location }) {
  const [swiperRef, setSwiperRef] = useState(null);
  return (
    <div className="w-full h-full flex items-center justify-center ">
      {!isLoaded ? (
        <LOADINGMINI />
      ) : ids?.length == 0 ? (
        <span className="font-iranyekanBold text-header py-4"> یافت نشد</span>
      ) : (
        <Swiper
          loop
          onSwiper={setSwiperRef}
          slidesPerView={location == 1 ? 6 : 3} //? location 1: main page ----- 2 : view page
          centeredSlides={false}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          freeMode={true}
          // centeredSlides={true}
          // spaceBetween={50}
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
              spaceBetween: 5,
            },
            540: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            960: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
          }}
          // navigation={true}
          modules={[Autoplay, Navigation]}
          className="overflow-auto w-full"
        >
          {ids?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="rounded-lg  bg-transparent">
                <IdCard
                  ads={item}
                  action={action}
                  isLoaded={isLoaded}
                  rate={index + 1}
                  counter={counter}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default SwiperCp;
