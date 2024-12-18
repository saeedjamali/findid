"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  // const initialIds = await getIds(0, Id_PER_PAGE);

  return (
    <div>
      <ToastContainer
        bodyClassName={() => " flex-center text-sm font-white p-3"}
        position="top-left"
        rtl={true}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className=" container p-5 mx-auto mt-4  rounded-lg ">
        {/* <IdListInfinite initialIds={initialIds} /> */}
        <IdListInfinite />
      </div>
    </div>
  );
}
