import connectToDB from "@/utils/db";
import idCardModel from "@/models/IDCard/IDCard";
import userModel from "@/models/base/User";
import { authenticateUser } from "@/utils/authenticateMe";
import { getRndInteger } from "@/utils/random";
import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import fs from "fs";
export async function PUT(req) {
  const { isConnected, message } = await connectToDB();
  const isAuth = await authenticateUser();
  if (!isAuth) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }
  const formData = await req.formData();

  const profile = formData.getAll("profile");

  const service = formData.get("service");
  const isAdmin = formData.get("isAdmin");
  const ownerIdCardPhone = formData.get("ownerIdCardPhone"); //? ثبت کننده آگهی
  const adsId = formData.get("adsId"); //?آیدی آگهی
  const registerId = formData.get("registerId"); //? ثبت کننده آگهی
  let ownerIdCard = formData.get("ownerIdCard"); //? مالک آگهی
  const isOwnerId = formData.get("isOwnerId");
  const ownerIdPhone = formData.get("ownerIdPhone"); //? مالک آیدی
  //   const code = formData.get("code");
  const province = formData.get("province");
  const city = formData.get("city");
  //   const messenger = formData.get("messenger");
  //   const type = formData.get("type");
  //   const subject = formData.get("subject");
  const title = formData.get("title");
  const description = formData.get("description");
  const members = formData.get("members");
  const agreedPrice = formData.get("agreedPrice");
  const price = formData.get("price");
  const discount = formData.get("discount");
  const statusAds = formData.get("statusAds");
  const createDate = formData.get("createDate");
  //   const id = formData.get("id");
  const isShowPhoneOwnerIdCard = formData.get("isShowPhoneOwnerIdCard");
  const contactWithPhone = formData.get("contactWithPhone");
  const removedImage = formData.get("removedImage");
  const isContactWithId = formData.get("isContactWithId");
  const contactWithId = formData.get("contactWithId");
  const contactTypeMessenger = formData.get("contactTypeMessenger");

  try {
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }
    let updateAds = {};
    let userFound = await userModel.findOne({ _id: registerId });
    if (userFound.role == "ADMIN" && isAuth.role == "ADMIN") {
      updateAds = await idCardModel.findOneAndUpdate(
        { _id: adsId },
        {
          service,
          registerId,
          isOwnerId,
          ownerIdPhone,
          province,
          city,
          title,
          description,
          members,
          agreedPrice,

          price: agreedPrice == "true" ? 0 : price,
          createDate,
          isShowPhoneOwnerIdCard,
          contactWithPhone,
          isContactWithId,
          contactWithId,
          contactTypeMessenger,
          registerAdsWith: isAdmin && isAuth.role == "ADMIN" ? "ADMIN" : "USER",
          discount: agreedPrice == "true" ? 0 : discount,
          status: statusAds,
          isShow: statusAds == 2 || statusAds == 3 ? false : true,
        }
      );
      if (removedImage == "true") {
        updateAds = await idCardModel.findOneAndUpdate(
          { _id: adsId },
          {
            profile: [],
            thumbnail: [],
          }
        );
      }
    }

    if (userFound.role == "USER" && userFound.phone == isAuth.phone) {
      updateAds = await idCardModel.findOneAndUpdate(
        { $and: [{ _id: adsId }, { ownerIdCard: userFound._id }] },
        {
          service,
          registerId,
          isOwnerId,
          ownerIdPhone,
          province,
          city,
          title,
          description,
          members,

          agreedPrice,
          price: agreedPrice == "true" ? 0 : price,
          createDate,
          isShowPhoneOwnerIdCard,
          contactWithPhone,
          isContactWithId,
          contactWithId,
          contactTypeMessenger,
          registerAdsWith: isAdmin && isAuth.role == "ADMIN" ? "ADMIN" : "USER",
          discount: agreedPrice == "true" ? 0 : discount,
          status: statusAds,
          isShow: statusAds == 2 || statusAds == 3 ? false : true,
        }
      );

      if (removedImage == "true") {
        updateAds = await idCardModel.findOneAndUpdate(
          { $and: [{ _id: adsId }, { ownerIdCard: userFound._id }] },
          {
            profile: [],
            thumbnail: [],
          }
        );
      }
    }

    profile?.map(async (img, index) => {
      const buffer = Buffer.from(await img.arrayBuffer());
      const filename =
        Date.now() + "" + getRndInteger(10000, 100000) + img.name;
      const imgPath = path.join(process.cwd(), "upload/profile/" + filename);
      await writeFile(imgPath, buffer);
      const metadata = await sharp(imgPath).metadata();
      let percent = metadata.width > 1000 ? 40 : 50;
      // Calculate new dimensions
      const newWidth = Math.round(metadata.width * (percent / 100));
      const newHeight = Math.round(metadata.height * (percent / 100));
      const webpName = filename.replace(".jpg", ".webp");
      // await writeFile(thumbnailpath, buffer);
      if (fs.existsSync(imgPath)) {
        const outputPath = path.join(
          process.cwd(),
          "upload/thumbnail/" + webpName
        );
        const out = await sharp(imgPath)
          .resize(newWidth, newHeight) // Resize based on percentage
          .toFormat("webp", {
            quality: 75, // Reduce quality to get a smaller size
            effort: 6, // Compression effort (1-6, higher is better)
          })
          .toFile(outputPath);
      }
      await idCardModel.updateOne(
        { _id: adsId },
        {
          profile: `${filename}`,
          thumbnail: `${webpName}`,

          // $push: {
          //   // imageContractList: `${process.env.LOCAL_URL}/upload/contract/${filename}`,
          //   profile: `${filename}`,
          // },
        }
      );
    });

    // return Response.json({ message: "کاربری با این شماره قبلا ثبت نام نموده است", status: 401, foundedUser });
    if (!updateAds) {
      return Response.json({
        message: "خطا در حذف آگهی",
        status: 401,
      });
    }

    // const userIsActive = await userModel.findOneAndUpdate({ _id: user }, { isActive: 0 });
    return Response.json({
      message: "آگهی با موفقیت بروز شد",
      status: 200,
    });
  } catch (error) {
    console.log("Error ->", error);
    return Response.json({ message: "خطای ناشناخته !!!" });
  }
}
