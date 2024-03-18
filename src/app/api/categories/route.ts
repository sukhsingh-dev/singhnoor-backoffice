import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../lib/mongoose";
import { Category } from "@/models/category";

export const POST = async (req: Request) => {
  const {method} = req;
  
  await mongooseConnect();

  if(method == "POST") {
    const {categoryName, categoryBg, categoryImg, categoryAttributes} = await req.json()

    const categoryDoc = await Category.create({
      categoryName, categoryBg, categoryImg, categoryAttributes
    })

    return new NextResponse(categoryDoc)
  }
}

export const GET = async () => {
  try {
		await mongooseConnect();
		const data = await Category.find();
		return NextResponse.json(data);
	} catch (error) {
		console.log("Error in Category route handler", error);
		throw error;
	}
}