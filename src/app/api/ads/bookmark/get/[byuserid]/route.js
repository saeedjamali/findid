import { verifyPassword } from "@/utils/auth";
import UserModel from "@/models/base/User";
import bookmarkModel from "@/models/IDCard/Bookmarks";

import connectToDB from "@/utils/db";
import { authenticateUser } from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  console.log("bookmarks---->", "bookmarks");
  try {
    const authUser = await authenticateUser();
    const { _id } = authUser;
    const userId = await params?.byuserid;
    if (!authUser || _id != userId) {
      return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
    }
    const { isConnected } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در ارتباط با پایگاه", status: 419 });
    }

    const bookmarks = await bookmarkModel
      .find({ user: userId })
      .populate("idCard");
    const idsCard = bookmarks.map((bk) => bk.idCard);
    console.log("bookmarks---->", idsCard);
    return Response.json({
      message: "آگهی های نشان شده دریافت شد",
      status: 200,
      idsCard,
    });
  } catch (err) {
    console.log(err);
    return Response.json({
      message: err,
      status: 500,
    });
  }
}
