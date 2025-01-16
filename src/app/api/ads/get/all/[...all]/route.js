import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import userModel from "@/models/base/User";
import { authenticateUser } from "@/utils/authenticateMe";
import { off } from "process";

export async function GET(req, { params, searchParams }) {

  
  const [offset, limit] = await params?.all;
  
  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }
    const ownerIdCard = await params.id;

    //   console.log("ownerIdCard--->", ownerIdCard);

    const idsCard = await idCardModel
      .find({ isShow: true }).sort({ createdAt: -1 }).skip(offset).limit(limit);
    // console.log("idsCard--->", idsCard);
    // const len = admins.length;
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
