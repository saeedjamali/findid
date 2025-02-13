import Image from "next/image";
import React from "react";

function LOADINGMINI() {
  return (
    <div className="w-full flex items-center justify-center flex-col py-4">
      <div class="relative flex justify-center items-center ">
        <div class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-orange-500 p-2"></div>
       
        <Image
          src="/images/logo.webp"
          class="rounded-full h-20 w-20 m-2"
          width={100}
          height={100}
          alt="logo"
        />
      </div>
    </div>
  );
}

export default LOADINGMINI;
