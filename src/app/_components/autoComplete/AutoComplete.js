import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Image,
} from "@nextui-org/react";
import React from "react";

function AutoComplete({
  label,
  placeholder,
  arr,
  selectedKey,
  setSelectedKey,
  isDisabled,
  isInvalid,
  errorMessage,
}) {
  return (
    <div className="w-full">
      <Autocomplete
        errorMessage={errorMessage}
        color={isInvalid ? "danger" : "success"}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        className="text-sm"
        label={label}
        labelPlacement={"inside"}
        placeholder={placeholder}
        selectedKey={selectedKey}
        onSelectionChange={(key) => {
          setSelectedKey(key);
        }}
        isClearable={false}
      >
        {arr.map((item) => (
          <AutocompleteItem
            key={item.id}
            startContent={
              item?.icon ? (
                <Avatar alt="Argentina" className="w-6 h-6" src={item?.icon} />
              ) : (
                ""
              )
            }
          >
            {item.title}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}

export default AutoComplete;
