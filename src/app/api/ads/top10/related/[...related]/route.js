import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import bookmarkModel from "@/models/IDCard/Bookmarks";
const mongoose = require("mongoose");

export async function GET(req, { params, searchParams }) {
  const [messenger, type, subject, id] = await params?.related;

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    //   console.log("ownerIdCard--->", ownerIdCard);

    let idsCard = await idCardModel
      .find({
        $and: [
          { isShow: true },
          { _id: { $ne: id } },
          { $and: [{ messenger }, { type }, { subject }] },
        ],
      })
      .populate("counter");

    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 201,
      idsCard,
    });
  } catch (error) {
    console.log("error in get ids --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
