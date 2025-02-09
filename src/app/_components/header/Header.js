"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaUserCheck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Input,
  InputOtp,
} from "@nextui-org/react";
import { valiadteOtp, valiadtePhone } from "@/utils/auth";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import Countdown from "react-countdown";
import { BiLogOutCircle } from "react-icons/bi";
import { useAppProvider } from "@/app/context/AppProvider";
import Link from "next/link";
const timeInterval = Date.now() + 120000;
function Header({ isAuthenticateUser }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isAuth, setIsAuth] = useState(isAuthenticateUser ? true : false);
  // const { phone, role, _id } = useAppProvider();

  const router = useRouter();
  const pathname = usePathname(); //? get current route
  const [validPhone, setValidPhone] = useState(false);
  const [phoneInp, setPhoneInp] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [time, setTime] = useState(0);
  const [resend, setResend] = useState(false);
  const [outScroll, setOutScroll] = useState(false);
  const [view, setView] = useState(1); //? 1: sentOtp  2: verifyOtp
  const [url, setUrl] = useState("/");
  const [waitForSendOtpCode, setWaitForSendOtpCode] = useState(false);
  const [waitForVerifyOtpCode, setWaitForVerifyOtpCode] = useState(false);
  const { filterList, setFilterList, setRefresh } = useAppProvider();

  const handleNewAds = async () => {
    if (isAuth) {
      router.push("/new");
    } else {
      setUrl("/new");
      onOpen();
    }
  };
  const handleProfile = async () => {
    if (isAuth) {
      router.push("/dashboard");
    } else {
      setUrl("/dashboard");
      onOpen();
    }
  };

  const logoutHandler = async () => {
    const response = await fetch("/api/auth/logout");
    location.reload();
    toast.success("خارج شدید");
  };

  const handleSendOtp = async (event) => {
    if (!valiadtePhone(phoneInp?.trim())) {
      toast.error("شماره همراه وارد شده صحیح نمی باشد.");
      setWaitForSendOtpCode(false);
      setValidPhone(false);
      return false;
    }

    setWaitForSendOtpCode(true);

    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      header: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phoneInp }),
    });
    const dataP = await res.json();
    if (dataP.status == 200) {
      // setIsSendSms(true);
      toast.success("کد به شماره همراه ثبت شده ارسال شد.");
      setTime(Date.now() + 120000);
      setOtp();
      setResend(false);
      setView(2); //? Verify Otp View
    } else {
      toast.error("خطا در ارسال کد");
    }
    setWaitForSendOtpCode(false);
    // setResend(false);
    // setValidPhone(false);
  };

  const handleVerifyOtp = async (event) => {
    // event.preventDefault();

    setWaitForVerifyOtpCode(true);
    try {
      const res = await fetch("/api/auth/sms/verify", {
        method: "POST",
        header: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneInp, code: otp }),
      });
      const data = await res.json();

      if (data.status == 200) {
        toast.success("ورود با موفقیت انجام شد");
        setIsAuth(true);
        onClose();
        // location.reload();
        // router.refresh();

        router.push(url);
      } else if (data.status == 201) {
        toast.error("کد ارسالی منقضی شده است");
      } else {
        toast.error(data.message);
      }
      setWaitForVerifyOtpCode(false);
    } catch (error) {
      setWaitForVerifyOtpCode(false);
    }
  };
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {`${Math.floor(minutes)}`.padStart(2, 0)}:
        {`${seconds % 60}`.padStart(2, 0)}
      </span>
    );
  };
  useEffect(() => {
    if (valiadtePhone(phoneInp)) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  }, [phoneInp]);
  useEffect(() => {
    if (valiadteOtp(otp)) {
      setValidOtp(true);
    } else {
      setValidOtp(false);
    }
  }, [otp]);

  const onScroll = useCallback((event) => {
    const { scrollY, screen, outerHeight, pageYOffset } = window;

    if (screen.height < pageYOffset) {
      setOutScroll(true);
    } else {
      setOutScroll(false);
    }
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return (
    <header className=" w-full h-20  bg-header pr-4 pl-12">
      <div className="container flex justify-between items-center h-full mx-auto">
        <Link href={"/"}>
          <Image
            src={"/images/logo-text-right.webp"}
            width={220}
            height={100}
            alt="logo-findid"
            className="cursor-pointer"
            onClick={() => {
              setRefresh((prev) => !prev);
              // router.push("/", { scroll: true });
              // router.refresh();
              // location.reload();
            }}
          />
        </Link>

        {/* <h1 className=" text-white font-shabnam text-[16px] mr-8 hidden md:flex">
          مرجع تبادل شناسه های اینترنتی
        </h1> */}
        <div className="mr-auto flex items-center gap-2 text-xl text-font-light-color font-shabnamBold">
          {pathname != "/new" && (
            <>
              <button
                className="hidden text-white  text-[14px] mx-4 md:ml-8 bg-btn-orange px-2 md:px-4 py-1 rounded-md md:flex items-center justify-between hover:text-header"
                onClick={handleNewAds}
              >
                <IoMdAdd className="font-iranSans md:ml-2 text-2xl" />
                <span className="hidden md:flex">آگهی جدید</span>
              </button>
              <button
                className={`w-16 fixed bottom-10 right-12 z-50 flex flex-col items-center justify-center  ${
                  !outScroll && "md:hidden"
                }`}
                onClick={handleNewAds}
              >
                <span
                  className={`bg-btn-orange  text-[10px] text-white font-shabnamBold rounded-lg px-2 mb-1 ${
                    outScroll && "hidden md:flex"
                  }`}
                >
                  آگهی جدید
                </span>

                <IoMdAdd className="font-iranSans text-3xl text-white  text-[18px]   bg-btn-orange  rounded-full items-center justify-center hover:text-header h-10 w-10 p-1" />
              </button>
            </>
          )}
          <span className="  cursor-pointer " onClick={handleProfile}>
            {isAuth ? (
              <FaUserCheck className="font-bold text-btn-orange text-2xl hover:text-white" />
            ) : (
              <FaRegUser className="font-bold text-btn-orange text-2xl hover:text-white" />
            )}
          </span>
          {isAuth && (
            <span
              className="font-bold text-btn-orange text-2xl hover:text-white mr-2 cursor-pointer"
              onClick={logoutHandler}
            >
              <BiLogOutCircle />
            </span>
          )}
          {/* یا
          <span className=" hover:text-btn-orange cursor-pointer">
            {" "}
            ثبت نام
          </span> */}
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        size="3xl"
        classNames={{
          body: "py-6 bg-white",
          backdrop: "bg-header/80 backdrop-opacity-40",
          base: "border-[#292f46] bg-header text-black",
          header: " border-[#292f46] text-white  bg-primary_color ",
          footer: " border-[#292f46] bg-white",
          closeButton: "hover:bg-white/5 active:bg-white/10 ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-between items-start font-iranyekanBold">
                ورود / ثبت نام
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-center items-center gap-4">
                  {view == 1 ? (
                    <div className="flex-1   " dir="ltr">
                      <p className="text-header font-iranyekanBold" dir="rtl">
                        لطفا شماره موبایل خود را وارد کنید :
                      </p>

                      <Input
                        isClearable
                        className=" mt-8 rounded-lg  w-full text-right"
                        defaultValue="0912*******"
                        errorMessage="یک شماره همراه معتبر وارد نمایید"
                        isInvalid={!validPhone}
                        type="number"
                        variant="faded"
                        placeholder=" 0912******"
                        value={phoneInp}
                        onValueChange={setPhoneInp}
                      />

                      <Button
                        className="w-full mt-16"
                        isDisabled={!validPhone}
                        color="primary"
                        onPress={handleSendOtp}
                        isLoading={waitForSendOtpCode}
                      >
                        ارسال کد یکبار مصرف
                      </Button>
                    </div>
                  ) : view == 2 ? (
                    <div
                      className="flex-1 flex flex-col justify-center items-center w-full h-96"
                      dir="ltr"
                    >
                      <p className="text-header font-iranyekan" dir="rtl">
                        کد یکبار مصرف برای شما ارسال شد
                      </p>
                      <span className="w-full flex items-center justify-center mt-4 text-blue-400">
                        {phoneInp}{" "}
                        <CiEdit
                          className="cursor-pointer"
                          onClick={() => {
                            setResend(false);
                            setView(1);
                          }}
                        />
                      </span>
                      <p
                        dir="rtl"
                        className="font-iranyekanBold my-4 w-full text-right "
                      >
                        کد یکبار مصرف
                      </p>
                      <div className="w-full flex items-center justify-center py-2">
                        <InputOtp
                          length={5}
                          variant={"faded"}
                          value={otp}
                          onValueChange={setOtp}
                          className=""
                        />
                      </div>
                      <p className="text-[12px] text-header font-iranSans">
                        {!resend ? (
                          <>
                            ارسال مجدد در
                            <Countdown
                              date={time}
                              renderer={renderer}
                              onComplete={() => {
                                setValidOtp(false);
                                setResend(true);
                              }}
                            />{" "}
                            ثانیه
                          </>
                        ) : (
                          <span
                            className="text-blue-300 cursor-pointer underline"
                            onClick={() => {
                              setTime(timeInterval);
                              setOtp();
                              setResend(false);
                              handleSendOtp();
                            }}
                          >
                            ارسال مجدد
                          </span>
                        )}
                      </p>
                      <Button
                        className="w-full mt-16"
                        isDisabled={!validOtp || resend}
                        color="primary"
                        onPress={(e) => handleVerifyOtp(e)}
                        isLoading={waitForVerifyOtpCode}
                      >
                        تایید
                      </Button>
                    </div>
                  ) : null}
                  <div className="flex-1  md:flex hidden">
                    <Image
                      src={"/images/auth.svg"}
                      width={100}
                      height={100}
                      alt="auth banner"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </header>
  );
}

export default Header;
