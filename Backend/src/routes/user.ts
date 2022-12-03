import bcrypt from "bcrypt";
import { Request, Router } from "express";
import _ from "lodash";
import {  User, validate } from "../models";
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

  export default router;