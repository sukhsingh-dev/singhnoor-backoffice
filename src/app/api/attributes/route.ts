import { Attribute } from "@/models/attribute";
import { mongooseConnect } from "../../../../lib/mongoose";
import { NextResponse, NextRequest } from "next/server"
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

export const GET = async (request: NextRequest) => {
  const attribute = request.nextUrl.searchParams;
  const id= attribute.get("id")
  let data

  try {
		await mongooseConnect();
    if (id) {
      data = await Attribute.findOne({ _id: id });

    } else {
      data = await Attribute.find();
    }
		return NextResponse.json(data);
	} catch (error) {
		console.log("Error in Attribute route handler", error);
		throw error;
	}
}

export async function DELETE(request: NextRequest) {
  const attribute = request.nextUrl.searchParams;
  const id= attribute.get("id");
  await mongooseConnect();
  
  await Attribute.deleteOne({_id: id});
  return NextResponse.json({ message: "Attribute Deleted" }, { status: 200 });
}