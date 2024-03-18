import { NextResponse } from "next/server"
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Category } from "@/models/category";
 
// export async function PUT(request, { params }) {
//     const { id } = params;
//     const { newName: name, newImage: image, newPrice: price, newCategory: category } = await request.json();
//     await connectMongoDB();
//     await Product.findByIdAndUpdate(id, { name, image, price, category});
//     return NextResponse.json({ message: "Product updated" }, { status: 200 });
// }
 
export async function GET(request: Request, { params }: any) {
    const { id } = params;
    await mongooseConnect();

    const category = await Category.findOne({ _id: id });
    return NextResponse.json({ category }, { status: 200 });

}

