import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Category } from "@/models/category";
 
export async function PUT(request: Request, { params }: any) {
    const { id } = params;
    const { categoryName, categoryBg, categoryImg, categoryAttributes } = await request.json();
    await mongooseConnect();

    await Category.findByIdAndUpdate(id, { categoryName, categoryBg, categoryImg, categoryAttributes});
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
 
export async function GET(request: Request, { params }: any) {
    const { id } = params;
    await mongooseConnect();

    const category = await Category.findOne({ _id: id });
    return NextResponse.json({ category }, { status: 200 });

}

