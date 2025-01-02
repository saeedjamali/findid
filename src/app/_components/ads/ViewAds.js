"use client";
import { messengers, subjects, types } from "@/config/constants";
import { DateToString } from "@/utils/DateToString";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import { CiBookmark, CiShare2 } from "react-icons/ci";
function ViewAds({ ads }) {
  const copyToClipboard = (value, label) => {
    try {
      navigator.clipboard.writeText(value);
      toast.success(label);
      //   toast.success(label);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container w-full h-screen  mx-auto">
      <Toaster />

      <div className=" container p-5 mx-auto mt-4  rounded-lg   ">
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
            <div className="flex gap-6 ml-4">
              <CiBookmark
                className="text-[16px]  font-bold cursor-pointer "
                onClick={() => copyToClipboard(ads?.id, "آ'گهی نشان شد")}
              />
              <CiShare2
                className="text-[16px]  font-bold cursor-pointer"
                onClick={() => copyToClipboard(ads?.id, "لینک آگهی کپی شد")}
              />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className=" w-full gap-4 py-8 flex flex-col-reverse lg:flex-row">
            <div className="w-full col-span-1  lg:flex-1 rounded-lg mt-8 lg:mt-0">
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">شناسه (آیدی) </span>
                <span className="text-h2-color text-[14px] font-black flex items-center justify-center gap-3">
                  {ads?.id}
                  <IoCopy
                    className="text-small cursor-pointer"
                    onClick={() => copyToClipboard(ads?.id, "آیدی کپی شد")}
                  />
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">پیام رسان</span>
                <span className="flex items-center justify-center gap-2">
                  {messengers[ads?.messenger - 1].latin}
                  <Image
                    src={`${messengers[ads?.messenger - 1].icon}`}
                    width={100}
                    height={100}
                    alt="messenger icon"
                    className="w-6 h-6 "
                  />
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">نوع رسانه</span>
                <span className="text-h2-color text-[14px]">
                  {types[ads?.type - 1].title}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">موضوع</span>
                <span className="text-h2-color text-[14px]">
                  {subjects[ads?.subject - 1].title}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">تعداد اعضا</span>
                <span className="text-h2-color text-[14px]">
                  {ads?.members}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">
                  قیمت{" "}
                  <span className="text-[12px] text-green-600">
                    {ads?.discount == 0 ? "" : `(تخفیف ${ads?.discount} درصد)`}
                  </span>
                </span>
                <span>
                  <span
                    className={
                      ads?.discount != 0
                        ? "`text-red-600 text-[14px] text-danger line-through"
                        : "text-h1-color text-[14px]"
                    }
                  >
                    {ads?.agreedPrice
                      ? "توافقی "
                      : (ads?.price).toLocaleString()}
                  </span>
                  {ads?.discount != 0 && (
                    <span className="text-[14px] mx-2 text-green-600 no-underline">
                      {(
                        ads?.price *
                        (1 - ads?.discount / 100)
                      ).toLocaleString()}
                    </span>
                  )}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">
                  تعداد بازدید این صفحه
                </span>
                <span className="text-h2-color text-[14px]">
                  {ads?.members}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2">
                <span className="text-h1-color text-[14px]">
                  تعداد بوک مارک شده ها
                </span>
                <span className="text-h2-color text-[14px]">
                  {ads?.members}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2 ">
                <span className="text-h1-color text-[14px]">
                  زمان انتشار آگهی
                </span>
                <span className="text-h2-color text-[14px] ">
                  {new Date(ads?.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center p-2 ">
                <span className="text-h1-color text-[14px]">
                  زمان بروزرسانی آگهی
                </span>
                <span className="text-h2-color text-[14px] ">
                  {new Date(ads?.updatedAt).toLocaleDateString("fa-IR")}
                </span>
              </div>

              {/* //? توضیحات */}
              <Divider />
              <div className="flex flex-col justify-start items-start p-2 ">
                <span className="text-h1-color text-[14px]">توضیحات</span>
                <p className="text-h2-color text-[12px] mt-2 p-2">
                  {ads?.description}
                </p>
              </div>
              <Divider />
              {ads?.isShowPhoneOwnerIdCard && (
                <>
                  <div className="flex  justify-between items-center p-2 ">
                    <span className="text-h1-color text-[14px]">
                      شماره تماس
                    </span>
                    <p className=" flex items-center justify-center text-h2-color text-[12px] mt-2 gap-3">
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
                    <span className="text-h1-color text-[14px]">
                      آیدی جهت ارتباط با مالک
                    </span>
                    <p className="flex items-center justify-center text-h2-color text-[12px] mt-2  gap-3">
                      {ads?.contactWithId} در پیام رسان{" "}
                      {messengers[ads?.messenger - 1].title}
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
            </div>
            <div className="w-full col-span-1 lg:flex-1  md:p-0 flex items-start justify-center">
              <Image
                src={ads?.profile}
                className=" h-64 w-96 rounded-lg object-fill"
                width={100}
                height={100}
                alt="profile"
              />
            </div>
          </CardBody>
          <Divider />
        </Card>
      </div>
    </div>
  );
}

export default ViewAds;
