import bookmarkModel from "@/models/IDCard/Bookmarks";
import idCardModel from "@/models/IDCard/IDCard";
import { authenticateUser } from "@/utils/authenticateMe";
import counterModel from "@/models/IDCard/Counter";
import connectToDB from "@/utils/db";

export async function DELETE(req, { params }) {
  const [ownerIdCard, adsId] = await params?.byid;

  try {
    const authUser = await authenticateUser();
    if (!authUser) {
      return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
    }
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    //اطلاعات واحد سازمانی حذف نمی شود/ بلکه وضعیت به لغو تغییر میکند
    const deletedBookmark = await bookmarkModel.findOneAndDelete({
      $and: [{ user: ownerIdCard }, { idCard: adsId }],
    });

    // return Response.json({ message: "کاربری با این شماره قبلا ثبت نام نموده است", status: 401, foundedUser });
    if (!deletedBookmark) {
      return Response.json({ message: "خطا در حذف نشان", status: 401 });
    }

    const decToIds = await counterModel.findOneAndUpdate(
      { idCard: adsId },
      { $inc: { bookmarks: -1 } },
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    );
    return Response.json({
      message: " آگهی از نشان شده ها حذف شد",
      status: 201,
    });
  } catch (error) {
    console.log("Error ->", error);
    return Response.json({ message: "خطای ناشناخته!!!" });
  }
}
