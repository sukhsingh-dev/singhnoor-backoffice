import { NextRequest, NextResponse } from "next/server"
import { mongooseConnect } from "../../../../lib/mongoose";
import { Carousel } from "@/models/carousel";
import { deleteImage } from "@/utils/deleteImage";

export const POST = async (req: Request) => {
  try {
    await mongooseConnect();
    const {
      slideTitle,
      slideLink,
      description,
      productImagesArray
    } = await req.json()

    const carouselDoc = await Carousel.create({
      slideTitle,
      slideLink,
      description,
      productImagesArray
    })

    return new NextResponse(carouselDoc,{ status: 200 })
  } catch (error) {
        console.log("Error in Category route handler", error);
        throw error;
    }
}

export const GET = async (req: NextRequest) => {
  const product= req.nextUrl.searchParams;
  const id= product.get("id")
  let data;
  try {
    await mongooseConnect();
    if (!id) {
      data = await Carousel.find().sort({ createdAt: -1 });
    } else {
      data = await Carousel.findById(id);
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    return NextResponse.json({ error: "Failed to fetch carousel data" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const attribute = request.nextUrl.searchParams;
  const id= attribute.get("id");
  await mongooseConnect();
  
  await Carousel.deleteOne({_id: id});
  return NextResponse.json({ message: "Slide Deleted" }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const attribute = request.nextUrl.searchParams;
  const id= attribute.get("id");
  await mongooseConnect();

  const { slideTitle, slideLink, description, productImagesArray } = await request.json();

  await Carousel.updateOne({ _id: id }, {
    slideTitle,
    slideLink,
    description,
    productImagesArray
  });

  return NextResponse.json({ message: "Slide Updated" }, { status: 200 });
}