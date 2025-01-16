import connectToDB from "@/utils/db";
import reportModel from "@/models/IDCard/Report";
import userModel from "@/models/base/User";
import { authenticateUser } from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  const authUser = await authenticateUser();
  const { _id, role } = authUser;
  const id = await params.id;
  if (!authUser || role != "ADMIN") {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    let idsCard = [];
    //   console.log("ownerIdCard--->", ownerIdCard);
    const userAdmin = await userModel.findOne({ _id: id });
    if (userAdmin.role == "ADMIN") {
      idsCard = await reportModel.find().populate([
        {
          path: "user",
        },
        {
          path: "idCard",
        },
      ]);
    } else {
      return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
    }

    // const len = admins.length;
    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 200,
      idsCard,
    });
  } catch (error) {
    console.log("error in get report --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
