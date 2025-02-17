import connectToDB from "@/utils/db";

import idCardModel from "@/models/IDCard/IDCard";
import { authenticateUser } from "@/utils/authenticateMe";

export async function PUT(req, { params }) {
  if (!(await authenticateUser())) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }

  const idCard = params.id;

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    //اطلاعات واحد سازمانی حذف نمی شود/ بلکه وضعیت به لغو تغییر میکند
    const updateProfile = await idCardModel.findOneAndUpdate(
      {
        _id: idCard,
      },
      { profile: [] }
    );

    // return Response.json({ message: "کاربری با این شماره قبلا ثبت نام نموده است", status: 401, foundedUser });
    if (!updateProfile) {
      return Response.json({ message: "خطا در حذف تصویر", status: 401 });
    }

    return Response.json({
      message: " تصویر آگهی حذف شد",
      status: 201,
    });
  } catch (error) {
    console.log("Error ->", error);
    return Response.json({ message: "خطای ناشناخته!!!" });
  }
}
