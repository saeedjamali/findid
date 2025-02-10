"use client";
import React, { useEffect, useState } from "react";
import { getIds } from "@/actions/getIds";
import {
  Id_PER_PAGE,
  messengers,
  types,
  subjects,
  status,
  years,
  ObjectTitle,
  services,
} from "@/config/constants";
import { cities } from "@/data/cities";
import { provinces } from "@/data/province";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Slider,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  cn,
} from "@nextui-org/react";
import CheckBox from "../checkbox/CheckBox";
import AutoComplete from "../autoComplete/AutoComplete";
import ImageUploader from "../imageUploader/ImageUploader";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppProvider } from "@/app/context/AppProvider";
import {
  addCommas,
  removeNonNumeric,
  valiadtePhone,
  validateEngStr,
  validateFunc,
  validateValue,
} from "@/utils/auth";
import Num2persian from "num2persian";

import ImageLoader from "../imageUploader/imageLoader";
import { RiCandleFill, RiRecycleFill } from "react-icons/ri";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FaTrashAlt } from "react-icons/fa";
import ServiceCard from "../card/ServiceCard";

const maxFileSize = 2000000; //100KB
const acceptType = "jpg";
export default function Ads({ action, ad }) {
  const { isAuthUser, setRefresh } = useAppProvider();
  const router = useRouter();

  const { phone, _id, role } = isAuthUser;
  const [ads, setAds] = useState(ad);
  const [isAdmin, setIsAdmin] = useState(role == "ADMIN" ? true : false);
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  //   const [action, setAction] = useState(action);
  //Ads field
  const [registerId, setRegisterId] = useState(_id);
  const [ownerIdCard, setOwnerIdCard] = useState(_id);
  const [messenger, setMessenger] = useState(ads?.messenger || 0);
  const [type, setType] = useState(ads?.type || 0);
  const [subject, setSubject] = useState(ads?.subject || 0);
  const [id, setId] = useState(ads?.id);
  const [title, setTitle] = useState(ads?.title || "");
  const [description, setDescription] = useState(ads?.description);
  const [member, setMember] = useState(ads?.members);
  const [agreedPrice, setAgreedPrice] = useState(ads?.agreedPrice || false);
  // const [phoneInp, setPhoneInp] = useState(phone);
  const [createDate, setCreateDate] = useState(ads?.createDate || 0);
  const [price, setPrice] = useState(ads?.price || 0);
  const [isOwnerId, setIsOwnerId] = useState(ads?.isOwnerId || true);
  const [ownerIdPhone, setOwnerIdPhone] = useState(ads?.ownerIdPhone);
  const [isShowPhoneOwnerIdCard, setIsShowPhoneOwnerIdCard] = useState(
    ads?.isShowPhoneOwnerIdCard || true
  );
  const [ownerIdCardPhone, setOwnerIdCardPhone] = useState(""); //? fill in with admin
  const [contactWithPhone, setContactWithPhone] = useState(
    isAdmin ? (action == 3 ? ads?.contactWithPhone : ownerIdCardPhone) : phone
  );
  const [isContactWithId, setIsContactWithId] = useState(
    ads?.isContactWithId || false
  );
  const [contactWithId, setContactWithId] = useState(ads?.contactWithId || "");
  const [contactTypeMessenger, setContactTypeMessenger] = useState(
    ads?.contactTypeMessenger || 0
  );
  const [draft, setDraft] = useState(ads?.draft);
  const [idImage, setIdImage] = useState([]);
  const [province, setProvince] = useState(ads?.province || 1);
  const [service, setService] = useState(0 || ads?.service);
  const [city, setCity] = useState(ads?.city || 0);
  const [discount, setDiscount] = useState(ads?.discount);
  const [statusAds, setStatusAds] = useState(ads?.statusAds || 0);
  //   const [ads, setAds] = useState({});
  const [filterCity, setFilterCity] = useState([]);
  const [isInvalid, setIsInvalid] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isLoadingDeleteDraft, setIsLoadingDeleteDraft] = useState(false);
  const [isLoadingDeleteProfile, setIsLoadingDeleteProfile] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorService, setIsErrorService] = useState(false);
  const [isDisable, seIisDisable] = useState(true);

  useEffect(() => {
    setAds(ad);
    setTitle(ad?.title);
  }, []);

  useEffect(() => {
    if (type == 3) {
      seIisDisable(true);
      setMember(1);
      validateValue(false, setIsInvalid, "member", setIsError);
    } else {
      seIisDisable(false);
      setMember();
    }
  }, [type]);

  useEffect(() => {
    setFilterCity(() => cities.filter((city) => city.province_id == province));
    setCity(0);
  }, [province]);

  useEffect(() => {
    validateValue(messenger == 0, setIsInvalid, "messenger", setIsError);
  }, [messenger]);

  useEffect(() => {
    validateValue(subject == 0, setIsInvalid, "subject", setIsError);
  }, [subject]);

  useEffect(() => {
    validateValue(type == 0, setIsInvalid, "type", setIsError);
  }, [type]);

  useEffect(() => {
    validateValue(
      !createDate || createDate == 0,
      setIsInvalid,
      "createDate",
      setIsError
    );
  }, [createDate]);

  const handleNewAds = async () => {
    try {
      await validateValue(
        !id || id == "" || id?.length < 3 || !validateEngStr(id?.trim()),
        setIsInvalid,
        "id",
        setIsError
      );

      await validateValue(
        messenger == 0,
        setIsInvalid,
        "messenger",
        setIsError
      );

      await validateValue(subject == 0, setIsInvalid, "subject", setIsError);
      await validateValue(type == 0, setIsInvalid, "type", setIsError);
      await validateValue(
        !title || title?.length < 3 || title?.length > 20,
        setIsInvalid,
        "title",
        setIsError
      );

      await validateValue(
        !description || description?.length < 20,
        setIsInvalid,
        "description",
        setIsError
      );
      await validateValue(
        !member || member == 0,
        setIsInvalid,
        "member",
        setIsError
      );

      await validateValue(
        !agreedPrice && (!price || price == 0),
        setIsInvalid,
        "price",
        setIsError
      );

      await validateValue(
        isContactWithId && contactTypeMessenger == 0,
        setIsInvalid,
        "contactTypeMessenger",
        setIsError
      );

      await validateValue(
        isContactWithId &&
          (!contactWithId ||
            contactWithId == "" ||
            contactWithId?.length < 3 ||
            !validateEngStr(contactWithId?.trim())),
        setIsInvalid,
        "contactWithId",
        setIsError
      );

      await validateValue(
        !createDate || createDate == 0,
        setIsInvalid,
        "createDate",
        setIsError
      );
      if (!isOwnerId) {
        if (!valiadtePhone(ownerIdPhone)) {
          setIsInvalid((prev) => {
            return {
              ...prev,
              ownerIdPhone: true,
            };
          });
        }
      }

      if (!isShowPhoneOwnerIdCard && !isContactWithId) {
        toast.error("لطفا شماره تماس یا آیدی جهت ارتباط با مشتری درج نمایید");
        return;
      }
      // if (isError) {
      //? این فیلد بدردمون نخورد - چون در آخرین اعتبارسنجی اگه ترو میشد ارسال به پایگاه انجام میشد برای همین حلقه فور بعدیو گذاشتم
      // }
      for (const property in isInvalid) {
        // console.log(`InInvalid --> ${property}: ${isInvalid[property]}`);
        if (isInvalid[property]) {
          toast.error("خطا در ثبت اطلاعات : " + ObjectTitle[property]);
          return;
        }
      }

      if (service == 0) {
        toast.error("سرویس مورد نظر را انتخاب نمایید");
        setIsErrorService(true);
      }
      setIsLoading(true);
      const formData = new FormData();
      for (const image of idImage) {
        formData.append("profile", image.file);
      }

      // console.log("InInvalid 2", isInvalid);
      formData.append("service", service);
      formData.append("isAdmin", isAdmin);
      formData.append("ownerIdCardPhone", ownerIdCardPhone);
      formData.append("registerId", registerId);
      formData.append("ownerIdCard", ownerIdCard);
      formData.append("isOwnerId", isOwnerId);
      formData.append("ownerIdPhone", ownerIdPhone || "");
      // formData.append("code", code); Define in Backend
      formData.append("province", province);
      formData.append("city", city);
      formData.append("messenger", messenger);
      formData.append("type", type);
      formData.append("subject", subject);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("members", member);
      formData.append("agreedPrice", agreedPrice);
      formData.append("price", price || "");
      formData.append("id", id);
      formData.append("createDate", createDate);
      formData.append("isShowPhoneOwnerIdCard", isShowPhoneOwnerIdCard);
      formData.append(
        "contactWithPhone",
        isAdmin ? ownerIdCardPhone : phone || ""
      );
      formData.append("isContactWithId", isContactWithId);
      formData.append("contactWithId", contactWithId);
      formData.append("contactTypeMessenger", contactTypeMessenger);
      const res = await fetch("/api/ads/addnew", {
        method: "POST",
        header: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      const data = await res.json();
      if (data.status == 201) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
        router.push("/", { scroll: true });
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error from new ads ->", error);
    }
    setIsLoading(false);
  };

  const handleEditAds = async () => {
    try {
      await validateValue(
        !title || title?.length < 3 || title?.length > 20,
        setIsInvalid,
        "title",
        setIsError
      );

      await validateValue(
        !description || description?.length < 20,
        setIsInvalid,
        "description",
        setIsError
      );
      await validateValue(
        !member || member == 0,
        setIsInvalid,
        "member",
        setIsError
      );

      await validateValue(
        !agreedPrice && (!price || price == 0),
        setIsInvalid,
        "price",
        setIsError
      );

      await validateValue(
        isContactWithId && contactTypeMessenger == 0,
        setIsInvalid,
        "contactTypeMessenger",
        setIsError
      );

      await validateValue(
        isContactWithId &&
          (!contactWithId ||
            contactWithId == "" ||
            contactWithId?.length < 3 ||
            !validateEngStr(contactWithId?.trim())),
        setIsInvalid,
        "contactWithId",
        setIsError
      );

      await validateValue(
        !createDate || createDate == 0,
        setIsInvalid,
        "createDate",
        setIsError
      );
      if (!isOwnerId) {
        if (!valiadtePhone(ownerIdPhone)) {
          setIsInvalid((prev) => {
            return {
              ...prev,
              ownerIdPhone: true,
            };
          });
        }
      }

      if (!isShowPhoneOwnerIdCard && !isContactWithId) {
        toast.error("لطفا شماره تماس یا آیدی جهت ارتباط با مشتری درج نمایید");
        return;
      }
      // if (isError) {
      //? این فیلد بدردمون نخورد - چون در آخرین اعتبارسنجی اگه ترو میشد ارسال به پایگاه انجام میشد برای همین حلقه فور بعدیو گذاشتم
      // }
      for (const property in isInvalid) {
        // console.log(`InInvalid --> ${property}: ${isInvalid[property]}`);
        if (isInvalid[property]) {
          toast.error("خطا در ثبت اطلاعات : " + ObjectTitle[property]);
          return;
        }
      }

      if (service == 0) {
        toast.error("سرویس مورد نظر را انتخاب نمایید");
        setIsErrorService(true);
      }
      setIsLoadingEdit(true);
      const formData = new FormData();
      for (const image of idImage) {
        formData.append("profile", image.file);
      }

      // console.log("InInvalid 2", isInvalid);
      formData.append("service", service);
      formData.append("adsId", ads?._id);
      formData.append("isAdmin", isAdmin);
      formData.append("ownerIdCardPhone", ownerIdCardPhone);
      formData.append("registerId", registerId);
      formData.append("ownerIdCard", ownerIdCard);
      formData.append("isOwnerId", isOwnerId);
      formData.append("ownerIdPhone", ownerIdPhone || "");
      // // formData.append("code", code); Define in Backend
      formData.append("province", province);
      formData.append("city", city);
      // formData.append("messenger", messenger);
      // formData.append("type", type);
      // formData.append("subject", subject);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("members", member);
      formData.append("agreedPrice", agreedPrice);
      formData.append("price", price || "");
      formData.append("discount", discount || 0);
      formData.append("statusAds", statusAds || 0);
      // formData.append("id", id);
      formData.append("createDate", createDate);
      formData.append("isShowPhoneOwnerIdCard", isShowPhoneOwnerIdCard);
      formData.append(
        "contactWithPhone",
        isAdmin
          ? action == 3
            ? ads?.contactWithPhone
            : ownerIdCardPhone
          : phone
      );
      formData.append("isContactWithId", isContactWithId);
      formData.append("contactWithId", contactWithId);
      formData.append("contactTypeMessenger", contactTypeMessenger);
      const res = await fetch("/api/ads/edit/update", {
        method: "PUT",
        header: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      const data = await res.json();
      if (data.status == 200) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
        router.push("/", { scroll: true });
      } else {
        toast.error(data.message);
      }
      setIsLoadingEdit(false);
    } catch (error) {
      console.log("Error from new ads ->", error);
    }
    setIsLoadingEdit(false);
  };
  const handleDraftAds = async () => {
    try {
      validateValue(
        !id || id == "" || id?.length < 3 || !validateEngStr(id?.trim()),
        setIsInvalid,
        "id",
        setIsError
      );

      if (isInvalid.id || !id) {
        toast.error("برای ذخیره پیش نویس حداقل باید یک آیدی معتبر درج شود");
        return;
      }

      setIsLoadingDraft(true);
      const formData = new FormData();
      for (const image of idImage) {
        formData.append("profile", image.file);
      }

      formData.append("service", service);
      formData.append("registerId", registerId);
      formData.append("ownerIdCard", ownerIdCard);
      formData.append("isOwnerId", isOwnerId);
      formData.append("ownerIdPhone", ownerIdPhone || "");
      // formData.append("code", code); Define in Backend
      formData.append("province", province);
      formData.append("city", city);
      formData.append("messenger", messenger);
      formData.append("type", type);
      formData.append("subject", subject);
      formData.append("title", title || "");
      formData.append("description", description || "");
      formData.append("members", member || 0);
      formData.append("agreedPrice", agreedPrice);
      formData.append("price", price || "");
      formData.append("id", id);
      formData.append("createDate", createDate || 0);
      formData.append("isShowPhoneOwnerIdCard", isShowPhoneOwnerIdCard);
      formData.append("contactWithPhone", contactWithPhone || "");
      formData.append("isContactWithId", isContactWithId);
      formData.append("contactWithId", contactWithId);
      formData.append("contactTypeMessenger", contactTypeMessenger);
      const res = await fetch("/api/ads/adddraft", {
        method: "PUT",
        header: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      const data = await res.json();
      if (data.status == 201) {
        toast.success(data.message);
        setRefresh((prev) => !prev);
        router.push("/", { scroll: true });
      } else {
        toast.error(data.message);
      }
      setIsLoadingDraft(false);
    } catch (error) {
      console.log("Error from new ads ->", error);
    }
    setIsLoadingDraft(false);
  };

  const handleDeleteDraftAds = async () => {
    setIsLoadingDeleteDraft(true);

    try {
      const response = await fetch(`/api/ads/deletedraft/${ownerIdCard}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.status == 201) {
        toast.success(data.message);
        location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error from remove company Handler --->", error);
    }
    setIsLoadingDeleteDraft(false);
  };
  const onChangeImage = (imageList) => {
    // data for submit
    if (imageList.length > 1) {
      toast.info("صرفا امکان بارگذاری یک تصویر وجود دارد");
      return;
    }
    setIdImage(imageList);
  };

  return (
    <div>
      <Toaster />
      <div className=" container p-5 mx-auto mt-4  rounded-lg   ">
        <Card className=" mx-auto">
          <CardHeader className="flex gap-3">
            <Image
              alt="findid_logo"
              height={40}
              radius="sm"
              src="/images/logo.webp"
              width={40}
              className=""
            />
            <div className="flex flex-col">
              <p className="text-h1-color font-bold">
                {action == 3 ? "ویرایش آگهی" : "آگهی جدید"}
              </p>
              {/* <p className="text-small text-default-500">nextui.org</p> */}
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="mx-auto lg:w-1/2 md:w-full gap-4 py-8 ">
            <div
              className={`w-full border-1 border-dashed rounded-lg p-2 ${
                isErrorService ? "ring-rose-950" : "ring-cyan-950"
              }`}
            >
              <h2 className="w-full text-right text-[12px] mb-3 ">
                سرویس مورد نظر را انتخاب نمایید
              </h2>
              <ServiceCard
                services={services}
                server={true} //? برای نمایش عنوان در سرویس اsj
                setService={setService}
                current={service}
                isErrorService={isErrorService}
                isCounter={false}
              />
            </div>
            {(service || service != 0 || action != 1) && (
              <Form
                className="w-full justify-center items-center  space-y-4"
                validationBehavior="native"
                validationErrors={errors}
                onReset={() => setSubmitted(null)}
              >
                {isAdmin && action != 3 && (
                  <Input
                    // label="شناسه (آیدی) "
                    errorMessage="شماره مالک آگهی"
                    description="این شماره توسط ادمین تکمیل می شود"
                    color={isInvalid?.ownerIdCardPhone ? "danger" : "primary"}
                    isInvalid={isInvalid?.ownerIdCardPhone}
                    labelPlacement="outside"
                    name="phone"
                    type="phone"
                    placeholder="شماره ای که آیدی بر روی آن تعریف شده است"
                    value={ownerIdCardPhone}
                    onValueChange={(key) => {
                      validateValue(
                        !valiadtePhone(key?.trim()),
                        setIsInvalid,
                        "ownerIdCardPhone",
                        setIsError
                      );
                      setOwnerIdCardPhone(key?.trim());
                      setContactWithPhone(key?.trim());
                    }}
                  />
                )}
                <Input
                  dir="ltr"
                  className="text-right py-4 "
                  errorMessage={"حداقل سه کاراکتر انگلیسی بدون فاصله"}
                  isInvalid={isInvalid?.id}
                  color={isInvalid?.id ? "danger" : "primary"}
                  // isInvalid={isInvalid?.id}
                  isDisabled={action == 3}
                  isRequired
                  description={
                    "پس از انتشار آگهی ،شناسه(آیدی) امکان ویرایش ندارد."
                  }
                  label="شناسه (آیدی) "
                  labelPlacement="outside"
                  name="id"
                  placeholder="ID"
                  endContent=" @ "
                  value={id}
                  variant="flat"
                  onValueChange={(value) => {
                    setId(value?.trim());
                    validateValue(
                      !value ||
                        value == "" ||
                        value?.length < 3 ||
                        !validateEngStr(value?.trim()),
                      setIsInvalid,
                      "id",
                      setIsError
                    );
                  }}
                />
                <AutoComplete
                  isRequired
                  className=""
                  errorMessage={"پیام رسان را انتخاب نمایید"}
                  isInvalid={isInvalid?.messenger}
                  isDisabled={action == 3}
                  label="پیام رسان"
                  placeholder="آیدی در کدام پیام رسان است"
                  defaultValue={messenger}
                  arr={messengers}
                  selectedKey={messenger}
                  setSelectedKey={setMessenger}
                />
                <AutoComplete
                  isRequired
                  errorMessage="نوع فعالیت را مشخص نمایید"
                  isInvalid={isInvalid?.type}
                  isDisabled={action == 3}
                  label="نوع"
                  placeholder="آیدی مربوط به کانال ، گروه،پیج یا ... است"
                  arr={types}
                  selectedKey={type}
                  setSelectedKey={setType}
                />
                <AutoComplete
                  isRequired
                  errorMessage="موضوع را مشخص نمایید"
                  isInvalid={isInvalid?.subject}
                  isDisabled={action == 3}
                  label="موضوع"
                  placeholder="یک موضوع مرتبط انتخاب کنید"
                  arr={subjects}
                  selectedKey={subject}
                  setSelectedKey={setSubject}
                />

                <Input
                  isClearable
                  className="text-right"
                  isRequired
                  description={` ${
                    title ? title?.length + " کاراکتر  " : ""
                  }  `}
                  errorMessage="یک عنوان وارد نمایید(حداقل 3 و حداکثر 20 کاراکتر)"
                  color={isInvalid.title ? "danger" : "primary"}
                  isInvalid={isInvalid?.title}
                  name="title"
                  placeholder="یک عنوان برای شناسه"
                  value={title}
                  onValueChange={(key) => {
                    validateValue(
                      !key || key?.length < 3 || key?.length > 20,
                      setIsInvalid,
                      "title",
                      setIsError
                    );
                    setTitle(key);
                  }}
                  label="عنوان"
                  labelPlacement={"inside"}
                />
                <Textarea
                  isClearable
                  className="text-right"
                  isRequired
                  description={` ${
                    description ? description?.length + " کاراکتر  " : ""
                  }  `}
                  errorMessage="حداقل 20 کاراکتر درباره آیدی"
                  color={isInvalid?.description ? "danger" : "primary"}
                  isInvalid={isInvalid?.description}
                  label="توضیحات"
                  placeholder=""
                  value={description}
                  onValueChange={(key) => {
                    validateValue(
                      !key || key?.length < 20,
                      setIsInvalid,
                      "description",
                      setIsError
                    );
                    setDescription(key);
                  }}
                />
                <Input
                  isClearable
                  isDisabled={isDisable}
                  isRequired
                  label="تعداد اعضا"
                  labelPlacement="inside"
                  errorMessage="تعداد اعضا وارد نمایید"
                  color={isInvalid?.member ? "danger" : "primary"}
                  isInvalid={isInvalid?.member}
                  name="member"
                  type="Number"
                  // placeholder="تعداد اعضا کانال / گروه"
                  value={member}
                  onValueChange={(key) => {
                    validateValue(
                      !key || key == 0,
                      setIsInvalid,
                      "member",
                      setIsError
                    );
                    setMember(key);
                  }}
                />
                <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2">
                  <CheckBox
                    label={"قیمت توافقی"}
                    state={agreedPrice}
                    set={(key) => {
                      setAgreedPrice(key);
                      validateValue(
                        !key && (!price || price == 0),
                        setIsInvalid,
                        "price",
                        setIsError
                      );
                    }}
                  />

                  {!agreedPrice && (
                    <Input
                      isClearable
                      errorMessage="قیمت وارد نمایید"
                      color={isInvalid?.price ? "danger" : "primary"}
                      isInvalid={isInvalid?.price}
                      // label="شناسه (آیدی) "
                      labelPlacement="outside"
                      name="price"
                      type="Number"
                      placeholder="قیمت پیشنهادی"
                      value={price}
                      onValueChange={(p) => {
                        setPrice(null);
                        validateValue(
                          !agreedPrice && (!p || p == 0),
                          setIsInvalid,
                          "price",
                          setIsError
                        );
                        setPrice(p);
                      }}
                      description={
                        discount == 0 || !discount
                          ? price?.toString().num2persian() + " تومان"
                          : `با احتساب تخفیف ${(price * (1 - discount / 100))
                              .toFixed(0)
                              .toString()
                              .num2persian()} تومان`
                      }
                    />
                  )}
                  {(action == 3 || action == 4) &&
                    !agreedPrice &&
                    price != 0 && (
                      <Slider
                        isDisabled={agreedPrice}
                        classNames={{
                          base: "gap-3 bg-header p-8 rounded-lg text-white",
                          track: "border-s-secondary-100",
                          filler:
                            "bg-gradient-to-r from-secondary-100 to-secondary-500",
                        }}
                        defaultValue={0}
                        label="تخفیف بر روی آگهی اعمال شود؟"
                        value={discount}
                        onChange={setDiscount}
                        marks={[
                          {
                            value: 20,
                            label: "20%",
                          },
                          {
                            value: 50,
                            label: "50%",
                          },
                          {
                            value: 80,
                            label: "80%",
                          },
                        ]}
                        renderThumb={(props) => (
                          <div
                            {...props}
                            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                          >
                            <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                          </div>
                        )}
                        size="sm"
                      />
                    )}
                </div>
                <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2 text-right">
                  <CheckBox
                    className="text-right"
                    label={`شناسه (آیدی) بر روی  شماره ${phone} تعریف شده است`}
                    state={isOwnerId}
                    set={(key) => {
                      validateValue(
                        !key && !valiadtePhone(ownerIdPhone?.trim()),
                        setIsInvalid,
                        "ownerIdPhone",
                        setIsError
                      );

                      setIsOwnerId(key);
                    }}
                  />
                  {!isOwnerId && (
                    <Input
                      isClearable
                      // label="شناسه (آیدی) "
                      errorMessage="شماره را صحیح وارد نمایید"
                      description="این شماره در آگهی نمایش داده نمی شود"
                      color={isInvalid?.ownerIdPhone ? "danger" : "primary"}
                      isInvalid={isInvalid?.ownerIdPhone}
                      labelPlacement="outside"
                      name="phone"
                      type="phone"
                      placeholder="شماره ای که آیدی بر روی آن تعریف شده است"
                      value={ownerIdPhone}
                      onValueChange={(key) => {
                        validateValue(
                          !isOwnerId && !valiadtePhone(key?.trim()),
                          setIsInvalid,
                          "ownerIdPhone",
                          setIsError
                        );

                        setOwnerIdPhone(key?.trim());
                      }}
                    />
                  )}
                </div>
                <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2 text-right">
                  <CheckBox
                    className="text-right"
                    label={"شماره آگهی دهنده نمایش داده شود."}
                    state={isShowPhoneOwnerIdCard}
                    set={setIsShowPhoneOwnerIdCard}
                  />

                  {isShowPhoneOwnerIdCard && (
                    <Input
                      isClearable
                      isRequired
                      errorMessage="شماره همراه وارد نمایید"
                      color={isInvalid.phone ? "danger" : "primary"}
                      isInvalid={isInvalid.phone}
                      labelPlacement="outside"
                      name="phone"
                      type="phone"
                      isDisabled
                      placeholder="شماره مالک جهت نمایش در آگهی و تماس"
                      value={contactWithPhone}
                      onValueChange={setContactWithPhone}
                    />
                  )}
                </div>
                <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2 text-right">
                  <CheckBox
                    className="text-right"
                    label={"آیدی یک پیامرسان برای پاسخگویی نمایش داده شود؟"}
                    state={isContactWithId}
                    set={(key) => {
                      validateValue(
                        key &&
                          (!contactWithId ||
                            contactWithId == "" ||
                            contactWithId?.length < 3 ||
                            !validateEngStr(contactWithId?.trim())),
                        setIsInvalid,
                        "contactWithId",
                        setIsError
                      );
                      validateValue(
                        key && contactTypeMessenger == 0,
                        setIsInvalid,
                        "contactTypeMessenger",
                        setIsError
                      );

                      setIsContactWithId(key);
                    }}
                  />

                  {isContactWithId && (
                    <div className="w-full gap-4 space-y-4">
                      <AutoComplete
                        errorMessage="پیام رسان را مشخص نمایید"
                        isInvalid={isInvalid?.contactTypeMessenger}
                        placeholder="آیدی در کدام پیام رسان است"
                        arr={messengers}
                        selectedKey={contactTypeMessenger}
                        setSelectedKey={(value) => {
                          setContactTypeMessenger(value);
                          // validateValue(
                          //   isContactWithId,
                          //   setIsInvalid,
                          //   "contactTypeMessenger",
                          //   setIsError
                          // );
                        }}
                      />

                      <Input
                        // isClearable
                        dir="ltr"
                        className="text-right py-4"
                        endContent="@"
                        errorMessage=" یک آیدی معتبر وارد نمایید"
                        color={isInvalid?.contactWithId ? "danger" : "primary"}
                        isInvalid={isInvalid?.contactWithId}
                        labelPlacement="outside"
                        name="contactId"
                        type="text"
                        description="آیدی جهت نمایش در آگهی برای پاسخگویی"
                        value={contactWithId}
                        onValueChange={(value) => {
                          setContactWithId(value);
                          validateValue(
                            isContactWithId &&
                              (!contactWithId ||
                                contactWithId == "" ||
                                contactWithId?.length < 3 ||
                                !validateEngStr(contactWithId?.trim())),
                            setIsInvalid,
                            "contactWithId",
                            setIsError
                          );
                        }}
                      />
                    </div>
                  )}
                </div>

                <AutoComplete
                  isRequired
                  errorMessage="یک سال انتخاب کنید"
                  isInvalid={isInvalid?.createDate}
                  label="سال ایجاد(تقریبی)"
                  // placeholder="یک موضوع مرتبط انتخاب کنید"
                  arr={years}
                  selectedKey={createDate}
                  setSelectedKey={setCreateDate}
                />
                {/* <AutoComplete
                  label="استان"
                  // placeholder="یک موضوع مرتبط انتخاب کنید"
                  arr={provinces}
                  selectedKey={province}
                  setSelectedKey={setProvince}
                />
                <AutoComplete
                  label="شهر"
                  arr={filterCity || city}
                  selectedKey={city}
                  setSelectedKey={setCity}
                /> */}
                <div className="w-full p-2 bg-header rounded-lg  ">
                  <p className="text-right text-gray-50 text-[14px] font-bold p-2">
                    تصویر منتخب پروفایل
                  </p>
                  <div className="gap-2 mt-4 flex justify-center bg-slate-100 rounded-md p-4 ">
                    <div className="flex gap-2 flex-col md:flex-row ">
                      <ImageUploader
                        imageItems={idImage}
                        onChange={onChangeImage}
                        maxNumber={1}
                        acceptType={acceptType}
                        maxFileSize={maxFileSize}
                        // user={user}
                      />

                      {/* typeof ads?.profile != "undefined" || */}
                      {ads && ads?.thumbnail.length == 1 && (
                        <div className="relative">
                          <ImageLoader
                            imageUrl={ads?.thumbnail[0]}
                            code={"thumbnail"}
                            size={"48px"}
                            rounded={"rounded-lg"}
                          />
                          {(action == 3 || action == 4 || action == 2) && (
                            <span
                              className="absolute top-1 left-1 text-red-500 font-bold w-5 h-5 cursor-pointer"
                              // onClick={handleDeleteProfile}
                              onClick={() => {
                                setAds((prev) => {
                                  return { ...prev, profile: [] };
                                });
                              }}
                            >
                              {<FaTrashAlt />}
                            </span>
                          )}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-100 mt-1">
                    حجم تصویر حداکثر 2 مگابایت باشد.
                  </p>
                  <p className="text-[10px] text-gray-100">
                    پسوند فایل Jpg باشد.
                  </p>
                </div>

                {(action == 3 || action == 4) && (
                  <Select
                    defaultSelectedKeys={[0]}
                    // description="The second most popular pet in the world"
                    label="وضعیت آگهی"
                    // placeholder="Select an animal"
                    labelPlacement="inside"
                    selectedKeys={statusAds}
                    variant="bordered"
                    // onSelectionChange={setStatusAds}
                    onChange={(e) => setStatusAds(e.target.value)}
                  >
                    {status.map((st) => (
                      <SelectItem key={st.id}>{st.title}</SelectItem>
                    ))}
                  </Select>
                )}
              </Form>
            )}
          </CardBody>
          <Divider />
          <CardFooter className="w-full flex justify-end items-center gap-2">
            {(action == 1 || action == 2) && !isAdmin && (
              <Button
                className={"text-white bg-header"}
                onPress={handleDraftAds}
                isLoading={isLoadingDraft}
              >
                ذخیره پیش نویس
              </Button>
            )}
            {action == 2 && !isAdmin && (
              <Button
                className={"text-white bg-red-500"}
                onPress={handleDeleteDraftAds}
                isLoading={isLoadingDeleteDraft}
              >
                حذف پیش نویس
              </Button>
            )}
            {(action == 3 || action == 4) && service != 0 && (
              <Button
                className={"text-white"}
                color="success"
                onPress={handleEditAds}
                isLoading={isLoadingEdit}
              >
                ذخیره تغییرات
              </Button>
            )}
            {(action == 1 || action == 2) && service != 0 && (
              <Button
                className={"text-white"}
                color="success"
                onPress={handleNewAds}
                isLoading={isLoading}
              >
                ثبت آگهی
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
