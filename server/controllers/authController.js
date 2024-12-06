import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    generateToken(res, user._id);
    const savedUser = await user.save();
    if (user) {
      res.status(201).json({
        _id: savedUser._id,
        userName,
        email,
      });
    } else {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.log("Signup controller error" + error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userExists = await User.findOne({ userName }).populate("groups", [
      "-password",
    ]);
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      generateToken(res, userExists._id);
      res.status(200).json(userExists);
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.log("Login controller error" + error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("auth", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout controller error" + error.message);
    res.status(500).json({ error: error.message });
  }
};
