import mongoose from "mongoose";

const startDB = async () => {
  try {
    const db = process.env.MONGODB_URL || "mongodb://localhost:27017/splitbill";
    mongoose.connect(db).then(() => {
      console.log("Connected to database");
    });
  } catch (err) {
    console.error(err);
  }
};

export default startDB;
