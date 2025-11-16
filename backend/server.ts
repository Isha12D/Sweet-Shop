import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// --------------------- MONGO CONNECTION -----------------------
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

/* -------------------------------------------------------------
   USER & ADMIN SCHEMA
--------------------------------------------------------------*/
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // <-- admin or user
});

const User = mongoose.model<IUser>("User", userSchema);

/* -------------------------------------------------------------
   SWEET SCHEMA
--------------------------------------------------------------*/
interface ISweet extends mongoose.Document {
  name: string;
  price: number;
  quantity: number;
}

const sweetSchema = new mongoose.Schema<ISweet>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
});

const Sweet = mongoose.model<ISweet>("Sweet", sweetSchema);

/* -------------------------------------------------------------
   ADMIN AUTH MIDDLEWARE
--------------------------------------------------------------*/
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    (req as any).admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* -------------------------------------------------------------
   SIGNUP (USER only)
--------------------------------------------------------------*/
app.post("/api/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "Signup success" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* -------------------------------------------------------------
   LOGIN (ADMIN or USER)
--------------------------------------------------------------*/
app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password, role } = req.body; // role = user/admin

  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    res.json({
      name: user.name,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* -------------------------------------------------------------
   ADD SWEET (ADMIN)
--------------------------------------------------------------*/
app.post("/api/sweets", adminAuth, async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;

  try {
    const sweet = new Sweet({ name, price, quantity });
    await sweet.save();
    res.json({ message: "Sweet added", sweet });
  } catch (err) {
    res.status(500).json({ message: "Error adding sweet" });
  }
});

/* -------------------------------------------------------------
   UPDATE SWEET (ADMIN)
--------------------------------------------------------------*/
app.put("/api/sweets/:id", adminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ message: "Sweet updated", sweet: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating sweet" });
  }
});

/* -------------------------------------------------------------
   DELETE SWEET (ADMIN)
--------------------------------------------------------------*/
app.delete(
  "/api/sweets/:id",
  adminAuth,
  async (req: Request, res: Response) => {
    try {
      await Sweet.findByIdAndDelete(req.params.id);
      res.json({ message: "Sweet deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting sweet" });
    }
  }
);

/* -------------------------------------------------------------
   PURCHASE SWEET (USER or ADMIN)
--------------------------------------------------------------*/
app.post("/api/sweets/:id/purchase", async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity <= 0)
      return res.status(400).json({ message: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: "Sweet purchased", sweet });
  } catch (err) {
    res.status(500).json({ message: "Error purchasing" });
  }
});

/* -------------------------------------------------------------
   RESTOCK SWEET (ADMIN)
--------------------------------------------------------------*/
app.post(
  "/api/sweets/:id/restock",
  adminAuth,
  async (req: Request, res: Response) => {
    const { amount } = req.body;

    try {
      const sweet = await Sweet.findById(req.params.id);
      if (!sweet)
        return res.status(404).json({ message: "Sweet not found" });

      sweet.quantity += Number(amount);
      await sweet.save();

      res.json({ message: "Sweet restocked", sweet });
    } catch (err) {
      res.status(500).json({ message: "Error restocking" });
    }
  }
);

/* -------------------------------------------------------------
   SERVER START
--------------------------------------------------------------*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
