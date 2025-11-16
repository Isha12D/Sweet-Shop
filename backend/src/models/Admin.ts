// import mongoose, { Schema, Document } from "mongoose";
// import bcrypt from "bcryptjs";

// export interface IAdmin extends Document {
//   name: string;
//   email: string;
//   password: string;
//   comparePassword(candidate: string): Promise<boolean>;
// }

// const AdminSchema = new Schema<IAdmin>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true }
// });

// // Hash password
// AdminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password
// AdminSchema.methods.comparePassword = function (candidate: string) {
//   return bcrypt.compare(candidate, this.password);
// };

// export default mongoose.model<IAdmin>("Admin", AdminSchema);
