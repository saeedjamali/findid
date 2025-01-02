"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./_components/nav/Nav";
import { Toaster } from "react-hot-toast";

export default function Home() {
  // const initialIds = await getIds(0, Id_PER_PAGE);

  return (
    <div>
      <Toaster />
      {/* <IdListInfinite initialIds={initialIds} /> */}
      <Nav />
      <div className=" container p-5 mx-auto mt-4  rounded-lg ">
        <IdListInfinite />
      </div>
    </div>
  );
}
