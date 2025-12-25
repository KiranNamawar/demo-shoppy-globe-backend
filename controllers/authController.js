import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import User from "../models/user.js";

export async function handleRegister(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(403).json({
        error: "Account already exists. Try login.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.send(newUser._id);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return res.status(403).json({
        error: "Invalid Credentials",
      });
    }
    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(403).json({
        error: "Invalid Credentials",
      });
    }

    const token = generateToken({
      id: existingUser._id,
      email: existingUser.email,
    });

    res.send(token);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
