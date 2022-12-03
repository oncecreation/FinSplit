import bcrypt from "bcrypt";
import { Router } from "express";
import Joi from "joi";
import { User } from "../models";
import jwt from "jsonwebtoken";

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



router.get("/ping", async (_, res) => {
    res.send("Connected to Server...");
  });

// Login to platform
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send("User not found. Invalid email or password.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    // const token = user.generateAuthToken();
    const token = await generateAuthToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });


    // Check requested client and send token accordingly
  const regex = /^PostmanRuntime/i;
  let userAgent = req.header("user-agent");
  if (regex.test(userAgent)) {
    res.send({ token });
  } else {
    res.send(token);
  }
});

// Generate new Auth Token
router.post("/updateToken", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const token = await generateAuthToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    res.send(token);
  });

  const validate = (req) => {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.object(schema).validate(req);
  };


export default router;
