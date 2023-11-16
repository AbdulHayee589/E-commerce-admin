import axios from "axios";
import { useState, useEffect } from "react";
import { setProducts } from "../state";

import EditProduct from "./EditProduct";
const Printify = () => {
  const [products, setProduct] = useState("");

  const [controller, setController] = useState(false);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [weight, setWeight] = useState("");

  let max = 0;

  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    if (!products) {
      axios
        .get("http://localhost:3001/product/printify/add")
        .then((res) => {
          setProduct(res.data.data);
          console.log(res.data.data);
          setController(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleAddProduct = async (product) => {
    console.log(product);
    const updatedColorSizes = []; // A new array to collect colorSizes
    let maxPrice = 0;
    let maxWeight = 0;
    const colorData = {};
    let placeholders = [];
    product.variants.forEach((item) => {
      const title = item.title;
      if (item.grams > maxWeight) {
        maxWeight = item.grams;
      }
      let size, color;
      const parts = title.split(" / ").map((part) => part.trim());
      color = parts[0];
      size = parts[1];

      if (!colorData[color]) {
        colorData[color] = {
          color: color,
          cost: 0,
          price: 0,
          size: [],
        };
      }

      colorData[color].cost += item.cost;
      colorData[color].price = Math.max(colorData[color].price, item.price);

      if (!colorData[color].size.includes(size)) {
        colorData[color].size.push(size);
      }
    });

    product.print_areas.forEach((place) => {
      placeholders = placeholders.concat(
        place.placeholders.map((hold) => hold.position)
      );
    });
    const colorArray = Object.values(colorData);

    colorArray.forEach((colorar) => {
      updatedColorSizes.push({ color: colorar.color, size: colorar.size });
      maxPrice = Math.max(maxPrice, colorar.price);
    });

    const productImages = product.images.map((image) => image.src);
    console.log(placeholders);
    setSelectedProduct({
      productName: product.title,
      description: product.description,
      price: maxPrice / 100,
      sku: sku,
      weight: maxWeight / 1000,
      images: productImages,
      colorSizes: updatedColorSizes,
      printify: true,
      blueprint_id: product.blueprint_id,
      placeholders: placeholders,
      print_provider_id: product.print_provider_id,
    });
    setController(true);
  };

  return (
    <div className="container row">
      {controller ? (
        <EditProduct
          setEdit={setController}
          selectedProduct={selectedProduct}
        />
      ) : (
        <div className="row col-md-12">
          {selectedProduct && console.log(selectedProduct)}
          {products &&
            products.map((product, index) => (
              <div
                key={index}
                className="col-md-2  border border-2 rounded-5 p-2 m-2 gradient-div row"
              >
                <div
                  className="col-md-12 row"
                  style={{ justifyContent: "center" }}
                >
                  <img
                    src={product.images[0].src}
                    width="auto"
                    height="150px"
                    alt="Product image"
                    className="rounded-5 shadow"
                  />
                  <p className="col-md-12 mt-2">
                    <b>{product.title}</b>
                  </p>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      handleAddProduct(product);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Printify;
