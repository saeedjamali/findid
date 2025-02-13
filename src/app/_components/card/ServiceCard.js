"use client";
import { useAppProvider } from "@/app/context/AppProvider";
import { memberToK } from "@/utils/helper";
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow justify-start ">
      {services?.map((item) => (
        <div
          key={item?.id}
          className={`${
            item?.id == current ? "bg-blue-900" : "bg-header"
          } text-white flex flex-col md:flex-row items-center justify-center gap-4 p-2 rounded-lg w-full cursor-pointer relative `}
          onClick={() => {
            item?.id == current ? setService(0) : setService(item?.id);
          }}
        >
          {isCounter && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-white  border-1 border-header border-dashed rounded-full min-w-8 h-8 flex items-center justify-center text-header">
              <CountUp
                start={0}
                delay={2}
                end={counter.find((cn) => cn._id == item?.id)?.count}
              />

              {/* <span className="text-[10px] mr-2"> آگهی</span> */}
            </span>
          )}
          <span className="text-2xl">{item?.icon}</span>
          <h2 className="text-center text-[10px] ">
            {server ? item?.title1 : item?.title2}
          </h2>

          {item?.id == current && (
            <ImCancelCircle className="absolute top-1 left-1 text-rose-600 " />
          )}
        </div>
      ))}
    </div>
  );
}

export default ServiceCard;
