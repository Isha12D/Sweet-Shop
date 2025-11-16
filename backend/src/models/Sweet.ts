import mongoose, { Schema, Document } from "mongoose";

export interface ISweet extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  createdAt: Date;
}

const SweetSchema: Schema = new Schema<ISweet>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISweet>("Sweet", SweetSchema);
