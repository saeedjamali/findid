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

export default function SwiperTop10() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="bg-header p-4 rounded-lg">
      <div className="flex flex-grow gap-2 ">
        <Button className="bg-header text-white hover:text-btn-orange cursor-pointer">بیشترین اعضا</Button>
        <Button className="bg-header text-white hover:text-btn-orange cursor-pointer">بیشترین مشاهده</Button>
        <Button className="bg-header text-white hover:text-btn-orange cursor-pointer">بیشترین قیمت</Button>
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
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {messengers.map((item) => {
          return (
            <SwiperSlide className="rounded-lg ">
              <IdCard id={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
