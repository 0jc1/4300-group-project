const mongoose = require("mongoose");

const uri = "mongodb+srv://admin:<password>@cluster0.ntszore.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));