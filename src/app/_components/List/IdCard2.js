// components/PostCard.tsx
"use client";
import Image from "next/image";
import {
  types,
  subjects,
  years,
  messengers,
  services,
} from "@/config/constants";
import { FaBookmark, FaEye, FaRegBookmark } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdUpdate } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDiscountPercentFill, RiDiscountPercentLine } from "react-icons/ri";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { IoCallOutline, IoCopy } from "react-icons/io5";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import Num2persian from "num2persian";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  CircularProgress,
  Skeleton,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

import { DateToString } from "@/utils/DateToString";
import { useRouter } from "next/navigation";
import { memberToK } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useAppProvider } from "@/app/context/AppProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImageLoader from "../imageUploader/imageLoader";
export default function IdCard2({ item, bookmarks, showImage }) {
  const router = useRouter();
  const { isAuthUser } = useAppProvider();
  const { phone, _id, role } = isAuthUser;
  // console.log("item--->", item);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isBookmarkSend, setIsBookmarkSend] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(() => bookmarks?.some((bk) => bk.idCard == item._id));
  }, []);

  const copyToClipboard = (text, value) => {
    try {
      navigator.clipboard.writeText(text);
      toast(value, {
        icon: "👏",
      });
      // toast(value);
    } catch (err) {
      console.error(err);
    }
  };

  const showContact = () => {
    onOpen();
  };
  const sendBookmark = async () => {
    if (!isAuthUser) {
      toast("برای نشان کردن آگهی ، ابتدا لاگین نمایید", {
        icon: "👏",
      });
    }
    setIsBookmarkSend(true);
    try {
      const response = await fetch(`/api/ads/bookmark`, {
        method: "POST",
        header: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ userid: _id, adsid: item?._id }),
      });
      const data = await response.json();
      if (data.status == 200) {
        toast.success(data.message);
        setIsBookmarked(true);
        //router.push("/");
      }

      if (data.status == 201) {
        toast.success(data.message);
        setIsBookmarked(false);
        //router.push("/");
      }
      setIsBookmarkSend(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster />
      <article
        className={` w-full col-span-1 md:h-62  relative bg-glass p-0 flex flex-col md:flex-row z-10  shadow-gray-400  mt-4 md:mt-0`}
      >
        {/* //? Profile image */}
        {showImage && (
          <div className="w-full md:w-1/3  ">
            {/* <Skeleton > */}
            <div className=" w-full h-64 md:h-full  rounded-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-1 ">
              {/* <Image
              alt={""}
              width={100}
              height={100}
              src={"/images/2.jpg"}
              className="g-cover bg-center bg-no-repeat w-full h-full"
            ></Image> */}
              {item?.profile?.length != 0 ? (
                <ImageLoader imageUrl={item?.profile[0]} code={"profile"} />
              ) : (
                <>
                  <Image
                    src={"/images/logo.png"}
                    className=" h-64 w-96 rounded-lg object-fill opacity-10 p-8"
                    width={100}
                    height={100}
                    alt="profile"
                  />
                </>
              )}
            </div>
          </div>
        )}
        {/* //? title - member - price - description and type */}
        <div
          className={`w-full  pr-4 p-4 box-border flex flex-col justify-between ${
            showImage ? "md:w-2/3" : " w - full"
          }`}
        >
          <div className="flex flex-col justify-around h-full ">
            <div>
              <h2 className="font-bold text-[16px] mt-4 text-h1-color flex gap-2 ">
                {item?.title}
                <span className="relative flex">
                  <Tooltip
                    className=" text-header"
                    content={`${services[item?.service - 1]?.title1}`}
                  >
                    <span>{services[item?.service - 1]?.icon}</span>
                  </Tooltip>
                </span>
              </h2>

              <span className="font-shabnam text-[8px] mt-1 text-h2-color text-right">
                {DateToString(item?.createdAt)}
              </span>

              <div
                className={`flex items-center justify-start gap-1  border-blue-100 ${
                  showImage ? "mt-6" : "mt-9"
                }`}
              >
                {types.map((type) => {
                  return (
                    <h3
                      key={type.id}
                      className={`border-1 px-2 rounded-xl text-[10px] ${
                        type.id == item?.type ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {type.title}
                    </h3>
                  );
                })}
              </div>
              <div className="flex items-center justify-start flex-wrap gap-2 mt-2">
                <div className="w-fit px-2 gap-2 bg-btn-orange text-white rounded-lg  flex justify-between items-center">
                  <span className="text-white flex items-center justify-center">
                    <CiMoneyBill className="w-4 h-4 flex items-center justify-center " />
                  </span>
                  <h3 className="text-center flex items-center justify-center text-[10px]">
                    {item?.agreedPrice
                      ? "قیمت توافقی"
                      : item?.discount == 0
                      ? item?.price.toString().num2persian() + " تومان"
                      : (item?.price * (1 - item?.discount / 100))
                          ?.toLocaleString()
                          .num2persian() + " تومان"}
                  </h3>
                </div>
                <div className="w-fit  px-2 gap-2 bg-header text-white   rounded-lg  flex justify-between items-center">
                  <span className="text-white flex items-center justify-center">
                    <CiUser className="w-4 h-4 flex items-center justify-center " />
                  </span>
                  <h3 className="text-center flex items-center justify-center text-[12px]">
                    {memberToK(item?.members) + " عضو"}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-start flex-wrap gap-2 mt-2">
                <div className="w-auto flex items-center justify-start  gap-1 border-1 rounded-xl text-[12px] text-header ">
                  <h3 className="bg-header text-white overflow-hidden rounded-r-xl px-2">
                    {" "}
                    موضوع{" "}
                  </h3>{" "}
                  <h3 className="px-2">{subjects[item?.subject - 1].title}</h3>
                  {/* {subjects.slice(0, 2).map((item) => {
                return <div key={item.id}>{item.title}</div>;
              })} */}
                </div>
                <div className="relative w-fit  px-2 gap-2 bg-header text-white   rounded-lg  flex justify-between items-center">
                  <span className="text-white flex items-center justify-center">
                    <MdUpdate className="w-4 h-4 flex items-center justify-center " />
                  </span>
                  <Tooltip className="bg-header text-white" content="سال ساخت">
                    <h4 className="text-center flex items-center justify-center text-[12px]">
                      {years[item?.createDate - 1].title}
                    </h4>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* <div className="w-full h-1 border-b-1 border-header border-dotted my-4 "></div> */}

            {/* <div className="h-auto flex items-center justify-start   border-1  rounded-xl text-[12px] text-header mt-2 ">
            <span className="bg-header h-auto text-white overflow-hidden rounded-r-xl p-1 px-2">
              توضیحات
            </span>
            <span className="p-1"> این کانال با هدف آموزش و ساخت کاردستی ایجاد شده است</span>
          </div> */}

            <div
              className={` w-full flex items-center justify-end mt-4 gap-2  ${
                !showImage && "mt-6 "
              }`}
            >
              {!showImage && item?.profile?.length != 0 && (
                <Tooltip className="bg-header text-white" content="تصویر">
                  <span className="rounded-full w-8 h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer overflow-hidden object-fill">
                    <ImageLoader
                      imageUrl={item?.profile[0]}
                      code={"profile"}
                      size={"48px"}
                    />
                  </span>
                </Tooltip>
              )}
              <Tooltip className="bg-header text-white" content="نشان کردن">
                <span
                  className="relative rounded-full w-8 h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer"
                  onClick={sendBookmark}
                >
                  {isBookmarkSend && (
                    <span className="absolute">
                      <CircularProgress
                        color="primary"
                        aria-label="Loading..."
                        size="sm"
                      />
                    </span>
                  )}
                  {
                    isBookmarked ? (
                      <FaBookmark className="text-btn-orange" />
                    ) : (
                      // <CiBookmark className="bg-blue-400"  />
                      <FaRegBookmark />
                    )
                    // <CiBookmark onClick={sendBookmark} />
                  }
                </span>
              </Tooltip>
              <Tooltip className="bg-btn-orange text-white" content="تماس">
                <span className="rounded-full w-8 h-8 bg-btn-orange flex items-center justify-center text-[16px] text-white cursor-pointer">
                  <IoCallOutline onClick={showContact} />
                </span>
              </Tooltip>
              <Tooltip className="bg-header text-white" content="مشاهده جزییات">
                <span className="rounded-full w-8 h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer ">
                  <CgDetailsMore
                    onClick={() =>
                      router.push(`/view/${item?.title}?id=${item?._id}`)
                    }
                  />
                </span>
              </Tooltip>
            </div>
          </div>

          {/* //? Type selection */}
        </div>

        {/* //? messenger icon */}

        <div
          className="cursor-pointer z-10 "
          onClick={() => copyToClipboard(item?.id, "آیدی کپی شد")}
        >
          <div
            className={`absolute w-10 h-10 rounded-full flex items-center justify-center left-4 bg-white ring-2 ring-white z-10   ${
              !showImage ? " -top-2 md:top-6" : "top-6"
            }`}
          >
            <Image
              alt={""}
              width={100}
              height={100}
              src={messengers[item?.messenger - 1].icon}
            ></Image>
          </div>
          <div
            className={`absolute h-6 w-auto rounded-r-full flex cursor-pointer items-center  justify-center left-12  md:-z-10  text-[12px] font-bold px-8 border-2 bg-white  ${
              !showImage ? " -top-2 md:top-6" : "top-6"
            } `}
            style={{
              border: `${messengers[item?.messenger - 1].color} solid 3px`,
            }}
            onClick={() => copyToClipboard(item?.id)}
          >
            {item?.id}
          </div>
        </div>

        {showImage ? (
          <div className="flex items-center justify-center absolute right-4 top-0  mt-4 gap-2">
            <div className="flex items-center justify-center bg-font-light-color rounded-lg px-2">
              <span className=" w-6 h-6 rounded-full ">
                <MdOutlineRemoveRedEye className="w-5 h-5" />
              </span>

              <h3 className=" rounded-r-full flex items-center justify-center   font-thin text-[10px]">
                {memberToK(item?.counter?.views)}
              </h3>
            </div>
            <span className="relative w-6 h-6 rounded-full text-btn-orange">
              <Tooltip
                className="bg-header text-white"
                content={`${item?.discount} درصد تخفیف`}
              >
                {item?.discount != 0 && (
                  <RiDiscountPercentFill className="w-5 h-5" />
                )}
              </Tooltip>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center absolute left-4 top-6 md:top-14  mt-4 gap-2">
            <div className="flex items-center justify-center bg-font-light-color rounded-lg px-2">
              <span className=" w-6 h-6 rounded-full ">
                <MdOutlineRemoveRedEye className="w-5 h-5" />
              </span>

              <div className=" rounded-r-full flex items-center justify-center   font-thin text-[10px]">
                {memberToK(item?.counter.views)}
              </div>
            </div>
            <span className="relative w-6 h-6 rounded-full text-btn-orange">
              <Tooltip
                className="bg-header text-white"
                content={`${item?.discount} درصد تخفیف`}
              >
                {item?.discount != 0 && (
                  <RiDiscountPercentFill className="w-5 h-5" />
                )}
              </Tooltip>
            </span>
          </div>
        )}
      </article>
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
                تماس با آگهی گذار
              </ModalHeader>
              <ModalBody>
                {item?.isShowPhoneOwnerIdCard && (
                  <div className="flex justify-between items-center w-full h-12 bg-slate-400 rounded-md px-2">
                    <span>شماره تماس </span>
                    <span className="flex items-center gap-4">
                      {item?.contactWithPhone}
                      <IoCopy
                        className="cursor-pointer w-3 h-3"
                        onClick={() =>
                          copyToClipboard(
                            item?.contactWithPhone,
                            "شماره تماس کپی شد"
                          )
                        }
                      />
                    </span>
                  </div>
                )}
                {item?.isContactWithId && (
                  <div
                    className={`flex justify-between items-center w-full h-12  rounded-md px-2 bg-[${
                      messengers[item?.contactTypeMessenger - 1]?.color
                    }]`}
                    style={{
                      border: `${
                        messengers[item?.contactTypeMessenger - 1].color
                      } solid 1px`,
                    }}
                  >
                    <span>آیدی شبکه اجتماعی </span>
                    <span className="flex items-center gap-4 ">
                      {item?.contactWithId} در{""}
                      {messengers[item?.contactTypeMessenger - 1]?.name}
                      <IoCopy
                        className="cursor-pointer w-3 h-3"
                        onClick={() =>
                          copyToClipboard(
                            item?.contactWithId,
                            "آیدی آگهی گذار کپی شد"
                          )
                        }
                      />
                    </span>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onClick={onClose}>
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
