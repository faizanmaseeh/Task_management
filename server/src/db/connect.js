import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("connecting to mongodb...");
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Failed to connect mongodb", error.message);
    process.exit(1);
  }
};

export default connect;
