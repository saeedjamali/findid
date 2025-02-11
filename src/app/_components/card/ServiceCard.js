"use client";
import { useAppProvider } from "@/app/context/AppProvider";
import { Button, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { CiCircleInfo } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";

function ServiceCard({ services, server, setService, current, isCounter }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { counter, setCounter } = useAppProvider();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchserviceCounter = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch(`/api/ads/get/servicecounter`);
        const data = await response.json();
        if (data?.status == 201) {
          setCounter(data?.counter);
        }
      } catch (error) {
        console.log("error from get service counter");
      }
      // setIsLoading(false);
    };
    fetchserviceCounter();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-grow justify-start ">
      {services?.map((item) => (
        <div
          key={item?.id}
          className={`${
            item?.id == current ? "bg-blue-800" : "bg-header"
          } text-white flex items-center justify-center flex-col gap-4 p-2 rounded-lg w-full cursor-pointer relative `}
          onClick={() => {
            item?.id == current ? setService(0) : setService(item?.id);
          }}
        >
          <span className="text-2xl">{item?.icon}</span>
          <h3 className="text-center text-[10px]">
            {server ? item?.title1 : item?.title2}
          </h3>
          {isCounter && (
            <span className="absolute top-2 right-4 text-[10px] ">
              <CountUp
                start={0}
                delay={2}
                end={counter.find((cn) => cn._id == item?.id)?.count}
              />
              {/* <span className="text-[10px] mr-2"> آگهی</span> */}
            </span>
          )}
          {item?.id == current && (
            <ImCancelCircle className="absolute top-1 left-1 text-rose-600 " />
          )}
        </div>
      ))}
    </div>
  );
}

export default ServiceCard;
