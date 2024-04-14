import { model, Schema, models } from "mongoose";

const AttributeSchema = new Schema({
  attributeName: { type: String, required: true }, 
  attributeOptions: { type: Array, required: true },
}, {
  timestamps: true,
});

export const Attribute = models.Attribute || model('Attribute', AttributeSchema); 