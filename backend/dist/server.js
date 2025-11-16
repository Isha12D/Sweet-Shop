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
const PORT = process.env.PORT || 5000;
// --- MongoDB connection ---
mongoose_1.default.connect(process.env.MONGO_URI || '', {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose_1.default.model('User', userSchema);
// --- Routes ---
// Signup
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
        res.status(201).json({ user: { name, email }, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
        res.status(200).json({ user: { name: user.name, email }, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
