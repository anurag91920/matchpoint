
import express from "express";
import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

const router = express.Router();

// POST /swipe
router.post("/", async (req, res) => {
  try {
    const { profileId, action } = req.body;

    if (!mongoose.isValidObjectId(profileId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile ID"
      });
    }

    if (!["like", "pass"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be like or pass"
      });
    }

    const profile = await Profile.findById(profileId)
      .select("+likedCurrentUser");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    const existingSwipe = await Swipe.findOne({
      profile: profileId
    });

    if (existingSwipe) {
      return res.status(409).json({
        success: false,
        message: "This profile has already been swiped"
      });
    }

    await Swipe.create({
      profile: profileId,
      action
    });

    const isMatch =
      action === "like" && profile.likedCurrentUser === true;

    res.status(201).json({
      success: true,
      message: isMatch ? "It's a match!" : "Swipe recorded",
      isMatch,
      match: isMatch
        ? {
            id: profile._id,
            name: profile.name,
            age: profile.age,
            city: profile.city,
            image: profile.image
          }
        : null
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This profile has already been swiped"
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to record swipe",
      error: error.message
    });
  }
});

export default router;
