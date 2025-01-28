import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import counterModel from "@/models/IDCard/Counter";
const mongoose = require("mongoose");

export async function GET(req, { params, searchParams }) {
  const [action, offset, limit] = await params?.action;
  const actions = ["members", "views", "price"];

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    //   console.log("ownerIdCard--->", ownerIdCard);

    let idsCard = await idCardModel
      .find({ isShow: true })
      .sort({ [`${actions[action - 1]}`]: -1 })
      .skip(offset)
      .limit(limit)
      .populate("counter");

 

    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 201,
      idsCard,
      
    });
  } catch (error) {
    console.log("error in get top10 --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
