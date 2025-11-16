// import { Request, Response } from "express";
// import User from "../models/Users";
// import jwt from "jsonwebtoken";

// export const signup = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const user = new User({ name, email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

//     res.status(201).json({ user: { name, email }, token });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

//     res.status(200).json({ user: { name: user.name, email }, token });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };
