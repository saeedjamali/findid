import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
const mongoose = require("mongoose");

export async function GET(req) {
 
  let idsCard = [];

 
  try {
    const { isConnected, message } = await connectToDB();
   
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    const counter = await idCardModel.aggregate([
      {
        $group: {
          _id: "$service",
          // isShow: true,
          count: { $sum:  { $cond: { if: { $eq: ["$isShow", true] }, then: 1, else: 0 } }}, // this means that the count will increment by 1
        },
      },
    ]);

   

    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 201,
      counter,
    });
  } catch (error) {
    console.log("error in get ids --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
