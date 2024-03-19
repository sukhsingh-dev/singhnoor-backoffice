import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  gender: { type: Array, required: true },
  additionalInfo: { type: String },
  stock: { type: Number },
});

export const Product = models.Product || model('Product', ProductSchema); 