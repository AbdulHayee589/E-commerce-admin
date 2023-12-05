import mongoose from "mongoose";
const CouponSchema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    discount: {
      type: String,
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupons", CouponSchema);
export default Coupon;
