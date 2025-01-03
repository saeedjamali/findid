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
} from "@nextui-org/react";
import CheckBox from "../checkbox/CheckBox";
import AutoComplete from "../autoComplete/AutoComplete";
import ImageUploader from "../imageUploader/ImageUploader";
import { useRouter } from "next/navigation";
import { useAppProvider } from "@/app/context/AppProvider";
import { validateEngStr, validateFunc, validateValue } from "@/utils/auth";
const maxFileSize = 2000000; //100KB
const acceptType = "jpg";
export default function Ads({ action, ads }) {
  const { isAuthUser } = useAppProvider();
  const router = useRouter();
  const { phone, _id } = isAuthUser;
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
  const [member, setMember] = useState(ads?.member);
  const [agreedPrice, setAgreedPrice] = useState(ads?.agreedPrice || false);
  const [phoneInp, setPhoneInp] = useState(phone);
  const [createDate, setCreateDate] = useState(ads?.createDate);
  const [price, setPrice] = useState(ads?.price);
  const [isOwnerId, setIsOwnerId] = useState(ads?.isOwnerId || false);
  const [ownerIdPhone, setOwnerIdPhone] = useState(ads?.ownerIdPhone);
  const [isShowPhoneOwnerIdCard, setIsShowPhoneOwnerIdCard] = useState(
    ads?.isShowPhoneOwnerIdCard || true
  );
  const [contactWithPhone, setContactWithPhone] = useState(
    ads?.contactWithPhone
  );
  const [isContactWithId, setIsContactWithId] = useState(
    ads?.isContactWithId || false
  );
  const [contactWithId, setContactWithId] = useState(ads?.contactWithId || "");
  const [contactTypeMessenger, setContactTypeMessenger] = useState(
    ads?.contactTypeMessenger || 0
  );
  const [draft, setDraft] = useState(ads?.draft);
  const [idImage, setIdImage] = useState(ads?.idImage || []);
  const [province, setProvince] = useState(ads?.province || 1);
  const [city, setCity] = useState(ads?.city || 1);
  const [discount, setDiscount] = useState(ads?.discount);
  const [statusAds, setStatusAds] = useState(ads?.statusAds);
  //   const [ads, setAds] = useState({});
  const [filterCity, setFilterCity] = useState([]);
  const [isInvalid, setIsInvalid] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    setFilterCity(() => cities.filter((city) => city.province_id == province));
  }, [province]);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  const handleNewAds = async () => {
    try {
      console.log("Message1", messenger);
      validateValue(!id || id?.length < 3, setIsInvalid, "id", setIsError);
      validateValue(messenger == 0, setIsInvalid, "messenger", setIsError);
      validateValue(subject == 0, setIsInvalid, "subject", setIsError);
      validateValue(type == 0, setIsInvalid, "type", setIsError);
      validateValue(
        !title || title?.length < 3,
        setIsInvalid,
        "title",
        setIsError
      );

      validateValue(
        !description || description?.length < 20,
        setIsInvalid,
        "description",
        setIsError
      );
      validateValue(!member || member == 0, setIsInvalid, "member", setIsError);

      validateValue(
        !agreedPrice && (!price || price == 0),
        setIsInvalid,
        "price",
        setIsError
      );

      validateValue(
        isContactWithId && contactTypeMessenger == 0,
        setIsInvalid,
        "contactTypeMessenger",
        setIsError
      );

      validateValue(
        isContactWithId && (!contactWithId || contactWithId?.length < 3),
        setIsInvalid,
        "contactWithId",
        setIsError
      );

      validateValue(
        !createDate || createDate == 0,
        setIsInvalid,
        "createDate",
        setIsError
      );

      if (isError) return;

      setIsLoading(true);
      const formData = new FormData();
      for (const image of idImage) {
        formData.append("profile", image.file);
      }

      formData.append("registerId", registerId);
      formData.append("ownerIdCard", ownerIdCard);
      formData.append("isOwnerId", isOwnerId);
      formData.append("ownerIdPhone", ownerIdPhone);
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
      formData.append("price", price);
      formData.append("id", id);
      formData.append("createDate", createDate);
      formData.append("isShowPhoneOwnerIdCard", isShowPhoneOwnerIdCard);
      formData.append("contactWithPhone", contactWithPhone);
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
        router.push("/profile");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error from new ads ->", error);
    }
    setIsLoading(false);
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
              alt="findid logo"
              height={40}
              radius="sm"
              src="/images/logo.png"
              width={40}
              className=""
            />
            <div className="flex flex-col">
              <p className="text-h1-color font-bold">آگهی جدید</p>
              {/* <p className="text-small text-default-500">nextui.org</p> */}
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="mx-auto lg:w-1/2 md:w-full gap-4 py-8">
            <Form
              className="w-full justify-center items-center  space-y-4"
              validationBehavior="native"
              validationErrors={errors}
              onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <Input
                dir="ltr"
                className="text-right py-4"
                errorMessage={"حداقل سه کاراکتر انگلیسی"}
                isInvalid={isInvalid?.id}
                color={isInvalid?.id ? "danger" : "success"}
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
                  setId(value);
                  validateFunc(validateEngStr, setIsInvalid, value, "id");
                }}
              />
              <AutoComplete
                className=""
                errorMessage={"پیام رسان را انتخاب نمایید"}
                isInvalid={isInvalid?.messenger}
                isDisabled={action == 3}
                label="پیام رسان"
                placeholder="آیدی در کدام پیام رسان است"
                arr={messengers}
                selectedKey={messenger}
                setSelectedKey={setMessenger}
              />
              <AutoComplete
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
                isRequired
                errorMessage="یک عنوان وارد نمایید(حداقل 3 کاراکتر)"
                color={isInvalid.title ? "danger" : "success"}
                isInvalid={isInvalid?.title}
                labelPlacement="outside"
                name="title"
                placeholder="یک عنوان برای شناسه ثبت شده"
                value={title}
                onValueChange={setTitle}
              />
              <Textarea
                errorMessage="حداقل 20 کاراکتر درباره آیدی"
                color={isInvalid?.description ? "danger" : "success"}
                isInvalid={isInvalid?.description}
                label="توضیحات"
                placeholder=""
                value={description}
                onValueChange={setDescription}
              />
              <Input
                isRequired
                errorMessage="تعداد اعضا وارد نمایید"
                color={isInvalid?.member ? "danger" : "success"}
                isInvalid={isInvalid?.member}
                labelPlacement="outside"
                name="member"
                type="Number"
                placeholder="تعداد اعضا کانال / گروه"
                value={member}
                onValueChange={setMember}
              />
              <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2">
                <CheckBox
                  label={"قیمت توافقی"}
                  state={agreedPrice}
                  set={setAgreedPrice}
                />

                {!agreedPrice && (
                  <Input
                    errorMessage="قیمت وارد نمایید"
                    color={isInvalid?.price ? "danger" : "success"}
                    isInvalid={isInvalid?.price}
                    // label="شناسه (آیدی) "
                    labelPlacement="outside"
                    name="price"
                    type="Number"
                    placeholder="قیمت پیشنهادی"
                    value={price}
                    onValueChange={setPrice}
                  />
                )}
              </div>
              <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2">
                <CheckBox
                  label={`شناسه (آیدی) بر روی  شماره ${phone} تعریف شده است`}
                  state={isOwnerId}
                  set={setIsOwnerId}
                />
                {!isOwnerId && (
                  <Input
                    // label="شناسه (آیدی) "
                    labelPlacement="outside"
                    color="success"
                    name="price"
                    type="phone"
                    placeholder="شماره ای که آیدی بر روی آن تعریف شده است"
                    value={ownerIdPhone}
                    onValueChange={setOwnerIdPhone}
                  />
                )}
              </div>
              <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2">
                <CheckBox
                  label={"شماره آگهی دهنده نمایش داده شود؟"}
                  state={isShowPhoneOwnerIdCard}
                  set={setIsShowPhoneOwnerIdCard}
                />

                {isShowPhoneOwnerIdCard && (
                  <Input
                    isRequired
                    errorMessage="شماره همراه وارد نمایید"
                    color={isInvalid.phone ? "danger" : "success"}
                    isInvalid={isInvalid.phone}
                    labelPlacement="outside"
                    name="price"
                    type="phone"
                    placeholder="شماره مالک جهت نمایش در آگهی و تماس"
                    value={phoneInp}
                    onValueChange={setPhoneInp}
                  />
                )}
              </div>
              <div className="bg-gray-100 rounded-lg w-full py-2 space-y-4 px-2">
                <CheckBox
                  label={"آیدی یک پیامرسان برای پاسخگویی نمایش داده شود؟"}
                  state={isContactWithId}
                  set={setIsContactWithId}
                />

                {isContactWithId && (
                  <div className="w-full gap-4 space-y-4">
                    <AutoComplete
                      errorMessage="پیام رسان را مشخص نمایید"
                      isInvalid={isInvalid?.contactTypeMessenger}
                      placeholder="آیدی در کدام پیام رسان است"
                      arr={messengers}
                      selectedKey={contactTypeMessenger}
                      setSelectedKey={setContactTypeMessenger}
                    />

                    <Input
                      dir="ltr"
                      className="text-right py-4"
                      endContent="@"
                      errorMessage=" یک آیدی معتبر وارد نمایید"
                      color={isInvalid?.contactWithId ? "danger" : "success"}
                      isInvalid={isInvalid?.contactWithId}
                      labelPlacement="outside"
                      name="contactId"
                      type="text"
                      description="آیدی جهت نمایش در آگهی برای پاسخگویی"
                      value={contactWithId}
                      onValueChange={(value) => {
                        setContactWithId(value);
                        validateFunc(
                          validateEngStr,
                          setIsInvalid,
                          value,
                          "contactWithId"
                        );
                      }}
                    />
                  </div>
                )}
              </div>

              <AutoComplete
                errorMessage="یک سال انتخاب کنید"
                isInvalid={isInvalid?.createDate}
                label="سال ایجاد(تقریبی)"
                // placeholder="یک موضوع مرتبط انتخاب کنید"
                arr={years}
                selectedKey={createDate}
                setSelectedKey={setCreateDate}
              />
              <AutoComplete
                label="استان"
                // placeholder="یک موضوع مرتبط انتخاب کنید"
                arr={provinces}
                selectedKey={province}
                setSelectedKey={setProvince}
              />
              <AutoComplete
                label="شهر"
                arr={filterCity}
                selectedKey={city}
                setSelectedKey={setCity}
              />
              <div className="w-full p-2 bg-header rounded-lg  ">
                <p className="text-right text-gray-50 text-[14px] font-bold p-2">
                  تصویر منتخب پروفایل
                </p>
                <div className="gap-2 mt-4 flex justify-center bg-slate-100 rounded-md p-4">
                  <div className="flex ">
                    <ImageUploader
                      imageItems={idImage}
                      onChange={onChangeImage}
                      maxNumber={1}
                      acceptType={acceptType}
                      maxFileSize={maxFileSize}
                      // user={user}
                    />
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
                <Slider
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
              {(action == 3 || action == 4) && (
                <Select
                  defaultSelectedKeys={[0]}
                  // description="The second most popular pet in the world"
                  label="وضعیت آگهی"
                  // placeholder="Select an animal"
                  labelPlacement="inside"
                  selectedKeys={statusAds}
                  variant="bordered"
                  onSelectionChange={setStatusAds}
                >
                  {status.map((st) => (
                    <SelectItem key={st.id}>{st.title}</SelectItem>
                  ))}
                </Select>
              )}
            </Form>
          </CardBody>
          <Divider />
          <CardFooter className="w-full flex justify-end items-center gap-2">
            {(action == 1 || action == 2) && (
              <Button className={"text-white bg-header"}>ذخیره پیش نویس</Button>
            )}
            {action == 2 && (
              <Button className={"text-white bg-red-500"}>حذف پیش نویس</Button>
            )}
            {(action == 3 || action == 4) && (
              <Button className={"text-white"} color="success">
                ذخیره تغییرات
              </Button>
            )}
            {(action == 1 || action == 2) && (
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
