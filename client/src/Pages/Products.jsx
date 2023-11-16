import { useState } from "react";
import AddProduct from "../components/AddProduct";
import ViewProduct from "../components/ViewProduct";
import Printify from "../components/PrintifyProducts";
const Products = () => {
  const [selector, setSelector] = useState(0);
  return (
    <>
      <ul className="nav m-5 mb-0">
        <li className="nav-item shadow ">
          <button
            className={`nav-link ${
              selector ? "bg-body-secondary" : "bg-primary"
            } ${selector ? "text-black" : "text-white"}`}
            style={{ width: 100 }}
            onClick={() => setSelector(0)}
          >
            View Products
          </button>
        </li>
        <li className="nav-item bg-body-secondary shadow">
          <button
            className={`nav-link text-black ${selector === 1 && "bg-primary"} ${
              selector === 1 && "text-white"
            }`}
            style={{ width: 100 }}
            onClick={() => setSelector(1)}
          >
            Add Products
          </button>
        </li>
        <li className="nav-item bg-body-secondary shadow">
          <button
            className={`nav-link text-black ${selector === 2 && "bg-primary"} ${
              selector === 2 && "text-white"
            }`}
            style={{ width: 100 }}
            onClick={() => setSelector(2)}
          >
            Printify Products
          </button>
        </li>
      </ul>
      <div className="m-3">
        {(selector === 1 && <AddProduct />) ||
          (selector === 0 && <ViewProduct />) ||
          (selector === 2 && <Printify />)}
      </div>
    </>
  );
};

export default Products;
