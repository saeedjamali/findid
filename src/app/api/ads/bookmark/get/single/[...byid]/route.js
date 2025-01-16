import { verifyPassword } from "@/utils/auth";
import idCard from "@/models/IDCard/IDCard";
import bookmarkModel from "@/models/IDCard/Bookmarks";

import connectToDB from "@/utils/db";
import { authenticateUser } from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  console.log("Psraarms------>", await params?.byid)
  try {
    const authUser = await authenticateUser();
    if (!authUser) {
      return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
    }
    const { isConnected } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در ارتباط با پایگاه", status: 419 });
    }
    const [userid, adsid] = await params?.byid;
    console.log("body--->", userid);
    // console.log("authUser--->", authUser);

    const findBookmark = await bookmarkModel.findOne({
      $and: [{ idCard: adsid }, { user: userid }],
    });

    // console.log("deleteBookmark--->", deleteBookmark);

    return Response.json({
      message: "نشان برداشته شد",
      status: 201,
      findBookmark,
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
