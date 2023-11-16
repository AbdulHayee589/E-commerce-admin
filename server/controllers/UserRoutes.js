import User from "../models/User.js";
// Get ALL Users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Assuming you have a User model

    res.status(200).json(users); // Respond with the array of users
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
