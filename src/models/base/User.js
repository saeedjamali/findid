import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      //?  manager - admin - user
      type: String,
      default: "USER",
    },
    level: {
      type: Number,
      default: 1,
      // 1 : کاربر عادی // ادمین عادی
      // 2 : تایید
      // 99 : ادمین فول
    },
    identifier: {
      type: String,
      required: true,
    },
    profile: {
      type: [String],
      default: [],
      required: false,
    },
    refreshToken: {
      type: String,
    },
    isActive: {
      type: Number,
      default: 1,
      // 0 : در حال بررسی
      // 1 : تایید
      // 2 : رد
    },
    comment: {
      type: String,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.User || mongoose.model("User", schema);
export default model;
