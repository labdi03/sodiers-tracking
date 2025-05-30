import { Request, Response } from 'express';
import express from "express";
import Soldier from "../models/Soldier";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { id, firstName, lastName, unit, grade, bloodGroup } = req.body;
    const newSoldier = new Soldier({ id, firstName, lastName, unit, grade, bloodGroup });
    await newSoldier.save();
    res.status(201).json({ message: "Soldier added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add soldier", details: error });
  }
});

export default router;
