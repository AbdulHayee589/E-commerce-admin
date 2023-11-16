import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

//Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Registered." });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new Admin({
      name,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//LOGIN USER

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User Does not Exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "The password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
