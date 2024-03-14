import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "@/models/products";

export const POST = async (req: Request) => {
  const {method} = req;
  
  await mongooseConnect();
  
  if(method == "POST") {
    const {title, description, price} = await req.json()

    const productDoc = await Product.create({
      title, description, price
    })

    return new NextResponse(productDoc)
  }
}