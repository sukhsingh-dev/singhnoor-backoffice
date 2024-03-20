"use client";

import { UploadButton } from "../../utils/uploadthing";

type imgInfoFunc = (info: string) => void

interface UploadBtnType {
  imgInfo: imgInfoFunc,
  imgState: (info: string) => void,
  imgArrayState?: Array<string>,
  imgArraySet?: (arrayList: Array<string>) => void
}

export default function SnUploadButton({ imgInfo, imgState, imgArrayState, imgArraySet }: UploadBtnType) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onUploadBegin={() => imgState("begin")}
      onClientUploadComplete={(res) => {
        // console.log("Files: ", res);
        // alert("Upload Completed");
        if (imgArrayState && imgArraySet) {
          let arrayList = imgArrayState;
          arrayList.push(res[0].url);
          imgArraySet(arrayList)
        } else {
          imgInfo(res[0].url)
        }
        imgState("complete")
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}