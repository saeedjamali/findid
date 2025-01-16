import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import { authenticateUser } from "@/utils/authenticateMe";

export async function PUT(req) {
  const body = await req.json();
  const { ownerIdCard, adsId } = body;
  const authUser = await authenticateUser();
  console.log("authUser--->", authUser);

  const { _id, role } = authUser;
  try {
    if (!authUser || (_id != ownerIdCard && role == "USER")) {
      return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
    }

    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    let updateAds = {};
    if (role != "ADMIN") {
      updateAds = await idCardModel.findOneAndUpdate(
        { $and: [{ _id: adsId }, { ownerIdCard: _id }] },
        { isRemoved: true, isShow: false, status: 4 }
      );
    } else if (role == "ADMIN");
    {
      updateAds = await idCardModel.findOneAndUpdate(
        { _id: adsId },
        { isRemoved: true, isShow: false, status: 4 }
      );
    }

    // return Response.json({ message: "کاربری با این شماره قبلا ثبت نام نموده است", status: 401, foundedUser });
    if (!updateAds) {
      return Response.json({
        message: "خطا در حذف آگهی",
        status: 401,
      });
    }

    // const userIsActive = await userModel.findOneAndUpdate({ _id: user }, { isActive: 0 });
    return Response.json({
      message: "آگهی با موفقیت حذف شد",
      status: 200,
    });
  } catch (error) {
    console.log("Error ->", error);
    return Response.json({ message: "خطای ناشناخته !!!" });
  }
}
