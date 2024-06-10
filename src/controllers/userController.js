import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const auth = process.env.SECRET;

import User from "../models/User.js";

User.findOne({ where: { email: "admin" } }).then((user) => {
  if (!user) {
    User.create({
      name: "admin",
      email: "admin",
      password: "admin",
      role: "admin",
    });
  }
});

function generateToken(params = {}) {
  return jwt.sign(params, auth, {
    expiresIn: 86400,
  });
}

const userController = express.Router();

userController.post("/login", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  const body = req.body;
  if (!body.email) return res.status(400).send("Email is required");

  if (!body.password) return res.status(400).send("Password is required");

  const user = await User.findOne({ where: { email: body.email } });
  if (!user) return res.status(400).send("User not found");

  const validPassword = await bcrypt.compare(body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user.id }, auth, { expiresIn: "1h" });

  res.send(token);
});

userController.post("/register", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");
  if (!req.body.email) return res.status(400).send("Email is required");
  if (!req.body.password) return res.status(400).send("Password is required");
  if (!req.body.name) return res.status(400).send("Name is required");
  if (!req.body.role) return res.status(400).send("Role is required");

  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("User already exists");

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  try {
    const user = await User.create(newUser);
    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send("Registration failed");
  }
});

export default userController;
