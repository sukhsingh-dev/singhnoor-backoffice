import { NextRequest, NextResponse } from "next/server"
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "@/models/products";
import { deleteImage } from "@/utils/deleteImage";

export const POST = async (req: Request) => {
  try {
    await mongooseConnect();
    const {
      productCategory,
      productSubCategory,
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
      productSubCategory,
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

export const GET = async (request: NextRequest) => {
  const product= request.nextUrl.searchParams;
  const id= product.get("id")
  const filters= product.get("filters")
  const category= product.get("category")

  console.log("Filters are",product)
  
  let data;

  try {
		await mongooseConnect();
    if(!filters) {
      if (!id) {
        data = await Product.find().sort({ updatedAt: -1 });
      } else {
        data = await Product.findOne({ _id: id });
      }
    } else {
      data = await Product.find({ 'productCategory.value' : category }).sort({ updatedAt: -1 });
    }
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.log("Error in Category route handler", error);
		throw error;
	}
}

export async function DELETE(request: NextRequest) {
  const product= request.nextUrl.searchParams;
  const id= product.get("id");
  await mongooseConnect();

  const imgPath = await Product.findOne({_id: id},{productImagesArray: 1})
  imgPath.productImagesArray.map((img: string) => {
    deleteImage(img)
  });
  
  await Product.deleteOne({_id: id});
  return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const product= request.nextUrl.searchParams;
  const id= product.get("id");

  const {
    productCategory,
    productSubCategory,
    productTitle,
    productGender,
    productPrice,
    productDescription,
    productAdditional,
    productStock,
    productTags,
    productImagesArray,
    currentImageArray,
    productSize,
    productMaterial,
    productColors,
    productWork
  } = await request.json()

  await mongooseConnect();

  currentImageArray.map((imgUrl: string) => {
    if(!productImagesArray.includes(imgUrl)) {
      deleteImage(imgUrl)
    }
  })

  await Product.findByIdAndUpdate(id, {
    productCategory,
    productSubCategory,
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
  });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}