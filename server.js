import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";



import questionsRouter from "./routes/questions.js";
import usersRouter from "./routes/users.js";
import answeredQuestions from "./routes/answeredQuestions.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB qoşuldu"))
  .catch(err => console.error("❌ MongoDB xətası:", err));

// API route
app.use("/api/questions", questionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/answeredQuestions", answeredQuestions);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda işləyir`));
