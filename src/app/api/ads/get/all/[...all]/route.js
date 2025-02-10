import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import bookmarkModel from "@/models/IDCard/Bookmarks";
const mongoose = require("mongoose");

export async function POST(req, { params, searchParams }) {
  const [offset, limit, userId, sort, service, search] = await params?.all;
  let messengers = [],
    types = [],
    subjects = [];
  let idsCard = [];

  const formData = await req.formData();

  const filters = formData.getAll("filter");
  if (filters.length != 0) {
    const filterss = filters?.map((item) => JSON.parse(item));
    messengers = filterss
      .filter((item) => item.category == 1)
      .map((item) => {
        return { messenger: item.id };
      });
    types = filterss
      .filter((item) => item.category == 2)
      .map((item) => {
        return { type: item.id };
      });
    subjects = filterss
      .filter((item) => item.category == 3)
      .map((item) => {
        return { subject: item.id };
      });
  }

  const regex = new RegExp(search, "i"); // i for case insensitive
  // Posts.find({ title: { $regex: regex } });

  // console.log("messengers------->", messengers);
  // console.log("types------->", types);
  // console.log("subjects------->", subjects);
  try {
    const { isConnected, message } = await connectToDB();
    const sorts = ["createdAt", "updatedAt", "members", "price"];
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }

    if (service == 0) {
      idsCard = await idCardModel
        .find({
          $and: [
            { isShow: true },
            { $or: messengers },
            { $or: types },
            { $or: subjects },
            { $or: [{ title: { $regex: regex } }, { id: { $regex: regex } }] },
          ],
        })
        .sort({ [`${sorts[sort]}`]: -1 })
        .skip(offset)
        .limit(limit)
        .populate("counter");
    } else {
      idsCard = await idCardModel
        .find({
          $and: [
            { isShow: true },
            { service },
            { $or: messengers },
            { $or: types },
            { $or: subjects },
            { $or: [{ title: { $regex: regex } }, { id: { $regex: regex } }] },
          ],
        })
        .sort({ [`${sorts[sort]}`]: -1 })
        .skip(offset)
        .limit(limit)
        .populate("counter");
    }

    const counter = await idCardModel.aggregate([
      {
        $group: {
          _id: "$service",
          // isShow: true,
          count: { $sum:  { $cond: { if: { $eq: ["$isShow", true] }, then: 1, else: 0 } }}, // this means that the count will increment by 1
        },
      },
    ]);

    let bookmarksId = [];
    if (mongoose.Types.ObjectId.isValid(userId)) {
      bookmarksId = await bookmarkModel.find({ user: userId });
    }

    return Response.json({
      message: "با موفقیت دریافت شد",
      status: 201,
      idsCard,
      bookmarksId,
      counter,
    });
  } catch (error) {
    console.log("error in get ids --->", error);
    return Response.json({ message: "خطای ناشناخته", status: 500 });
  }
}
