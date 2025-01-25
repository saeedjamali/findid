import React from "react";
// import { CheckboxIcon } from "@nextui-org/react";
import { Checkbox, Tooltip } from "@nextui-org/react";
import { types } from "@/config/constants";
import { useAppProvider } from "@/app/context/AppProvider";
// import { CheckboxIcon } from "@nextui-org/react/dist";
function Types() {
  const {  setFilterList } = useAppProvider();
  return (
    <div className="bg-glass">
      <h2 className=" font-shabnam text-sm">فیلتر براساس نوع</h2>
      <div className="flex flex-wrap items-center  mt-4 p-2  w-full gap-4">
        {types.map((item) => {
          return (
            <div key={item.id} className="bg-cover flex ">
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

export default Types;
