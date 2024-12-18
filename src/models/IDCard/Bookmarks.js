import mongoose from "mongoose";
import user from "@/models/base/User";
import idCard from "@/models/IDCard/IDCard";

const schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        },
        idCard: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "IDCard"
        },
    },
    {
        timestamps: true,
    }
);

const Bookmark = mongoose.models?.Bookmark || mongoose.model("Bookmark", schema);
export default Bookmark;
