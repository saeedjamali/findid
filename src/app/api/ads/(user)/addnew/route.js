import { authenticateUser } from "@/utils/authenticateMe";
import connectToDB from "@/utils/db";
import { getRndInteger } from "@/utils/random";
import idCardModel from "@/models/IDCard/IDCard";
import counterModel from "@/models/IDCard/Counter";
import idDraftModel from "@/models/IDCard/Draft";
import userModel from "@/models/base/User";

import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import fs from "fs";
export async function POST(req) {
  const { isConnected, message } = await connectToDB();
  const isAuth = await authenticateUser();
  if (!isAuth) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }
  const formData = await req.formData();

  const profile = formData.getAll("profile");

  const isAdmin = formData.get("isAdmin"); //? ثبت کننده آگهی
  const ownerIdCardPhone = formData.get("ownerIdCardPhone"); //? ثبت کننده آگهی
  const service = formData.get("service"); //? ثبت کننده آگهی
  const registerId = formData.get("registerId"); //? ثبت کننده آگهی
  let ownerIdCard = formData.get("ownerIdCard"); //? مالک آگهی
  const isOwnerId = formData.get("isOwnerId");
  const ownerIdPhone = formData.get("ownerIdPhone"); //? مالک آیدی
  const code = formData.get("code");
  const province = formData.get("province");
  const city = formData.get("city");
  const messenger = formData.get("messenger");
  const type = formData.get("type");
  const subject = formData.get("subject");
  const title = formData.get("title");
  const description = formData.get("description");
  const members = formData.get("members");
  const agreedPrice = formData.get("agreedPrice");
  const price = formData.get("price");
  const createDate = formData.get("createDate");
  const id = formData.get("id");
  const isShowPhoneOwnerIdCard = formData.get("isShowPhoneOwnerIdCard");
  const contactWithPhone = formData.get("contactWithPhone");
  const isContactWithId = formData.get("isContactWithId");
  const contactWithId = formData.get("contactWithId");
  const contactTypeMessenger = formData.get("contactTypeMessenger");

  let limited = 1;
  let quantity = 0;
  let userFound = null;
  if (isAdmin && isAuth.role == "ADMIN") {
    userFound = await userModel.findOne({ phone: ownerIdCardPhone });
    if (!userFound) {
      userFound = await userModel.create({
        phone: ownerIdCardPhone,
        identifier: ownerIdCardPhone,
      });
    }
    ownerIdCard = userFound?._id;
  }

  try {
    //Buffer
    if (
      !registerId ||
      !ownerIdCard ||
      !messenger ||
      !type ||
      !subject ||
      !id ||
      !members ||
      service == 0
    ) {
      return Response.json(
        {
          message: "لطفا اطلاعات بطور کامل بررسی و مجدد ارسال شود",
        },
        { status: 401 }
      );
    }

    const foundId = await idCardModel.findOne({
      $and: [{ id }, { messenger }, { isShow: true }],
    });
    if (foundId) {
      return Response.json(
        {
          message: "این آیدی تکراری می باشد و قبلا ثبت شده است",
        },
        { status: 401 }
      );
    }

    const maxCode = await idCardModel.find().sort({ code: -1 }).limit(1);

    const newAds = await idCardModel.create({
      service,
      registerId,
      ownerIdCard:
        isAdmin && isAuth.role == "ADMIN" ? userFound?._id : ownerIdCard,
      isOwnerId,
      ownerIdPhone,
      code:
        maxCode[0]?.code == 0 || !maxCode[0]?.code
          ? 10001
          : maxCode[0]?.code + 1,
      province,
      city,
      messenger,
      type,
      subject,
      title,
      description,
      members,
      agreedPrice,
      price: agreedPrice == "true" ? 0 : price,
      id,
      createDate,
      isShowPhoneOwnerIdCard,
      contactWithPhone,
      isContactWithId,
      contactWithId,
      contactTypeMessenger,
      registerAdsWith: isAdmin && isAuth.role == "ADMIN" ? "ADMIN" : "USER",
    });

    const addCounter = await counterModel.create({
      idCard: newAds,
      views: 0,
      bookmarks: 0,
    });

    await idCardModel.findOneAndUpdate(
      { _id: newAds._id },
      { counter: addCounter._id }
    );

    profile?.map(async (img, index) => {
      const buffer = Buffer.from(await img.arrayBuffer());
      const filename =
        Date.now() + "" + getRndInteger(10000, 100000) + img.name;
      const outputName = filename.replace(".jpg", ".webp");
      const imgPath = path.join(process.cwd(), "upload/profile/" + filename);

      await writeFile(imgPath, buffer);
      // await writeFile(thumbnailpath, buffer);
      if (fs.existsSync(imgPath)) {
        const outputPath = path.join(
          process.cwd(),
          "upload/thumbnail/" + outputName
        );
        const out = await sharp(imgPath)
          .resize(640, 480)
          .toFormat("webp")
          .toFile(outputPath);

        console.log("outputPath", outputPath);
        console.log("out", out);
      }
      await idCardModel.updateOne(
        { _id: newAds._id },
        {
          $push: {
            // imageContractList: `${process.env.LOCAL_URL}/upload/contract/${filename}`,
            profile: `${filename}`,
            thumbnail: `${outputName}`,
          },
        }
      );
    });

    if (newAds) {
      const findFraft = await idDraftModel.findOneAndDelete({ ownerIdCard });
      return Response.json({
        message: " آگهی با موفقیت ثبت شد",
        status: 205,
      });
    }
  } catch (error) {
    console.log("error in api add image>>", error);
    return Response.json({ message: "خطای ناشناخته", status: 501 });
  }

  return Response.json({ message: "خطا در ارسال اطلاعات", status: 401 });
}
