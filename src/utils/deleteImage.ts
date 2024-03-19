import { UTApi } from "uploadthing/server";

const extractImageKey = (imageURL: string): string => {
  const parts = imageURL.split('/f/');
  const imgName = parts[1];
  return imgName
}

export const deleteImage = async (imageKey: string) => {
  const utapi = new UTApi();
  const imgNameKey =  extractImageKey(imageKey);

  const imgRes = await utapi.deleteFiles(imgNameKey);
  console.log("The Image delete status", imgRes)
}