import OtpModel from "@/models/base/Otp";
import userModel from "@/models/base/User";
import { generateRefreshToken, valiadtePhone } from "@/utils/auth";
import connectToDB from "@/utils/db";

export async function POST(req) {
  const body = await req.json();
  const { phone, code } = body;
  // console.log(body);
  if (!phone) {
    throw new Error("phone is not corrected...");
  }
  const isValidPhone = valiadtePhone(phone);

  if (!isValidPhone) {
    return Response.json({
      message: "شماره موبایل یا رمز عبور نامعتبر می باشد",
      status: 419,
    });
  }

  try {
    const { isConnected } = await connectToDB();
    if (!isConnected) {
      return Response.json({ message: "خطا در اتصال به پایگاه", status: 500 });
    }
    const otp = await OtpModel.findOne({ phone, code });

    if (otp) {
      const date = new Date();
      const now = date.getTime();

      if (otp.expTime > now) {
        let user = await userModel.findOne({ phone });
        if (user?.isBan) {
          return Response.json({
            message: "این کاربر/نقش مسدود شده است",
            status: 422,
          });
        }
        if (!user) {
          user = await userModel.create({ phone, role: "USER",identifier:phone });
        }

        const refreshToken = await generateRefreshToken({
          phone,
          role: user?.role,
        });
        await userModel.findOneAndUpdate(
          { $and: [{ phone }, { role: user?.role }] },
          {
            $set: {
              refreshToken,
            },
          }
        );
        const headers = new Headers();
      
        headers.append(
          "Set-Cookie",
          `refresh-token=${refreshToken};path=/;httpOnly=true;`
        );

        return Response.json(
          { message: "کد صحیح می باشد", status: 200 },
          {
            headers,
          }
        );
      } else {
        return Response.json({ message: "کد منقضی شده است", status: 410 });
      }
    } else {
      return Response.json({ message: "کد اشتباه است", status: 409 });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Unknown Error" }, { status: 500 });
  }
}
