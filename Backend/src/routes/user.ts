import bcrypt from "bcrypt";
import { Request, Router } from "express";
import _ from "lodash";
import {  User, validate } from "../models";
import { authMiddleWare } from "../middleware";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = Router();

async function generateAuthToken({ _id, name, email }) {
    let token = jwt.sign(
      {
        _id: _id,
        name: name,
        email: email,
      },
      process.env.JWT_PRIVATE_KEY
    );
    return token;
  }

// Register / Signup to platform
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = await generateAuthToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    res
      .header("Authorization", token)
      .header("access-control-expose-headers", "Authorization")
      .send(_.pick(user, ["_id", "name", "email"]));
});

// Get User Information | Profile
router.get(
    "/me",
    authMiddleWare,
    async (req: Request & { user: UserType }, res) => {
      const user = await User.findById(req.user._id).select("-password");
      res.send(user);
    }
  );

// Get User Information | Profile by email
router.get("/:email", authMiddleWare, async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).send("User not found.");
    delete user.password;
    res.send({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });

  export default router;