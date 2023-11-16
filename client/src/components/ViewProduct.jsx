import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product/all")
      .then((res) => {
        const products = res.data;

        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = ({ product }) => {
    const productId = product._id;

    axios
      .post("http://localhost:3001/product/delete", { productId })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const handletest = () => {
    axios
      .post("http://localhost:3001/product/printify/getproduct")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = ({ product }) => {
    setEdit(true);
    setSelectedProduct(product);
  };
  return (
    <>
      <button onClick={() => handletest()}>test</button>
      {edit ? (
        <div>
          <EditProduct selectedProduct={selectedProduct} setEdit={setEdit} />
        </div>
      ) : (
        <table className="table table-striped shadow border border-2">
          <thead>
            <tr>
              <th>Sr No:</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Sub Category</th>

              <th>Price</th>
              <th>Discounted Price</th>
              <th>Quantity</th>
              <th>SKU</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="border-2 text-center">
                    {product.productName}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.subCategory}</td>
                  <td>{product.colorSizes.color}</td>
                  <td>${product.price}</td>
                  <td>${product.discountedPrice}</td>
                  <td>{product.quantity}</td>
                  <td>{product.sku}</td>
                  <td>{new Date(product.createdAt).toLocaleString()}</td>
                  <td>{new Date(product.updatedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => handleDelete({ product })}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary m-2"
                      onClick={() => handleEdit({ product })}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ViewProduct;
