import dotenv from "dotenv";

dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
};
