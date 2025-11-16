"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 5001;
// --------------------- MONGO CONNECTION -----------------------
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // <-- admin or user
});
const User = mongoose_1.default.model("User", userSchema);
const sweetSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
});
const Sweet = mongoose_1.default.model("Sweet", sweetSchema);
/* -------------------------------------------------------------
   ADMIN AUTH MIDDLEWARE
--------------------------------------------------------------*/
const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }
        req.admin = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
/* -------------------------------------------------------------
   SIGNUP (USER only)
--------------------------------------------------------------*/
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist)
            return res.status(400).json({ message: "User already exists" });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashed,
            role: "user",
        });
        await newUser.save();
        res.status(201).json({ message: "Signup success" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
/* -------------------------------------------------------------
   LOGIN (ADMIN or USER)
--------------------------------------------------------------*/
app.post("/api/login", async (req, res) => {
    const { email, password, role } = req.body; // role = user/admin
    try {
        const user = await User.findOne({ email, role });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
        res.json({
            name: user.name,
            role: user.role,
            token,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
/* -------------------------------------------------------------
   ADD SWEET (ADMIN)
--------------------------------------------------------------*/
app.post("/api/sweets", adminAuth, async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        const sweet = new Sweet({ name, price, quantity });
        await sweet.save();
        res.json({ message: "Sweet added", sweet });
    }
    catch (err) {
        res.status(500).json({ message: "Error adding sweet" });
    }
});
/* -------------------------------------------------------------
   UPDATE SWEET (ADMIN)
--------------------------------------------------------------*/
app.put("/api/sweets/:id", adminAuth, async (req, res) => {
    try {
        const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({ message: "Sweet updated", sweet: updated });
    }
    catch (err) {
        res.status(500).json({ message: "Error updating sweet" });
    }
});
/* -------------------------------------------------------------
   DELETE SWEET (ADMIN)
--------------------------------------------------------------*/
app.delete("/api/sweets/:id", adminAuth, async (req, res) => {
    try {
        await Sweet.findByIdAndDelete(req.params.id);
        res.json({ message: "Sweet deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting sweet" });
    }
});
/* -------------------------------------------------------------
   PURCHASE SWEET (USER or ADMIN)
--------------------------------------------------------------*/
app.post("/api/sweets/:id/purchase", async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);
        if (!sweet)
            return res.status(404).json({ message: "Sweet not found" });
        if (sweet.quantity <= 0)
            return res.status(400).json({ message: "Out of stock" });
        sweet.quantity -= 1;
        await sweet.save();
        res.json({ message: "Sweet purchased", sweet });
    }
    catch (err) {
        res.status(500).json({ message: "Error purchasing" });
    }
});
/* -------------------------------------------------------------
   RESTOCK SWEET (ADMIN)
--------------------------------------------------------------*/
app.post("/api/sweets/:id/restock", adminAuth, async (req, res) => {
    const { amount } = req.body;
    try {
        const sweet = await Sweet.findById(req.params.id);
        if (!sweet)
            return res.status(404).json({ message: "Sweet not found" });
        sweet.quantity += Number(amount);
        await sweet.save();
        res.json({ message: "Sweet restocked", sweet });
    }
    catch (err) {
        res.status(500).json({ message: "Error restocking" });
    }
});
/* -------------------------------------------------------------
   SERVER START
--------------------------------------------------------------*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
