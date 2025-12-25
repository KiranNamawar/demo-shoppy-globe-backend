import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import User from "../models/user.js";

export async function handleRegister(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    // check if user already exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(403).json({
        error: "Account already exists. Try login.",
      });
    }

    // create new user with hased password
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.send({
      message: "User Created",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    // check if user doesn't exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({
        error: "Invalid Credentials",
      });
    }

    // compare password with password hash from db
    const isPasswordValid = await comparePassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({
        error: "Invalid Credentials",
      });
    }

    // create jwt with user data
    const token = generateToken({
      id: existingUser._id,
      email: existingUser.email,
    });

    // update last login
    existingUser.lastLogin = Date.now();
    await existingUser.save();

    res.send({
      message: "User Logged In",
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
}
