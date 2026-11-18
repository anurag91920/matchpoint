
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    city: String,
    college: String,
    bio: String,
    image: String,
    interests: [String],

    // Internal demo data.
    // Never send this field in the public feed.
    likedCurrentUser: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
