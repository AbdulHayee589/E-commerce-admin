import React, { useState } from "react";
import CouponList from "../components/Coupon/CouponList";
import AddCoupon from "../components/Coupon/AddCoupon";
const Coupon = () => {
  const [selector, setSelector] = useState(false);
  return (
    <>
      <div className="mt-5">
        <button
          className={`btn border ${selector ? "" : "btn-primary"}`}
          onClick={() => setSelector(false)}
        >
          Coupons
        </button>
        <button
          className={`btn border ${selector ? "btn-primary" : ""}`}
          onClick={() => setSelector(true)}
        >
          Add Coupons
        </button>
      </div>
      <div className="mt-3">{selector ? <AddCoupon /> : <CouponList />}</div>
    </>
  );
};

export default Coupon;
