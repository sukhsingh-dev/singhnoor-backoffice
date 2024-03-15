"use client";

import { UploadButton } from "../../utils/uploadthing";

type imgInfoFunc = (info: string) => void

interface UploadBtnType {
  imgInfo: imgInfoFunc
}

export default function SnUploadButton({ imgInfo }: UploadBtnType) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        // alert("Upload Completed");
        imgInfo(res[0].url)
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}