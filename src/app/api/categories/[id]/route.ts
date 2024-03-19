import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Category } from "@/models/category";
import { deleteImage } from "@/utils/deleteImage";

export async function PUT(request: Request, { params }: any) {
    const { id } = params;
    const { categoryName, categoryBg, categoryImg, categoryAttributes, currentImagePath } = await request.json();
    await mongooseConnect();

    if(currentImagePath != categoryImg) {
      deleteImage(currentImagePath)
    }

    await Category.findByIdAndUpdate(id, { categoryName, categoryBg, categoryImg, categoryAttributes});
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
 
export async function GET(request: Request, { params }: any) {
    const { id } = params;
    await mongooseConnect();

    const category = await Category.findOne({ _id: id });
    return NextResponse.json({ category }, { status: 200 });

}

export async function DELETE(request: Request, { params }: any) {
    const { id } = params;
    await mongooseConnect();

    const imgPath = await Category.findOne({_id: id},{categoryImg: 1})
    deleteImage(imgPath.categoryImg)
    
    await Category.deleteOne({_id: id});
    return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
}

