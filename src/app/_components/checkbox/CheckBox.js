import { Checkbox, cn } from "@nextui-org/react";
import React from "react";

function CheckBox({ label, state, set }) {
  return (
    <div className="w-full flex">
      <Checkbox
        size="sm"
        classNames={{
          base: cn(
            "flex-1  ",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg gap-2  border-2 border-transparent"
            // "data-[selected=true]:border-primary"
          ),
        }}
        isSelected={state}
        onValueChange={set}
      >
        {label}
      </Checkbox>
    </div>
  );
}

export default CheckBox;
