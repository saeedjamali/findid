import Link from "next/link";
import React from "react";

function NOTFOUND() {
  return (
    <div class="min-h-[90vh] flex flex-grow items-center justify-center ">
      <div class="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 class="mb-4 text-4xl font-bold">404</h1>
        <p class="text-gray-600">آگهی مورد نظر یافت نشد</p>
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

export default NOTFOUND;
