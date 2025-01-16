import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import { authenticateUser } from "@/utils/authenticateMe";

export async function PUT(req) {
  const body = await req.json();
  const { ownerIdCard, adsId, isShowFromUser } = body;
  const authUser = await authenticateUser();
  console.log("authUser--->", body);

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
        { isShow: !isShowFromUser, status: !isShowFromUser ? 1 : 3 }
      );
    } else if (role == "ADMIN");
    {
      updateAds = await idCardModel.findOneAndUpdate(
        { _id: adsId },
        { isShow: !isShowFromUser,status: !isShowFromUser ? 1 : 3  }
      );
    }

    // return Response.json({ message: "کاربری با این شماره قبلا ثبت نام نموده است", status: 401, foundedUser });
    if (!updateAds) {
      return Response.json({
        message: "خطا در تغییر نمایش آگهی",
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
