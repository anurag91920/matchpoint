
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import Profile from "./models/Profile.js";
import profiles from "./data/profiles.js";

dotenv.config();

// Use Google DNS for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Remove previous demo profiles and their swipes.
    const oldProfiles = await Profile.find().select("_id");
    const Swipe = (await import("./models/Swipe.js")).default;

    await Swipe.deleteMany({
      profile: { $in: oldProfiles.map((p) => p._id) }
    });

    await Profile.deleteMany({});

    await Profile.insertMany(profiles);

    console.log(`${profiles.length} profiles inserted successfully!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed Error:", error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

seedDatabase();
