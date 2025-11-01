import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Bütün sualları gətir
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server xətası" });
  }
});

// Yeni sual əlavə et
router.post("/", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: "Əlavə edilmə xətası" });
  }
});

export default router;
