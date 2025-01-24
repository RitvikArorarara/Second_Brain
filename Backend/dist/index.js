"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //zod validation, hash the password
    const signupSchema = zod_1.z.object({
        username: zod_1.z.string().min(3).max(20),
        password: zod_1.z.string().min(6).max(20),
    });
    const parsedWithSuccess = signupSchema.safeParse(req.body);
    if (!parsedWithSuccess.success) {
        res.status(400).json({
            message: "Invalid format",
        });
        return;
    }
    const { username, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.UserModel.create({
            username,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "User created",
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists",
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({ username });
    if (existingUser) {
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (isPasswordCorrect) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id,
            }, config_1.config.JWT_SECRET);
            res.json({
                token,
                username: existingUser.username,
            });
        }
        else {
            res.status(403).json({
                message: "Invalid credentials",
            });
        }
    }
    else {
        res.status(404).json({
            message: "User not found",
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield db_1.ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({
        message: "Content created",
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            //@ts-ignore
            userId: userId,
        }).populate("userId", "username");
        res.json(content);
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.ContentModel.deleteMany({
        //@ts-ignore
        userId: req.userId,
    });
    res.json({
        message: "Content deleted",
    });
}));
app.delete("/api/v1/content/:id", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.params.id;
        yield db_1.ContentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Content deleted",
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        try {
            const existingLink = yield db_1.LinkModel.findOne({
                //@ts-ignore
                userId: req.userId,
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash,
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.LinkModel.create({
                hash: (0, utils_1.random)(10),
                //@ts-ignore
                userId: req.userId,
            });
            res.json({
                hash,
            });
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating link",
            });
        }
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Removed sharable link",
        });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield db_1.LinkModel.findOne({
        hash,
    });
    if (!link) {
        res.status(404).json({
            message: "Link not found",
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId,
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId,
    });
    if (!user) {
        res.status(404).json({
            message: "user not found, this should ideally never happen",
        });
        return;
    }
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content,
    });
}));
app.listen(3000, () => {
    console.log("Server started at 3000");
});
