import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    console.log("2-Connected to MongoDB");
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.log("Mongodb connection error , please make sure MongoDB is up and running", err);
      process.exit();       //what is exit-code
    });

  } catch (error) {
    console.log("something went wrong in connecting to db"+ error);
  }
}
