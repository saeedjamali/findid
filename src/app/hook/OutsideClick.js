import { useEffect, useState } from "react";

export default function OutsideClick(ref, setIsFilter, isFilter) {
  const [isClicked, setIsClicked] = useState();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isFilter) {
          setIsFilter(false);
        }
      } else {
        //?no thing
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClicked;
}
