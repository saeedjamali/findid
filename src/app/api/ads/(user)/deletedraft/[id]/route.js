import connectToDB from "@/utils/db";

import idDraftModel from "@/models/IDCard/Draft";
import { authenticateUser } from "@/utils/authenticateMe";

export async function DELETE(req, { params }) {
  if (!(await authenticateUser())) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }

  const ownerIdCard = params.id;

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    //اطلاعات واحد سازمانی حذف نمی شود/ بلکه وضعیت به لغو تغییر میکند
    const deletedDrafCadr = await idDraftModel.findOneAndDelete({
      ownerIdCard,
    });

    // return Response.json({ message: "کاربری با این شماره قبلا ثبت نام نموده است", status: 401, foundedUser });
    if (!deletedDrafCadr) {
      return Response.json({ message: "خطا در حذف پیش نویس", status: 401 });
    }

    return Response.json({
      message: " پیش نویس حذف شد",
      status: 201,
    });
  } catch (error) {
    console.log("Error ->", error);
    return Response.json({ message: "خطای ناشناخته!!!" });
  }
}
