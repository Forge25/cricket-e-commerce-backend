import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running with TypeScript!");
});

// API Routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
