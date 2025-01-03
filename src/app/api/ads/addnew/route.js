import { authenticateUser } from "@/utils/authenticateMe";
import connectToDB from "@/utils/db";
import { getRndInteger } from "@/utils/random";
import idCardModel from "@/models/IDCard/IDCard";

import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const { isConnected, message } = await connectToDB();
  if (!(await authenticateUser())) {
    return Response.json({ message: "دسترسی غیر مجاز", status: 500 });
  }
  const formData = await req.formData();
  console.log("HiiiiiiBack--->", formData);
  const profile = formData.getAll("profile");

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

  let limited = 1;
  let quantity = 0;

  try {
    //Buffer
    if (
      !registerId ||
      !ownerIdCard ||
      !messenger ||
      !type ||
      !subject ||
      !id ||
      !members
    ) {
      return Response.json(
        {
          message: "لطفا اطلاعات بطور کامل بررسی و مجدد ارسال شود",
        },
        { status: 401 }
      );
    }

    const newAds = await idCardModel.create({
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
      price,
      id,
      createDate,
      isShowPhoneOwnerIdCard,
      contactWithPhone,
      isContactWithId,
      contactWithId,
      contactTypeMessenger,
    });

    profile?.map(async (img, index) => {
      const buffer = Buffer.from(await img.arrayBuffer());
      const filename =
        Date.now() + "" + getRndInteger(10000, 100000) + img.name;
      const imgPath = path.join(process.cwd(), "upload/profile/" + filename);
      await writeFile(imgPath, buffer);

      await idCardModel.updateOne(
        { _id: newAds._id },
        {
          $push: {
            // imageContractList: `${process.env.LOCAL_URL}/upload/contract/${filename}`,
            profile: `${filename}`,
          },
        }
      );
    });

    if (newAds) {
      return Response.json({
        message: " آگهی با موفقیت ثبت شد",
        status: 201,
      });
    }
  } catch (error) {
    console.log("error in api add image>>", error);
    return Response.json({ message: "خطای ناشناخته", status: 501 });
  }

  return Response.json({ message: "خطا در ارسال اطلاعات", status: 401 });
}
