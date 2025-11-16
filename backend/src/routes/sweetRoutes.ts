// import express, { Request, Response, NextFunction } from "express";
// import {
//   addSweet,
//   updateSweet,
//   deleteSweet,
//   purchaseSweet,
//   restockSweet,
// } from "../controllers/sweetController";

// import { adminAuth } from "../middleware/adminAuth";

// const router = express.Router();

// // ADMIN PROTECTED ROUTES
// router.post("/sweets", adminAuth, addSweet);
// router.put("/sweets/:id", adminAuth, updateSweet);
// router.delete("/sweets/:id", adminAuth, deleteSweet);

// // PUBLIC / USER ACTIONS
// router.post("/sweets/:id/purchase", purchaseSweet);

// // ADMIN RESTOCK
// router.post("/sweets/:id/restock", adminAuth, restockSweet);

// export default router;
