import mongoose from "mongoose";
import User from "@/models/base/User";

const schema = mongoose.Schema(
  {
    registerId: {
      //? ثبت کننده آگهی
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ownerIdCard: {
      //? مالک آگهی
      //? در لیست آگهی های هر شخص براساس این فیلد مالک آگهی مشخص و برایش آگهی های ثبت شده نمایش داده می شود.
      type: String, //? شماره تماس مالک آگهی
      required: false,
    },
    ownerIdPhone: {
      //? شماره تماس مالک آیدی
      //? مالک آیدی
      type: String,
      default: null,
      required: false,
    },
    isOwnerId: {
      //? مالک آگهی و مالک آیدی یک نفر است؟
      type: Boolean,
      default: false,
      required: false,
    },

    code: {
      type: Number,
      default: () => Date.now(),
      immutable: false,
    },
    profile: {
      type: [String],
      default: [],
      required: false,
    },
    province: {
      type: Number,
      required: false,
    },
    city: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      default: "",
    },
    messenger: {
      type: Number,
    },
    type: {
      type: Number,
    },
    subject: {
      type: Number,
    },

    description: {
      type: String,
      default: "",
    },
    members: {
      //? تعداد اعضا
      type: Number,

      required: false,
    },
    agreedPrice: {
      type: Boolean,
      default: false,
      required: false,
    },
    price: {
      //? قیمت
      type: String,
      default: null,
      required: false,
    },
    discount: {
      //? تخفیف
      type: Number,
      required: false,
    },
    views: {
      //? تعداد بازدید
      type: Number,
      required: false,
    },
    bookmarks: {
      //? تعداد بوکمارک شده ها
      type: Number,
      required: false,
    },
    id: {
      type: String,
      default: "",
      required: true,
    },

    createDate: {
      type: Number,
      default: "",
    },
    isShowPhoneOwnerIdCard: {
      //? شماره مالک آیدی نشان داده شود؟
      type: Boolean,
      default: false,
    },
    contactWithPhone: {
      //? ارتباط با مالگ آگهی از طریق تلفن
      type: String,
      default: null,
      required: false,
    },
    isContactWithId: {
      //? ارتباط با مالگ آگهی از طریق آیدی
      type: Boolean,
      default: false,
    },

    contactWithId: {
      type: String,
      default: "",
      required: false,
    },
    contactTypeMessenger: {
      //? این فیلد نوع مسنجری که بعنوان آیدی تماس مشخص شده است را نگه میدارد
      type: Number,
    },
    status: {
      //? انواع وضعیت سمت کاربر
      type: Number,
      default: 0,
      // 0 : ثبت شده isShow True
      // 1 : فروخته شد   isShow Fasle
      // 2 : موقتا غیر فعال  isShow False
      // 3 : حذف شده  isShow False
    },
    isDraft: {
      //? آگهی بصورت پیش نویس ذخیره شده است
      type: Boolean,
      default: true,
    },

    isRemoved: {
      //? آگهی حذف شده است
      type: Boolean,
      default: true,
    },
    isShow: {
      //? آگهی نشان داده شود
      type: Boolean,
      default: true,
    },

    isConfirm: {
      //? دسترسی ادمین
      type: Number,
      default: 0,
      // 0 : در حال بررسی isShow True ? فعلا
      // 1 : تایید isShow True
      // 2 : رد   isShow False
      //
    },
  },
  {
    timestamps: true,
  }
);

const Draft = mongoose.models?.Draft || mongoose.model("Draft", schema);
export default Draft;
