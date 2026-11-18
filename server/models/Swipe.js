
import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true
    },
    action: {
      type: String,
      enum: ["like", "pass"],
      required: true
    }
  },
  { timestamps: true }
);

// A profile can only be swiped once by this demo user.
swipeSchema.index({ profile: 1 }, { unique: true });

export default mongoose.model("Swipe", swipeSchema);
