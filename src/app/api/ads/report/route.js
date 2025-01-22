import { verifyPassword } from "@/utils/auth";
import idCard from "@/models/IDCard/IDCard";
import reportModel from "@/models/IDCard/Report";

import connectToDB from "@/utils/db";
import { authenticateUser } from "@/utils/authenticateMe";

export async function POST(req) {
  try {
    const { isConnected } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در ارتباط با پایگاه", status: 419 });
    }
    const body = await req.json();
    // console.log("authUser--->", authUser);
    const { userid, adsid, description } = body;
    const maxCode = await reportModel.find().sort({ code: -1 }).limit(1);
    const addReport = await reportModel.create({
      idCard: adsid,
      user: userid,
      description,
      code:
        maxCode[0]?.code == 0 || !maxCode[0]?.code
          ? 90001
          : maxCode[0]?.code + 1,
    });
    // console.log("addBookmark--->", addBookmark);
    if (addReport) {
      return Response.json({
        message: `گزارش با کد خطا ${addReport?.code} ثبت شد`,
        status: 201,
      });
    }
    return Response.json({
      message: "خطا در ثبت گزارش",
      status: 401,
    });
    // console.log("user--->", user);
  } catch (err) {
    console.log(err);
    return Response.json({
      message: err,
      status: 500,
    });
  }
}
