import mongoose from "mongoose";
import idCard from "@/models/IDCard/IDCard";

const schema = mongoose.Schema(
  {
    idCard: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "IDCard",
    },
    bookmarks: {
      //? تعداد بوکمارک شده ها
      type: Number,
      default: 0,
      required: false,
    },
    views: {
      //? تعداد بازدید
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Counter = mongoose.models?.Counter || mongoose.model("Counter", schema);
export default Counter;
