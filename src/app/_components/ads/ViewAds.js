"use client";
import {
  BASE_URL,
  messengers,
  subjects,
  types,
  years,
} from "@/config/constants";
import { DateToString } from "@/utils/DateToString";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import { CiBookmark, CiShare2 } from "react-icons/ci";
import Num2persian from "num2persian";
import { memberToK } from "@/utils/helper";
import { PiUser } from "react-icons/pi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useAppProvider } from "@/app/context/AppProvider";
import { usePathname } from "next/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  MdOutlineRemoveRedEye,
  MdOutlineReportGmailerrorred,
  MdUpdate,
} from "react-icons/md";
import ImageLoader from "../imageUploader/imageLoader";
import ImageLoaderView from "../imageUploader/imafgeLoaderView";
import { addBreadCrumbsJsonLd, addProductJsonLd } from "@/utils/schemasSeo";
import SwiperCp from "../swiper/SwiperCp";
function ViewAds({ ads }) {
  const [isReportSend, setIsReportSend] = useState(false);
  const [isBookmarkSend, setIsBookmarkSend] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedAds, setRelatedAds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [report, setReport] = useState("");
  const { isAuthUser } = useAppProvider();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { phone, _id, role } = isAuthUser;
  const pathname = usePathname();
  // console.log("ads--->",ads)
  const copyToClipboard = (value, label) => {
    try {
      navigator.clipboard.writeText(value);
      toast.success(label);
      //   toast.success(label);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBookmark = async () => {
      const response = await fetch(
        `/api/ads/bookmark/get/single/${_id}/${ads._id}`
      );
      const data = await response.json();
      if (data?.findBookmark) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    };
    if (isAuthUser) {
      fetchBookmark();
    }

    const fetchAdsRelated = async () => {
      const response = await fetch(
        `/api/ads/top10/related/${ads?.messenger}/${ads?.type}/${ads.subject}`
      );
      const data = await response.json();
  
      if (data?.status == 201) {
        setRelatedAds(data?.idsCard);
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    };
    fetchAdsRelated();
  }, []);
  const sendBookmark = async () => {
    if (!isAuthUser) {
      toast("برای نشان کردن آگهی ، ابتدا لاگین نمایید", {
        icon: "👏",
      });
      return;
    }
    setIsBookmarkSend(true);
    try {
      const response = await fetch(`/api/ads/bookmark`, {
        method: "POST",
        header: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ userid: _id, adsid: ads?._id }),
      });
      const data = await response.json();
      if (data.status == 200) {
        toast.success(data.message);
        setIsBookmarked(true);
        //router.push("/");
      } else if (data.status == 201) {
        toast.success(data.message);
        setIsBookmarked(false);
        //router.push("/");
      } else {
        toast.error(data.message);
      }
      setIsBookmarkSend(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendReport = async () => {
    if (report.length < 100) {
      toast.error("لطفا توضیحات کافی و حداقل 100 کاراکتر باشد");
      return;
    }
    setIsReportSend(true);
    try {
      const response = await fetch(`/api/ads/report`, {
        method: "POST",
        header: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: _id,
          adsid: ads?._id,
          description: report,
        }),
      });
      const data = await response.json();
      if (data.status == 200) {
        toast.success(data.message);
        setIsBookmarked(true);
        //router.push("/");
      } else {
        toast.error(data.message);
      }

      setIsReportSend(false);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };
  return (
    <div className="container w-full  mx-auto">
      <Toaster />

      <div className=" container p-5 mx-auto mt-2  rounded-lg   ">
        <Card className=" mx-auto h-auto">
          <CardHeader className="flex gap-3 justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                alt="findid logo"
                height={40}
                radius="sm"
                src="/images/logo.png"
                width={40}
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-h1-color font-bold">{ads?.title}</h1>
                <h2 className="text-[10px] text-h2-color">
                  {DateToString(ads?.createdAt)}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-full gap-3 ml-4">
              <span className=" flex gap-2 md:gap-4 ">
                <span className="relative rounded-full w-6 h-6 md:w-8  md:h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer">
                  {isBookmarkSend && (
                    <span className="absolute">
                      <CircularProgress
                        color="primary"
                        aria-label="Loading..."
                        size="sm"
                      />
                    </span>
                  )}
                  {isBookmarked ? (
                    <FaBookmark
                      onClick={sendBookmark}
                      className="text-btn-orange"
                    />
                  ) : (
                    // <CiBookmark className="bg-blue-400"  />
                    <FaRegBookmark onClick={sendBookmark} />
                  )}
                </span>
                <span className="relative rounded-full w-6 h-6 md:w-8  md:h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer">
                  <CiShare2
                    className="font-bold cursor-pointer w-full h-full p-1 flex justify-center items-center"
                    onClick={() =>
                      copyToClipboard(
                        BASE_URL + `/view/${ads?.title}?id=${ads?._id}`,
                        "لینک آگهی کپی شد"
                      )
                    }
                  />
                </span>
                <span className="relative rounded-full w-6 h-6 md:w-8  md:h-8 bg-header flex items-center justify-center text-[16px] text-white cursor-pointer">
                  <Tooltip
                    className="bg-header text-white"
                    content="گزارش تخلف"
                  >
                    <MdOutlineReportGmailerrorred
                      className="  font-bold cursor-pointer w-full h-full p-1 flex justify-center items-center"
                      onClick={() => onOpen()}
                    />
                  </Tooltip>
                </span>
              </span>
              <span className="text-[8px] "> کد آگهی {ads?.code}</span>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className=" w-full gap-4 py-8 flex flex-col-reverse lg:flex-row">
            <div className="w-full col-span-1  lg:flex-1 rounded-lg mt-4 lg:mt-0">
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive">
                  شناسه (آیدی){" "}
                </span>
                <div className="text-h2-color text-responsive  flex items-center justify-center gap-3 font-semibold text-center">
                  <span className="flex items-center justify-center h-ful">
                    {" "}
                    {ads?.id}
                  </span>{" "}
                  <IoCopy
                    className="cursor-pointer w-3 h-3"
                    onClick={() => copyToClipboard(ads?.id, "آیدی کپی شد")}
                  />
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive">پیام رسان</span>
                <span className="flex items-center justify-center gap-2 text-[12px] font-semibold">
                  {messengers[ads?.messenger - 1]?.latin}
                  <Image
                    src={`${messengers[ads?.messenger - 1]?.icon}`}
                    width={100}
                    height={100}
                    alt="messenger icon"
                    className="w-6 h-6 "
                  />
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive">نوع رسانه</span>
                <span className="text-h2-color text-responsive">
                  {types[ads?.type - 1]?.title}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive">موضوع</span>
                <span className="text-h2-color text-responsive">
                  {subjects[ads?.subject - 1]?.title}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive text-right">
                  قیمت{" "}
                  <span className="text-[12px] text-green-600">
                    {ads?.discount == 0 || !ads?.discount
                      ? ""
                      : `(تخفیف ${ads?.discount} درصد)`}
                  </span>
                </span>
                <span>
                  {ads?.discount != 0 && (
                    <span className="text-responsive mx-2 text-green-600 no-underline">
                      {(
                        ads?.price *
                        (1 - ads?.discount / 100)
                      )?.toLocaleString()}
                      {/* <span className="text-[8px] "> تومان</span> */}
                    </span>
                  )}

                  {ads?.agreedPrice ? (
                    <span className="text-h1-color text-responsive  gap-2">
                      توافقی
                    </span>
                  ) : (
                    <>
                      <span
                        className={
                          ads?.discount != 0
                            ? "`text-red-600 text-responsive text-danger line-through  gap-2"
                            : "text-h1-color text-responsive  gap-2"
                        }
                      >
                        {Number(ads?.price).toLocaleString()}
                      </span>
                      <span className="text-[8px] text-h1-color no-underline ">
                        {" "}
                        تومان
                      </span>
                    </>
                  )}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive text-right">
                  تعداد اعضا
                </span>
                <span className="flex items-center justify-center gap-2 text-h2-color text-responsive text-left">
                  {(ads?.members).toLocaleString()}
                  <PiUser />
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive text-right">
                  سال ساخت
                </span>
                <span className="flex items-center justify-center gap-2 text-h2-color text-responsive text-left">
                  {years[ads?.createDate - 1].title}
                  <MdUpdate />
                </span>
              </div>

              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive text-right">
                  تعداد بازدید این صفحه
                </span>
                <span className="flex items-center justify-center gap-2 text-h2-color text-responsive text-left">
                  {memberToK(ads?.counter?.views)}
                  <MdOutlineRemoveRedEye />
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-responsive text-right">
                  تعداد بوک مارک شده ها
                </span>
                <span className=" flex items-center justify-center gap-2 text-h2-color text-responsive text-left">
                  {ads?.counter?.bookmarks?.toLocaleString()}
                  <FaRegBookmark />
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2 ">
                <span className="text-h1-color text-responsive text-right">
                  زمان انتشار آگهی
                </span>
                <span className="text-h2-color text-responsive text-left">
                  {new Date(ads?.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2 ">
                <span className="text-h1-color text-responsive text-right">
                  زمان بروزرسانی آگهی
                </span>
                <span className="text-h2-color text-responsive text-left">
                  {new Date(ads?.updatedAt).toLocaleDateString("fa-IR")}
                </span>
              </div>

              {/* //? توضیحات */}
              {/* <Divider />
              <div className="flex flex-col justify-start items-start p-2 ">
                <span className="text-h1-color text-responsive">توضیحات</span>
                <p className="text-h2-color text-[12px] mt-2 p-2">
                  {ads?.description}
                </p>
              </div> */}
              <Divider />
              {ads?.isShowPhoneOwnerIdCard && (
                <>
                  <div className="flex  justify-between items-center p-2 ">
                    <span className="text-h1-color text-responsive text-right">
                      شماره تماس
                    </span>
                    <p className=" flex items-center justify-center text-h2-color text-[12px] mt-2 gap-3 text-left">
                      {ads?.contactWithPhone}
                      <IoCopy
                        className="text-small cursor-pointer"
                        onClick={() =>
                          copyToClipboard(
                            ads?.contactWithPhone,
                            "شماره همراه کپی شد"
                          )
                        }
                      />
                    </p>
                  </div>
                  <Divider />
                </>
              )}
              {ads?.isContactWithId && (
                <>
                  <div className="flex  justify-between items-center p-2 ">
                    <span className="text-h1-color text-responsive text-right">
                      آیدی جهت ارتباط با مالک
                    </span>
                    <p className="flex items-center justify-center text-h2-color text-[12px] mt-2  gap-3 text-left">
                      {ads?.contactWithId} در پیام رسان{" "}
                      {messengers[ads?.messenger - 1]?.title}
                      <IoCopy
                        className="text-small cursor-pointer"
                        onClick={() =>
                          copyToClipboard(ads?.contactWithId, "آیدی کپی شد")
                        }
                      />
                    </p>
                  </div>
                  <Divider />
                </>
              )}
              <div className="flex w-full lg:hidden flex-col mt-4 justify-start items-start p-2 bg-slate-100 rounded-lg ">
                <span className="text-h1-color text-responsive text-right">
                  توضیحات
                </span>
                <p className="text-h2-color text-[12px] mt-2 p-2 text-right">
                  {ads?.description}
                </p>
              </div>
              <div className=" w-full lg:hidden  mt-4 ">
                <h3 className="p-2 font-iranyekanBold text-[12px] w-full text-right">
                  آگهی های مرتبط
                </h3>

                <div className=" w-full flex  lg:hidden items-center justify-center bg-gray-50 mt-4 rounded-lg">
                  <SwiperCp ids={relatedAds} isLoaded={isLoaded} />
                </div>
              </div>
            </div>

            <div className="w-full col-span-1 lg:flex-1  md:p-0 flex flex-col items-center  ">
              {ads?.profile?.length != 0 ? (
                <ImageLoaderView imageUrl={ads?.profile[0]} code={"profile"} />
              ) : (
                <>
                  <LazyLoadImage
                    src={"/images/logo.png"}
                    className=" h-64 w-96 rounded-lg object-fill opacity-10"
                    width={100}
                    height={100}
                    alt="profile"
                    // effect="blur"
                    // wrapperProps={{
                    //   // If you need to, you can tweak the effect transition using the wrapper style.
                    //   style: {
                    //     transitionDelay: "1s",
                    //   },
                    // }}
                  />
                  {/* <p className="absolute font-shabnam text-3xl text-gray-700 opacity-40">
                    تصویر یافت نشد
                  </p> */}
                </>
              )}
              <div className="hidden w-full lg:flex flex-col mt-8 justify-start items-start p-2 bg-slate-100 rounded-lg">
                <span className="text-h1-color text-[14px]">توضیحات</span>
                <p className="text-h2-color text-[12px] mt-2 p-2">
                  {ads?.description}
                </p>
              </div>

              <div className="w-full hidden  lg:flex items-center justify-center bg-gray-50 mt-4  rounded-lg ">
                <SwiperCp ids={relatedAds} isLoaded={isLoaded} />
              </div>
            </div>
          </CardBody>
          <Divider />
        </Card>
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
                گزارش تخلف
              </ModalHeader>
              <ModalBody>
                <Textarea
                  className="text-wrap text-right"
                  isRequired
                  errorMessage="حداقل 100 کاراکتر درباره آیدی"
                  label="توضیحات"
                  placeholder=""
                  value={report}
                  onValueChange={setReport}
                  description={`حداقل 100 کاراکتر (${report.length})`}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="ghost"
                  onPress={sendReport}
                  isLoading={isReportSend}
                >
                  ارسال گزارش
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ViewAds;
