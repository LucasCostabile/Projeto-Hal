import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoDBConection = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

export default mongoDBConection;
