import React from "react";

import { Checkbox } from "@nextui-org/react";
import { subjects } from "@/config/constants";
function Subjects({ setFilterList }) {
  return (
    <div className="bg-glass">
      <h2 className=" font-shabnam text-sm">فیلتر براساس موضوع</h2>
      <div className="flex flex-wrap items-center justify-start p-2  mt-4 gap-4 w-full">
        {subjects.map((item) => {
          return (
            <div key={item.id} className="bg-cover flex flex-wrap ">
              <Checkbox
                color="secondary"
                size="sm"
                onValueChange={(key) => {
                  const id = Number(item.id + "" + item.category);
                  if (key) {
                    setFilterList((prev) => [...prev, {category:item?.category,id:item?.id}]);
                  } else {
                    // console.log("Category--->", item.category);
                    setFilterList((prev) =>
                      prev.filter((p) => Number(p.id + "" + p.category) != id)
                    );
                  }
                }}
              >
                {item.title}
              </Checkbox>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Subjects;
