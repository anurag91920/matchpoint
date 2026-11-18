
import express from "express";
import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

const router = express.Router();

// GET /feed
router.get("/", async (req, res) => {
  try {
    const swipedProfiles = await Swipe.find().distinct("profile");

    const profiles = await Profile.find({
      _id: { $nin: swipedProfiles }
    })
      .select("name age city college bio image interests")
      .lean();

    res.status(200).json({
      success: true,
      count: profiles.length,
      profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch feed",
      error: error.message
    });
  }
});

export default router;
