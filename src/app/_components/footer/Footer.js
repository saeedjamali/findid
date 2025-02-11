import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <div className="w-full bg-header text-white text-center text-[12px] my-4 flex items-center justify-center gap-2 h-4">
        <Link href="https://web.bale.ai/@findid" className="w-6 h-6" target="_blank">
          <Image
            src={"/images/messengers/icons/bale-ic.ico"}
            width={100}
            height={100}
            alt="bale"
          />
        </Link>
        <Link href="https://t.me/findidir" className="w-6 h-6" target="_blank">
          <Image
            src={"/images/messengers/icons/telegram-ic.ico"}
            width={100}
            height={100}
            alt="telegram"
          />
        </Link>
        <Link href="https://www.instagram.com/findidir" className="w-6 h-6" target="_blank">
          <Image
            src={"/images/messengers/icons/instagram-ic.ico"}
            width={100}
            height={100}
            alt="instagram"
          />
        </Link>
      </div>
      <div className="w-full bg-header text-white text-center text-[12px] my-2 flex items-center justify-center gap-2 h-4">
        تولید شده با{" "}
        <span>
          <FaHeart className="text-red-600" />
        </span>
        برای مردم عزیز ایران
      </div>
    </div>
  );
}

export default Footer;
