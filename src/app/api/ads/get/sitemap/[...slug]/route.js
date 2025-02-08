import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import bookmarkModel from "@/models/IDCard/Bookmarks";
const mongoose = require("mongoose");

export async function GET(req, { params, searchParams }) {
  const [offset, limit] = await params?.slug;

  try {
    const { isConnected, message } = await connectToDB();
    let idsCard = [];
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }
    idsCard = await idCardModel
      .find({ isShow: true })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);


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
