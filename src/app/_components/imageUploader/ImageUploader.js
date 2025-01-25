import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploading from "react-images-uploading";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import ImageLoader from "./imageLoader";

function ImageUploader({
  imageItems,
  onChange,
  maxNumber,
  acceptType,
  maxFileSize,
  user,
  setImageUrls,
  imageUrlList,
}) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <ImageUploading
        multiple
        value={imageItems}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={[acceptType]}
        maxFileSize={maxFileSize} // Byte
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <div className="flex flex-col w-full bg-blue-100 rounded-md px-4">
            {errors && (
              <div className="flex w-full">
                <div className="flex flex-col justify-between">
                  <div>
                    {errors && (
                      <div>
                        {errors.maxNumber && (
                          <span className="text-red-500 text-[14px]">
                            امکان بارگذاری حداکثر {maxNumber} تصویر وجود دارد
                          </span>
                        )}
                        {errors.acceptType && (
                          <span className="text-red-500 text-[14px]">
                            نوع فایل مجاز Jpg می باشد
                          </span>
                        )}
                        {errors.maxFileSize && (
                          <span className="text-red-500 text-[14px]">
                            حداکثر حجم فایل {maxFileSize / 1000} کیلوبایت می
                            باشد
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex  items-center justify-between w-full">
              <div className="flex justify-between  flex-1">
                <div className="flex gap-2">
                  {imageList?.length == 0 ? (
                    <span className="text-btn-orange text-[12px] font-shabnam">
                      {" "}
                      انتخاب نشده
                    </span>
                  ) : (
                    imageList?.map((image, index) => (
                      <div
                        key={index}
                        className="relative flex items-center justify-center w-28 h-28   "
                      >
                        <div className="flex-1 box-border flex items-center justify-center ">
                          <img
                            src={image?.data_url}
                            alt=""
                            width="100"
                            height="100"
                            className="w-24 h-24  rounded-md"
                          />
                          {/* {typeof image === "object" && image !== null ? (
                            <img
                              src={image?.data_url}
                              alt=""
                              width="100"
                              height="100"
                              className="w-24 h-24  rounded-md"
                            />
                          ) : (
                            <ImageLoader
                              imageUrl={image}
                              code={"profile"}
                              size={"128px"}
                            />
                          )} */}
                        </div>

                        {!result && (
                          <div className=" text-[12px]  w-24 absolute  bottom-1 flex items-center justify-center">
                            <button
                              className="bg-green-300 rounded-md p-[4px] text-white font-bold text-md"
                              onClick={() => {
                                onImageUpdate(index);
                              }}
                            >
                              <MdOutlineModeEdit />
                            </button>
                            <button
                              className="bg-red-300 rounded-md p-[4px] text-white font-bold text-md mr-2"
                              onClick={() => {
                                setIsLoading(false);
                                onImageRemove(index);
                              }}
                            >
                              <CiTrash />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div
                className={` flex items-start justify-center  cursor-pointer ${
                  isDragging ? "bg-orange-200" : null
                } `}
              >
                <div className=" flex-1 flex-center rounded-md ">
                  {imageItems?.length != maxNumber && (
                    <Button className="bg-transparent" onPress={onImageUpload}>
                      <FaCloudUploadAlt
                        className="text-xl text-blue-500"
                        {...dragProps}
                      />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUploader;
