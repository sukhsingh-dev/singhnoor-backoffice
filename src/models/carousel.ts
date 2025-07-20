import { model, Schema, models } from "mongoose";

const CarouselSchema = new Schema({
  slideTitle: { type: String, required: true },
  slideLink: { type: String, required: true },
  description: { type: String, required: true },
  productImagesArray: { type: Array, required: true },
}, {
  timestamps: true,
});

export const Carousel = models.Carousel || model('Carousel', CarouselSchema);