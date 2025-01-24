import express from "express";
import { z } from "zod";
import { ContentModel, UserModel, LinkModel } from "./db";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import bcrypt from "bcrypt";
import  {config}  from "./config";
import dotenv from "dotenv";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());



app.post("/api/v1/signup", async (req, res) => {
  //zod validation, hash the password
  const signupSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
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
    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User created",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password as string
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        config.JWT_SECRET as string
      );
      res.json({
        token,
        username: existingUser.username,
      });
    } else {
      res.status(403).json({
        message: "Invalid credentials",
      });
    }
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  await ContentModel.create({
    
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
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {

  try{
  //@ts-ignore
  const userId = req.userId;


  const content = await ContentModel.find({ 
    //@ts-ignore
    userId: userId,
  }).populate("userId", "username");
  res.json(content);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {

  await ContentModel.deleteMany({
    //@ts-ignore
    userId: req.userId,
  });
  res.json({
    message: "Content deleted",
  });
});

app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
  try{
    const contentId = req.params.id
    await ContentModel.deleteOne({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });
    res.json({
      message: "Content deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});


app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    try {
      const existingLink = await LinkModel.findOne({
        //@ts-ignore
        userId: req.userId,
      });
      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }
      const hash = random(10);
      await LinkModel.create({
        hash: random(10),
        //@ts-ignore
        userId: req.userId,
      });
      res.json({
        hash,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error creating link",
      });
    }
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
    res.json({
      message: "Removed sharable link",
    });
  }
});

app.get("/api/v1/brain/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(404).json({
      message: "Link not found",
    });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });
  if (!user) {
    res.status(404).json({
      message: "user not found, this should ideally never happen",
    });
    return;
  }

  res.json({
    username: user?.username,
    content: content,
  });
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
