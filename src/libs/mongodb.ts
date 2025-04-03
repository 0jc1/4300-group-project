const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://admin:<password>@cluster0.ntszore.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectMongoDB = async () => {
  if (mongoose.connection.readyState >= 1) {
      return;
  }
  try {
      await mongoose.connect(MONGODB_URI, {
          dbName: "UGAitems",
      });
      console.log("MongoDB connected");
  } catch (error) {
      console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;