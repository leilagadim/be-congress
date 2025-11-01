import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Bütün userleri gətir
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server xətası" });
  }
});

// Yeni user əlavə et
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Əlavə edilmə xətası" });
  }
});

export default router;
