// components/PostCard.tsx
"use client";
import Image from "next/image";
import { types, subjects } from "@/config/constants";
import { FaEye } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDiscountPercentFill, RiDiscountPercentLine } from "react-icons/ri";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { IoCallOutline } from "react-icons/io5";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
export default function IdCard2({ id }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const copyToClipboard = (text) => {
    onOpen();
    try {
      navigator.clipboard.writeText(text);

      toast("آیدی کپی شد");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    // <div className="p-8 mb-1 relative border-l-8 transition-all bg-white border-slate-400 hover:border-cyan-400 [counter-increment:post-index] before:content-[counter(post-index)] before:p-2 before:leading-none before:absolute before:top-0 before:right-0 before:transition-all before:bg-slate-100 hover:before:bg-cyan-100 ">

    // </div>
    <>
      <Toaster />
      <div
        className={` w-full col-span-1 md:h-60  relative bg-glass p-0 flex flex-col md:flex-row z-10 overflow-hidden `}
      >
        {/* //? Profile image */}
        <div className="w-full md:w-1/3 ">
          <div className=" w-full h-52 md:h-full  rounded-full flex items-center justify-center bg-cover bg-center bg-no-repeat">
            <Image
              alt={""}
              width={100}
              height={100}
              src={"/images/1.jpg"}
              className="g-cover bg-center bg-no-repeat w-full h-full"
            ></Image>
          </div>
        </div>
        {/* //? title - member - price - description and type */}
        <div className="w-full md:w-2/3 pr-8 p-4 box-border flex flex-col justify-between">
          <div>
            <h1 className="font-shabnamBold text-[16px] mt-4 text-h1-color">
              گیزمیز
            </h1>
            <h1 className="font-shabnam text-[8px] mt-2 text-h2-color">
              لحظاتی قبل
            </h1>
            <div className="flex items-center justify-start gap-1 mt-6 border-blue-100  ">
              {types.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`border-1 px-2 rounded-xl text-[10px] ${
                      item.id == 3 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-start flex-wrap gap-2 mt-4">
              <div className="w-fit px-2 gap-2 bg-btn-orange text-white rounded-lg  flex justify-between items-center">
                <span className="text-white flex items-center justify-center">
                  <CiMoneyBill className="w-4 h-4 flex items-center justify-center " />
                </span>
                <p className="text-center flex items-center justify-center text-[12px]">
                  1 میلیون تومان
                </p>
              </div>
              <div className="w-fit  px-2 gap-2 bg-header text-white   rounded-lg  flex justify-between items-center">
                <span className="text-white flex items-center justify-center">
                  <CiUser className="w-4 h-4 flex items-center justify-center " />
                </span>
                <p className="text-center flex items-center justify-center text-[12px]">
                  2200
                </p>
              </div>
              <div className="flex items-center justify-start flex-wrap gap-1 border-1  rounded-xl text-[12px] text-header">
                <span className="bg-header text-white overflow-hidden rounded-r-xl px-1">
                  {" "}
                  موضوعات{" "}
                </span>{" "}
                <div className="px-1">
                  {subjects
                    .slice(0, 4)
                    .map((item) => item.title)
                    .join(",")}
                </div>
                {/* {subjects.slice(0, 2).map((item) => {
                return <div key={item.id}>{item.title}</div>;
              })} */}
              </div>
            </div>
            {/* <div className="w-full h-1 border-b-1 border-header border-dotted my-4 "></div> */}

            {/* <div className="h-auto flex items-center justify-start   border-1  rounded-xl text-[12px] text-header mt-2 ">
            <span className="bg-header h-auto text-white overflow-hidden rounded-r-xl p-1 px-2">
              توضیحات
            </span>
            <span className="p-1"> این کانال با هدف آموزش و ساخت کاردستی ایجاد شده است</span>
          </div> */}

            <div className="w-full flex items-center justify-end mt-4 gap-2 ">
              <span className="rounded-full w-8 h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer">
                <CiBookmark />
              </span>
              <span className="rounded-full w-8 h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer ">
                <CgDetailsMore />
              </span>
              <span className="rounded-full w-8 h-8 bg-btn-orange flex items-center justify-center text-[16px] text-white cursor-pointer">
                <IoCallOutline />
              </span>
            </div>
          </div>

          {/* //? Type selection */}
        </div>

        {/* //? messenger icon */}

        <div
          className="cursor-pointer"
          onClick={() => copyToClipboard("saeedjamali")}
        >
          <div className="absolute w-10 h-10 rounded-full flex items-center justify-center top-6 left-4 bg-white ring-2 ring-white z-10">
            <Image alt={""} width={100} height={100} src={id.icon}></Image>
          </div>
          <div
            className="absolute h-6  rounded-r-full flex items-center justify-center top-6 left-12  md:-z-10  text-[12px] font-bold px-8 border-2 bg-white"
            style={{ border: `${id.color} solid 3px` }}
          >
            gizmiztelomy
          </div>
        </div>

        <div className="flex items-center justify-center absolute right-4 top-0  mt-4 gap-2">
          <div className="flex items-center justify-center bg-font-light-color rounded-lg px-2">
            <span className=" w-6 h-6 rounded-full ">
              <MdOutlineRemoveRedEye className="w-5 h-5" />
            </span>

            <div className=" rounded-r-full flex items-center justify-center   font-thin text-[10px]">
              1,569
            </div>
          </div>
          <span className=" w-6 h-6 rounded-full text-header">
            <RiDiscountPercentFill className="w-5 h-5" />
          </span>
        </div>

        <div className="hidden">
          <div className="h-1/2  w-full relative flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-purple-500 flex items-center justify-center">
              <Image alt={""} width={100} height={100} src={id.icon}></Image>
            </div>
            <span className="absolute top-4 right-3  w-6 h-6 rounded-full ">
              <FaEye className="w-6 h-6" />
            </span>
            <span className="absolute top-4 left-3  w-6 h-6 rounded-full ">
              <FaRegHeart className="w-6 h-6" />
            </span>
            <span className="absolute bottom-4 left-3  w-6 h-6 rounded-full ">
              <RiDiscountPercentFill className="w-6 h-6" />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold">{id.name}</h1>
            <h2 className="font-semibold text-header flex mt-2">
              {id.latin}
              <Image alt="1" width={20} height={20} src={id.icon}></Image>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 border-blue-100 ">
            {types.map((item) => {
              return (
                <div key={item.id} className="border-1 px-4 rounded-xl">
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 border-blue-100 ">
            <p>125 هزار تومان</p>
          </div>
          <div className="mt-8 flex items-center justify-center px-8">
            <p>این کانال با هدف خرید و فروش کتاب ایجاد شده است</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-12 hover:bg-blue-500">
            ارتباط با دارنده
          </div>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6 bg-white",
          backdrop: "bg-header/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-header text-black",
          header: " border-[#292f46] text-white  bg-primary_color ",
          footer: " border-[#292f46] bg-white",
          closeButton: "hover:bg-white/5 active:bg-white/10 ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-between items-start ">
                مشاهده جزییات
              </ModalHeader>
              <ModalBody>
                <p>Hi</p>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light">
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
