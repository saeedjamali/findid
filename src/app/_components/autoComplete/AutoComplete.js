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
  isRequired,
  defaultSelectedKeys,
}) {
  return (
    <div className="w-full">
      <Autocomplete
        emptyContent="نتیجه ای یافت نشد"
        isRequired={isRequired}
        errorMessage={errorMessage}
        color={isInvalid ? "danger" : "primary"}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        className="text-sm"
        label={label}
        labelPlacement={"inside"}
        placeholder={placeholder}
        selectedKey={selectedKey}
        onSelectionChange={(key) => {
          // validateValue(subject == 0, setIsInvalid, "subject", setIsError);
          setSelectedKey(key);
        }}
        defaultInputValue={
          selectedKey != 0 ? `${arr[selectedKey - 1]?.title}` : ""
        }
        isClearable={false}
      >
        {arr.map((item) => (
          <AutocompleteItem
            key={item.id}
            startContent={
              item?.icon ? (
                <Avatar alt="avatar" className="w-6 h-6" src={item?.icon} />
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
