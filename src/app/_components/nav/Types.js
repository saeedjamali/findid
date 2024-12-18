import React from "react";
import { types } from "@/data/constant";
// import { CheckboxIcon } from "@nextui-org/react";
import { Checkbox, Tooltip } from "@nextui-org/react";
// import { CheckboxIcon } from "@nextui-org/react/dist";
function Types({ setFilterList }) {
  return (
    <div className="bg-glass">
      <h2 className=" font-shabnam text-sm">فیلتر براساس نوع</h2>
      <div className="flex flex-wrap items-center  mt-4 p-2  w-full gap-4">
        {types.map((item) => {
          return (
            <div key={item.id} className="bg-cover flex ">
              <Checkbox
                color="secondary"
                onValueChange={(key) => {
                  const id = Number(item.id + "" + item.category);
                  if (key) {
                    setFilterList((prev) => [...prev, item]);
                  } else {
                    console.log("Id--->", id);
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

export default Types;
