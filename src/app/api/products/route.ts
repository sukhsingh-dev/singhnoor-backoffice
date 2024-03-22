import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "@/models/products";

export const POST = async (req: Request) => {
  try {
    await mongooseConnect();
    const {
      productCategory,
      productTitle,
      productGender,
      productPrice,
      productDescription,
      productAdditional,
      productStock,
      productTags,
      productImagesArray,
      productSize,
      productMaterial,
      productColors,
      productWork
    } = await req.json()

    const productDoc = await Product.create({
      productCategory,
      productTitle,
      productGender,
      productPrice,
      productDescription,
      productAdditional,
      productStock,
      productTags,
      productImagesArray,
      productSize,
      productMaterial,
      productColors,
      productWork
    })

    return new NextResponse(productDoc,{ status: 200 })
  } catch (error) {
		console.log("Error in Category route handler", error);
		throw error;
	}
}

export const GET = async () => {
  try {
		await mongooseConnect();
		const data = await Product.find();
		return NextResponse.json(data);
	} catch (error) {
		console.log("Error in Category route handler", error);
		throw error;
	}
}