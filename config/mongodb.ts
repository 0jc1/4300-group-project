import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) { 
    // return when already connected
    return;
  }

  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      uri = "mongodb+srv://admin:1234password1234@cluster0.rvm2inn.mongodb.net/";
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("Error connecting to MongoDB:", (error as Error).message);
  }
};

export default connectMongoDB;