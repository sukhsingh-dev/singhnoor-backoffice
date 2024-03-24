import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  productCategory: { type: Object, required: true },
  productTitle: {type: String, required: true},
  productGender: { type: Array, required: true },
  productPrice: {type: Number, required: true},
  productDescription: {type: String, required: true},
  productAdditional: {type: String, required: true},
  productImagesArray: [{ type: String, required: true }],
  productStock: {type: Number},
  productTags: { type: Array, required: true },
  productSize: { type: Array, required: true },
  productMaterial: { type: Array, required: true },
  productColors: { type: Array, required: true },
  productWork: { type: Array, required: true }
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema); 