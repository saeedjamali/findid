import { Button } from "@nextui-org/react";
import React from "react";
import { ImCancelCircle } from "react-icons/im";

function ServiceCard({ services, server, setService, current }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-grow justify-start ">
      {services?.map((item) => (
        <div
          key={item?.id}
          className={`${
            item?.id == current ? "bg-cyan-700" : "bg-cyan-900"
          } text-white flex items-center justify-center flex-col gap-2 p-2 rounded-lg w-full cursor-pointer relative`}
          onClick={() => {
            item?.id == current ? setService(0) : setService(item?.id);
          }}
        >
          <span className="text-2xl">{item?.icon}</span>
          <h3 className="text-center text-[10px]">
            {server ? item?.title1 : item?.title2}
          </h3>
          {item?.id == current && (
            <ImCancelCircle className="absolute top-1 left-1 text-rose-900 " />
          )}
        </div>
      ))}
    </div>
  );
}

export default ServiceCard;
