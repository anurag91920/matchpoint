
import express from "express";
import Swipe from "../models/Swipe.js";

const router = express.Router();

// GET /matches
router.get("/", async (req, res) => {
  try {
    const likedSwipes = await Swipe.find({
      action: "like"
    }).populate({
      path: "profile",
      match: { likedCurrentUser: true },
      select: "name age city college bio image interests"
    });

    const matches = likedSwipes
      .filter((swipe) => swipe.profile !== null)
      .map((swipe) => swipe.profile);

    res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch matches",
      error: error.message
    });
  }
});

export default router;
