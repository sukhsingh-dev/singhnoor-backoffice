import { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
  categoryName: { type: String, required: true }, 
  categoryBg: { type: String, required: true }, 
  categoryImg: { type: String, required: true }, 
  categoryAttributes: { type: Array, required: true }
});

export const Category = models.Category || model('Category', CategorySchema); 