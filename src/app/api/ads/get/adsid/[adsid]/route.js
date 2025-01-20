import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import { authenticateUser } from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  //   if (!(await authenticateUser())) {
  //     return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  //   }
  console.log("idsCard.views------------->");
  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }
    const _id = await params.adsid;
    const fonuded = await idCardModel.findOneAndUpdate(
      { _id },
      { $inc: { views: 1 } }
      // { views: idsCard.views + 1 }
    );
    // let founded = {};
    // if (idsCard) {
    //   founded = await idCardModel.findOneAndUpdate(
    //     { _id },
    //     {
    //       $set: { views: idsCard.views + 1 },
    //     }
    //   );
    // }

    const idsCard = await idCardModel.findOne(
      { _id }

      // { views: idsCard.views + 1 }
    );

    // const len = admins.length;
    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 201,
      idsCard,
    });
  } catch (error) {
    console.log("error in get ids --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
