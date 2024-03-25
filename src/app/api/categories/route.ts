import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../lib/mongoose";
import { Category } from "@/models/category";
import { revalidateTag } from 'next/cache';
export const POST = async (req: Request) => {
  const {method} = req;
  
  await mongooseConnect();

  if(method == "POST") {
    const {categoryName, categoryBg, categoryImg, categoryAttributes, subCategory} = await req.json()

    const categoryDoc = await Category.create({
      categoryName, categoryBg, categoryImg, categoryAttributes, subCategory
    })

    return new NextResponse(categoryDoc,{ status: 200 })
  }
}

export const GET = async () => {
  try {
		await mongooseConnect();
		const data = await Category.find();
    revalidateTag('category');
		return NextResponse.json(data);
	} catch (error) {
		console.log("Error in Category route handler", error);
		throw error;
	}
}