"use client";

import { UploadButton } from "../../utils/uploadthing";

type imgInfoFunc = (info: string) => void

interface UploadBtnType {
  imgInfo: imgInfoFunc,
  imgState: (info: string) => void
}

export default function SnUploadButton({ imgInfo, imgState }: UploadBtnType) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onUploadBegin={() => imgState("begin")}
      onClientUploadComplete={(res) => {
        // console.log("Files: ", res);
        // alert("Upload Completed");
        imgInfo(res[0].url)
        imgState("complete")
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}