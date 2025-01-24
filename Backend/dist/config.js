"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
exports.config = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
};
if (!exports.config.JWT_SECRET || !exports.config.MONGO_URL) {
    console.error("Missing required environment variables. Please check your .env file.");
    process.exit(1);
}
