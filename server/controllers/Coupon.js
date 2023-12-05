import Coupon from "../models/Coupon.js";

export const AddCoupon = async (req, res) => {
  try {
    const { coupon, discount } = req.body;

    const existing = await Coupon.findOne({ coupon: coupon });
    if (existing) {
      return res.status(400).json({ message: "Coupon Already Registered." });
    }

    const newCoupon = new Coupon({
      coupon,
      discount,
    });
    const savedCoupon = await newCoupon.save();
    res.status(201).json({ savedCoupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
