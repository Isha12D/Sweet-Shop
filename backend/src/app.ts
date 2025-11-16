import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Sweet Shop API Running");
});

export default app;
