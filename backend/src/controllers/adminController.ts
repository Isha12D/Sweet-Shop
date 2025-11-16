import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error creating admin", err });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(req.body.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token, name: admin.name });
  } catch (err) {
    res.status(500).json({ message: "Login error", err });
  }
};
