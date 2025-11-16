// import { Request, Response } from "express";
// import Sweet from "../models/Sweet";

// // ADD NEW SWEET
// export const addSweet = async (req: Request, res: Response) => {
//   try {
//     const sweet = new Sweet(req.body);
//     await sweet.save();
//     res.json(sweet);
//   } catch (err) {
//     res.status(400).json({ message: "Error adding sweet", err });
//   }
// };

// // UPDATE SWEET
// export const updateSweet = async (req: Request, res: Response) => {
//   try {
//     const sweet = await Sweet.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(sweet);
//   } catch (err) {
//     res.status(400).json({ message: "Error updating sweet", err });
//   }
// };

// // DELETE SWEET (Admin only)
// export const deleteSweet = async (req: Request, res: Response) => {
//   try {
//     await Sweet.findByIdAndDelete(req.params.id);
//     res.json({ message: "Sweet deleted" });
//   } catch (err) {
//     res.status(400).json({ message: "Error deleting sweet", err });
//   }
// };

// // PURCHASE (Decrease quantity)
// export const purchaseSweet = async (req: Request, res: Response) => {
//   try {
//     const sweet = await Sweet.findById(req.params.id);
//     if (!sweet) return res.status(404).json({ message: "Sweet not found" });

//     if (sweet.quantity <= 0) {
//       return res.status(400).json({ message: "Out of stock" });
//     }

//     sweet.quantity -= 1;
//     await sweet.save();

//     res.json(sweet);
//   } catch (err) {
//     res.status(400).json({ message: "Purchase error", err });
//   }
// };

// // RESTOCK (Admin only)
// export const restockSweet = async (req: Request, res: Response) => {
//   try {
//     const sweet = await Sweet.findById(req.params.id);
//     if (!sweet) return res.status(404).json({ message: "Sweet not found" });

//     const amount = req.body.amount ?? 1;
//     sweet.quantity += amount;
//     await sweet.save();

//     res.json(sweet);
//   } catch (err) {
//     res.status(400).json({ message: "Restock error", err });
//   }
// };
