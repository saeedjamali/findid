import Image from "next/image";
import React from "react";

function LOADING() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center flex-col">
      <div class="relative flex justify-center items-center ">
        <div class="absolute animate-spin rounded-full h-36 w-36 border-t-4 border-b-4 border-orange-500 p-2"></div>
        {/* <Image
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          class="rounded-full h-28 w-28"
          width={100}
          height={100}
          alt="logo"
        /> */}
        <Image
          src="/images/logo.png"
          class="rounded-full h-28 w-28 m-2"
          width={100}
          height={100}
          alt="logo"
        />
      </div>
      <div className="text-header mt-8">
        <div className="w-full bg-transparent font-iranyekanBold">
          <div className="mb-8 text-xl w-full text-center">
            در حال دریافت اطلاعات
          </div>
          <div class=" w-full flex-center gap-2">
            <div class="w-4 h-4 rounded-full animate-pulse bg-header"></div>
            <div class="w-4 h-4 rounded-full animate-pulse bg-header"></div>
            <div class="w-4 h-4 rounded-full animate-pulse bg-header"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LOADING;
