import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import bookmarkModel from "@/models/IDCard/Bookmarks";
export async function GET(req, { params, searchParams }) {
  const [offset, limit, userId] = await params?.all;

  try {
    const { isConnected, message } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }
    const ownerIdCard = await params.id;

    //   console.log("ownerIdCard--->", ownerIdCard);

    const idsCard = await idCardModel
      .find({ isShow: true })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    let bookmarksId = [];
    if (userId) {
      bookmarksId = await bookmarkModel.find({ user: userId });
    }

   
    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 201,
      idsCard,
      bookmarksId,
    });
  } catch (error) {
    console.log("error in get ids --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
