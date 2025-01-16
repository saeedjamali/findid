import mongoose from "mongoose";
import user from "@/models/base/User";
import idCard from "@/models/IDCard/IDCard";

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    idCard: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "IDCard",
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    code: {
      type: Number,
      default: () => Date.now(),
      immutable: false,
    },
    result: {
      type: String,
      default: "",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.models?.Report || mongoose.model("Report", schema);
export default Report;
