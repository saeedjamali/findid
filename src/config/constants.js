// config/constants.ts

import {
  MdOutlineAdminPanelSettings,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { TbExchange } from "react-icons/tb";

export const API_URL = "/api/ads/get/all";
export const BASE_URL = "http://localhost:3000/";
export const Id_PER_PAGE = 50;
export const messengers = [
  {
    id: 1,
    title: "تلگرام",
    latin: "Telegram",
    icon: "/images/messengers/icons/telegram-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1, //? داخلی / خارجی
    category: 1, //? messenger
    color: "#039BE5",
    link: "http://telegram.me/",
  },
  {
    id: 2,
    title: "واتساپ",
    latin: "Whatsapp",
    icon: "/images/messengers/icons/whatsapp-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#55F070",
    link: "https://whatsapp.com/",
  },
  {
    id: 3,
    title: "اینستاگرام",
    latin: "Instagram",
    icon: "/images/messengers/icons/instagram-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#6A0CDD",
    link: "http://instagram.com/p/",
  },
  {
    id: 4,
    title: "بله",
    latin: "Bale",
    icon: "/images/messengers/icons/bale-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#44BDA4",
    link: "https://web.bale.ai/", //? https://web.bale.ai/@sroshani
  },

  {
    id: 5,
    title: "سروش",
    latin: "Soroush",
    icon: "/images/messengers/icons/soroush-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#145DA7",
    link: "",
  },
  {
    id: 6,
    title: "گپ",
    latin: "Gap",
    icon: "/images/messengers/icons/gap-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#7A50D7",
    link: "",
  },
  {
    id: 7,
    title: "آی گپ",
    latin: "iGap",
    icon: "/images/messengers/icons/igap-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#B3D33A",
    link: "",
  },
  {
    id: 8,
    title: "فیس بوک",
    latin: "Facebook",
    icon: "/images/messengers/icons/facebook-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#1376EE",
    link: "http://facebook.com/",
  },
  {
    id: 9,
    title: "تیک تاک",
    latin: "TikTok",
    icon: "/images/messengers/icons/tiktok-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#000000",
    link: "",
  },
  {
    id: 10,
    title: "ایکس",
    latin: "X",
    icon: "/images/messengers/icons/x-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#000000",
    link: "",
  },
  {
    id: 11,
    title: "یوتیوب",
    latin: "Youtube",
    icon: "/images/messengers/icons/youtube-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#FE0103",
    link: "",
  },
  {
    id: 12,
    title: "پینترست",
    latin: "Pinterest",
    icon: "/images/messengers/icons/pinterest-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 1,
    category: 1,
    color: "#E70121",
    link: "",
  },
  {
    id: 13,
    title: "آپارات",
    latin: "Aparat",
    icon: "/images/messengers/icons/aparat-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#EC145A",
    link: "",
  },
  {
    id: 14,
    title: "ایتا",
    latin: "Eita",
    icon: "/images/messengers/icons/eita-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#F15A24",
    link: "https://web.eitaa.com/#", //? https://web.eitaa.com/#@alisahebdel
  },
  {
    id: 15,
    title: "روبیکا",
    latin: "Rubika",
    icon: "/images/messengers/icons/rubika-ic.png",
    thumbnail: "/images/messengers/thumbnail/.png",
    description: "",
    status: false,
    type: 2,
    category: 1,
    color: "#7A4587",
    link: "https://rubika.ir/", //? https://rubika.ir/alphaenglishapp
  },
];

export const types = [
  { id: 1, type: "channel", title: "کانال", category: 2 },
  { id: 2, type: "group", title: "گروه", category: 2 },
  { id: 3, type: "private", title: "شخصی", category: 2 },
  { id: 4, type: "page", title: "پیج", category: 2 },
];

export const subjects = [
  { id: 1, title: "سرگرمی", description: "", subTitle: [], category: 3 },
  { id: 2, title: "خبری", description: "", subTitle: [], category: 3 },
  { id: 3, title: "ورزشی", description: "", subTitle: [], category: 3 },
  { id: 4, title: "پزشکی و سلامت", description: "", subTitle: [], category: 3 },
  { id: 5, title: "آموزشی", description: "", subTitle: [], category: 3 },
  { id: 6, title: "موسیقی", description: "", subTitle: [], category: 3 },
  { id: 7, title: "انگیزشی", description: "", subTitle: [], category: 3 },
  { id: 8, title: "حیوانات", description: "", subTitle: [], category: 3 },
  { id: 9, title: "فروشگاهی", description: "", subTitle: [], category: 3 },
  { id: 10, title: "مد و زیبایی", description: "", subTitle: [], category: 3 },
  { id: 11, title: "نقد و بررسی", description: "", subTitle: [], category: 3 },
  { id: 12, title: "ایده پردازی", description: "", subTitle: [], category: 3 },
  {
    id: 13,
    title: "موضوعات چالشی",
    description: "",
    subTitle: [],
    category: 3,
  },
  { id: 14, title: "بازی‌ها", description: "", subTitle: [], category: 3 },
  {
    id: 15,
    title: "سفر و معرفی مکان‌های جدید",
    description: "",
    subTitle: [],
    category: 3,
  },
  { id: 16, title: "تکنولوژی", description: "", subTitle: [], category: 3 },
  {
    id: 17,
    title: "بلاگری و نمایش زندگی شخصی",
    description: "",
    subTitle: [],
    category: 3,
  },
  { id: 18, title: "ترفندها", description: "", subTitle: [], category: 3 },
  { id: 19, title: "فیلم و سریال", description: "", subTitle: [], category: 3 },
];
export const status = [
  { id: 0, title: "پیش فرض" },
  { id: 1, title: "فعال" },
  { id: 2, title: "فروخته شد" },
  { id: 3, title: "موقتا غیر فعال " },
  { id: 4, title: "حذف  " },
];
export const sorts = [
  { id: 0, title: "تاریخ ثبت آگهی" },
  { id: 1, title: "تاریخ بروزرسانی" },
  { id: 2, title: "تعداد اعضا" },
  { id: 3, title: "قیمت" },
];

export const years = [
  { id: 1, title: "2025" },
  { id: 2, title: "2024" },
  { id: 3, title: "2023" },
  { id: 4, title: "2022" },
  { id: 5, title: "2021" },
  { id: 6, title: "2020" },
  { id: 7, title: "2019" },
  { id: 8, title: "2018" },
  { id: 9, title: "2017" },
  { id: 10, title: "2016" },
  { id: 11, title: "2015" },
  { id: 12, title: "2014" },
  { id: 13, title: "2013" },
  { id: 14, title: "2012" },
  { id: 15, title: "2011" },
  { id: 16, title: "2010" },
  { id: 17, title: "2009" },
  { id: 18, title: "2008" },
  { id: 19, title: "2007" },
  { id: 20, title: "2006 و ماقبل" },
];

export const actions = [
  { id: 1, title: "new without draft" },
  { id: 2, title: "new with draft" },
  { id: 3, title: "edit for user" },
  { id: 4, title: "edit for admin" },
];

export const services = [
  {
    id: 1,
    title1: "خرید/فروش",
    title2: "خرید/فروش",
    icon: <MdOutlineShoppingCart />,
    description :" در صورتیکه تولید کننده محتوی هستید میتوانید کانال ، گروه یا پیح خود را که در یک از بسترهای داخلی یا خارجی می باشد در سامانه فایند ایدی ثبت وآگهی کنید."
  },
  {
    id: 2,
    title1: "درخواست ادمین",
    title2: "درخواست ادمین",
    icon: <MdOutlineAdminPanelSettings />,
    description:"در صورتیکه برای کانال ، پیج یا گروه خود نیاز به ادمین دارید می توانید با ثبت آگهی با این خدمت در لیست متقاضیان ادمین دیده شوید"
  },
  {
    id: 3,
    title1: "درخواست تبادل",
    title2: "متقاضی تبادل",
    icon: <TbExchange />,
    description:"در صورتی که نیاز به تبادل عضو، محتوی و  ... میتوانید با ثبت آگهی و اطلاعات صفحه خود ، در قسمت درخواست تبادل دیده شوید."
  },
  {
    id: 4,
    title1: "معرفی بستر برای درج تبلیغات",
    title2: "تبلیغات",
    icon: <RiAdvertisementLine />,
    description:"در صورتی که بستری برای درج تبلیغات دارید، میتوانید با ثبت اطلاعات کانال ، گروه یا پیج و دریافت پیشنهاد آگهی در قسمت تبلیغات فایند آیدی دیده شوید"
  },
];

export const addss = {
  registerId: "12145afdsa5sda5sda",
  ownerIdCard: "12145afdsa5sda5sda",
  isOwnerId: true,
  ownerIdPhone: "09151208032",
  code: 100001,
  profile: "/images/3.jpg",
  id: "saeedjamali",
  provinvce: 2,
  city: 83,
  title: "مناسب برای ورزش",
  messenger: 2,
  type: 1,
  subject: 5,
  description: "این کانال بسیار مناسب است",
  members: 1900,
  agreedPrice: false,
  price: 1750000,
  discount: 50,
  views: 1800,
  bookmarks: 100,
  isShowPhoneOwnerIdCard: true,
  contactWithPhone: "09151208032",
  isContactWithId: true,
  contactWithId: "jasjam",
  contactTypeMessenger: 4,
  status: 1,
  isDraft: false,
  isRemoved: false,
  isShow: true,
  isConfirm: 0,
  createdAt: "2024-06-05T13:28:58.842+00:00",
  updatedAt: "2024-09-05T13:28:58.842+00:00",
};

export const ObjectTitle = {
  id: "آیدی",
  createDate: "تاریخ ایجاد آیدی",
  contactWithId: "آیدی پشتیبان",
  contactTypeMessenger: "نوع پیام رسان آیدی پشتیبان",
  price: "قیمت آیدی",
  member: "تعداد اعضا",
  description: "توضیحات",
  title: "عنوان برای آیدی",
  type: "نوع پیامرسان",
  subject: "موضوع",
  messenger: "نام پیام رسان",
};
