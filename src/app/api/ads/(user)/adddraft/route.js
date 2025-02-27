import { authenticateUser } from "@/utils/authenticateMe";
import connectToDB from "@/utils/db";
import { getRndInteger } from "@/utils/random";
import idDraftModel from "@/models/IDCard/Draft";

import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import fs from "fs";

export async function PUT(req) {
  if (!(await authenticateUser())) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }
  const { isConnected, message } = await connectToDB();
  const formData = await req.formData();
  const profile = formData.getAll("profile");

  const service = formData.get("service"); //? ثبت کننده آگهی
  const registerId = formData.get("registerId"); //? ثبت کننده آگهی
  const ownerIdCard = formData.get("ownerIdCard"); //? مالک آگهی
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

  try {
    //Buffer
    if (!id) {
      return Response.json(
        {
          message: "برای ذخیره پیش نویس حداقل باید یک آیدی معتبر درج شود",
        },
        { status: 401 }
      );
    }

    let foundId = await idDraftModel.findOneAndUpdate(
      { ownerIdCard },
      {
        service,
        registerId,
        ownerIdCard,
        isOwnerId,
        ownerIdPhone,
        code,
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
      }
    );

    if (!foundId) {
      foundId = await idDraftModel.create({
        id,
        service,
        registerId,
        ownerIdCard,
        isOwnerId,
        ownerIdPhone,
        code,
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
        createDate,
        isShowPhoneOwnerIdCard,
        contactWithPhone,
        isContactWithId,
        contactWithId,
        contactTypeMessenger,
      });
    }
    profile?.map(async (img, index) => {
      const buffer = Buffer.from(await img.arrayBuffer());
      const filename =
        Date.now() + "" + getRndInteger(10000, 100000) + img.name;
      const imgPath = path.join(process.cwd(), "upload/profile/" + filename);
      await writeFile(imgPath, buffer);
      const webpName = filename.replace(".jpg", ".webp");
      // await writeFile(thumbnailpath, buffer);
      if (fs.existsSync(imgPath)) {
        const outputPath = path.join(
          process.cwd(),
          "upload/thumbnail/" + webpName
        );
        const out = await sharp(imgPath)
          // .resize(640, 480) 
          .toFormat("webp")
          .toFile(outputPath);

       
      }
      await idDraftModel.updateOne(
        { _id: foundId._id },
        {
          $push: {
            // imageContractList: `${process.env.LOCAL_URL}/upload/contract/${filename}`,
            profile: `${filename}`,
            thumbnail: `${webpName}`,

          },
        }
      );
    });

    if (foundId) {
      return Response.json({
        message: " آگهی با موفقیت ذخیره شد",
        status: 201,
      });
    }
  } catch (error) {
    console.log("error in api add draft>>", error);
    return Response.json({
      message: "خطای ناشناخته",
      status: 501,
    });
  }

  return Response.json({ message: "خطا در ارسال اطلاعات", status: 401 });
}
