import { messengers } from "@/config/constants";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

function Messengers({ setFilterList }) {
  const [messengerList, setMessengerList] = useState(messengers);

  const handleCheckedMessenger = (item) => {
    const id = Number(item.id + "" + item.category);
    const newMessageLeis = messengerList.map((m) => {
      if (m.id == item?.id) {
        if (!m.status) {
          setFilterList((prev) => [...prev, {category:item?.category,id:item?.id}]);
        } else {
          // console.log("Category--->", item.category);
          setFilterList((prev) =>
            prev.filter((p) => Number(p.id + "" + p.category) != id)
          );
        }
        return { ...m, status: !m.status };
      }
      return m;
    });

    setMessengerList(newMessageLeis);
  };
  return (
    <div className="bg-glass">
      <h2 className=" font-shabnam text-sm ">فیلتر براساس شبکه اجتماعی</h2>
      <div className="flex flex-wrap items-center justify-center mt-4 p-1 gap-2 w-full">
        {messengerList.map((item) => {
          return (
            <div
              key={item.id}
              className="w-8 h-8 md:w-10 md:h-10 bg-cover relative"
              onClick={() => handleCheckedMessenger(item)}
            >
              <Tooltip content={item.title}>
                <Image
                  src={item.icon}
                  width={100}
                  height={100}
                  alt={item.latin}
                  className={"col-span-1 cursor-pointer"}
                />
              </Tooltip>
              <div className="absolute top-0">
                {item.status && (
                  <FaCheckCircle className="text-secondary text-sm" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Messengers;
