import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.Data_Base_Url || "");
    console.log("DataBase Connected");
  } catch (error) {
    console.log("Error while Connecting to the DataBase : ", error);
  }
};

export default ConnectDb;
