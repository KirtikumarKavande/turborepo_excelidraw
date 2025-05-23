import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  console.log(data);

  const { name, email, password, photo } = data.data;
  if (photo) {
    photo ?? "";
  }
  let response = await prismaClient.user.create({
    data: {
      name,
      email,
      password,
      photo,
    },
    omit: {
      password: true,
    },
  });

  res.json({ response });
});

app.post("/signin", async (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const { email, password } = data.data;

  let response = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (response?.password === password) {
    const token = jwt.sign(
      {
        id: response.id,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  }
});

app.post("/room", middleware, async(req, res) => {
  const {slug}=req.body
  console.log('name',req.body,req.userId)

// @ts-ignore: TODO: Fix this
  if(!req.userId) return 
const response=await prismaClient.room.create({
    data:{
        slug,
        adminId:req.userId 
    }
  })
  res.json({
    roomId: response.id,
  });
});

app.listen(3001);
