import { verifyPassword } from "@/utils/auth";
import idCard from "@/models/IDCard/IDCard";
import bookmarkModel from "@/models/IDCard/Bookmarks";

import connectToDB from "@/utils/db";
import { authenticateUser } from "@/utils/authenticateMe";

export async function POST(req) {
  try {
    const authUser = await authenticateUser();
    if (!authUser) {
      return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
    }
    const { isConnected } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در ارتباط با پایگاه", status: 419 });
    }
    const body = await req.json();
    // console.log("body--->", body);
    // console.log("authUser--->", authUser);
    const { userid, adsid } = body;

    const deleteBookmark = await bookmarkModel.findOneAndDelete({
      $and: [{ idCard: adsid }, { user: userid }],
    });

    // console.log("deleteBookmark--->", deleteBookmark);
    if (!deleteBookmark) {
      const addBookmark = await bookmarkModel.create({
        idCard: adsid,
        user: userid,
      });
      // console.log("addBookmark--->", addBookmark);
      const incToIds = await idCard.findOneAndUpdate(
        { _id: adsid },
        { $inc: { bookmarks: 1 } }
      );
      return Response.json({
        message:
          "آگهی نشان شد، برای مشاهده آگهی های نشان شده به پروفایل خود مراجعه نمایید",
        status: 200,
      });
    }

    const decToIds = await idCard.findOneAndUpdate(
      { _id: adsid },
      { $inc: { bookmarks: -1 } }
    );

    return Response.json({
      message: "نشان برداشته شد",
      status: 201,
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
