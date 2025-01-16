import Image from "next/image";
import Link from "next/link";
import React from "react";

function DELETED() {
  return (
    <div class="min-h-[90vh] flex flex-grow items-center justify-center ">
      <div class="rounded-lg bg-white p-8 text-center shadow-xl">
        <Image
          src={"/images/removed.jpg"}
          width={100}
          height={100}
          alt="trash"
          className="w-64 h-64 bg-cover "
        />
        <p class="text-gray-600 mt-4 font-shabnamBold my-4">
          آگهی مورد نظر حذف شده است
        </p>
        <Link
          href="/"
          class="mt-4 inline-block rounded bg-btn-orange px-4 py-2 font-semibold text-white hover:bg-header"
        >
          {" "}
          بازگشت به صفحه اصلی{" "}
        </Link>
      </div>
    </div>
  );
}

export default DELETED;
