import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import userModel from "@/models/base/User";
import { authenticateUser } from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  const authUser = await authenticateUser();
  const { _id, role } = authUser;
  const [userId, adsId] = await params?.id;
  if (!authUser) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }

  if (_id != userId) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    let idsCard = [];
    //   console.log("ownerIdCard--->", ownerIdCard);
    const userAdmin = await userModel.findOne({ _id: userId });
    if (userAdmin.role == "ADMIN") {
      idsCard = await idCardModel.findOne({ _id: adsId }).populate({
        path: "ownerIdCard",
      });
    } else if (userAdmin.role == "USER") {
      idsCard = await idCardModel.findOne({
        $and: [{ isShow: true }, { _id: adsId }, { ownerIdCard: userId }],
      });
    } else {
      return Response.json({
        message: "خظا دسترسی",
        status: 401,
      });
    }

    // const len = admins.length;
    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 200,
      idsCard,
    });
  } catch (error) {
    console.log("error in get ids --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
