import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import userModel from "@/models/base/User";
import { authenticateUser } from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  const authUser = await authenticateUser();
  const { _id } = authUser;
  const ownerIdCard = await params.userid;
  if (!authUser || _id != ownerIdCard) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    let idsCard = [];
    //   console.log("ownerIdCard--->", ownerIdCard);
    const userAdmin = await userModel.findOne({ _id: ownerIdCard });
    if (userAdmin.role == "ADMIN") {
      idsCard = await idCardModel.find().populate({
        path: "ownerIdCard",
      });
    } else {
      // idsCard = await idCardModel.find( { $and: [{ isShow: true }, { ownerIdCard}] });
      idsCard = await idCardModel.find({ ownerIdCard });
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
