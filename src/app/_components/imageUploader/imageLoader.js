"use client";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ImageLoader({ imageUrl, code, size, rounded }) {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getImage = async () => {
      try {
        const response = await fetch(`/api/ads/image/${imageUrl}/${code}`);
        // const data =  response;
        // console.log("data from image Loader", response)
        setImage(response.url);
      } catch (error) {
        toast.error("خطا زمان دریافت تصاویر ");
        console.log("whats that error image loader---->", error);
      }
    };
    getImage();
    setIsLoading(false);
  }, []);
  return (
    <div>
      {/* <img
          src={image}
          alt=""
          width="100"
          height="100"
          className="w-6 h-6 rounded-full"
        /> */}

      <LazyLoadImage
        effect="blur"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: {
            transitionDelay: "1s",
            width: "100%",
            height: "100%",
          },
        }}
        style={{
          width: `${size || "full"}`,
          height: `${size || "full"}`,
          objectFit: "fill",
        }}
        src={image}
        className={` rounded-t-lg md:rounded-tr-lg md:rounded-br-lg md:rounded-t-none  object-fill ${rounded}  ${
          size ? `h-[${size}] w-[${size}]` : "h-64 w-screen "
        }  `}
        width={100}
        height={100}
        alt="profile"
        // format="webp"
      />
    </div>
  );
}

export default ImageLoader;
