import { useState } from "react";
import axios from "axios";
const AddCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");

  const handleCoupon = () => {
    axios
      .post("http://localhost:3001/coupon", {
        coupon: coupon,
        discount: discount,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex mt-5" style={{ gap: "20px" }}>
      <div>
        <b>Coupon:</b>
        <input
          className="rounded-3"
          placeholder=" INFINITY50 etc"
          value={coupon}
          type="text"
          onChange={(e) => {
            setCoupon(e.target.value);
          }}
        />
      </div>
      <div>
        <b>Discount %:</b>
        <input
          className="rounded-3"
          placeholder="50 etc"
          value={discount}
          type="text"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        />
      </div>
      <button
        className="btn btn-primary"
        disabled={coupon === "" || discount === ""}
        onClick={() => handleCoupon()}
      >
        Submit
      </button>
    </div>
  );
};
export default AddCoupon;
