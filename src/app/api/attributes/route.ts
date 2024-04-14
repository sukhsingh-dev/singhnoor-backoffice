import { Attribute } from "@/models/attribute";
import { mongooseConnect } from "../../../../lib/mongoose";
import { NextResponse } from "next/server"
export const POST = async (req: Request) => {
  const {method} = req;
  
  await mongooseConnect();

  if(method == "POST") {
    const {attributeName, attributeOptions} = await req.json()

    const categoryDoc = await Attribute.create({
     attributeName, attributeOptions
    })
    return new NextResponse(categoryDoc,{ status: 200 })
  }
}

export const GET = async () => {
  try {
		await mongooseConnect();
		const data = await Attribute.find();
		return NextResponse.json(data);
	} catch (error) {
		console.log("Error in Attribute route handler", error);
		throw error;
	}
}