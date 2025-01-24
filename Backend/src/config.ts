import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env") })

export const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
}

if (!config.JWT_SECRET || !config.MONGO_URL) {
  console.error("Missing required environment variables. Please check your .env file.")
  process.exit(1)
}