import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("men");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [quantity, setQuantity] = useState("");
  const [subCategory, setSubCategory] = useState("T-shirt");

  const [colors, setColors] = useState([]);
  const navigate = useNavigate();
  const [colorSizes, setColorSizes] = useState([]);

  const addColorSize = (color, size) => {
    // Check if the color already exists in the list
    const existingColor = colorSizes.find((item) => item.color === color);

    if (existingColor) {
      // If the color already exists, update its sizes
      existingColor.size = size;
      setColorSizes([...colorSizes]);
    } else {
      // If the color doesn't exist, add it to the list
      setColorSizes([...colorSizes, { color, size }]);
    }
  };

  const handlePrintify = () => {
    axios
      .get("http://localhost:3001/product/printify/auth")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeColorSize = (color) => {
    // Remove the color from the list
    const updatedColors = colorSizes.filter((item) => item.color !== color);
    setColorSizes(updatedColors);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      alert("You can upload up to 5 images only.");
      e.target.value = null;
    } else {
      setImages(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!productName) {
      newErrors.productName = "Product Name is required";
    }

    if (!description) {
      newErrors.description = "Description is required";
    }

    if (!price) {
      newErrors.price = "Price is required";
    }

    if (!sku) {
      newErrors.sku = "SKU is required";
    }

    if (!weight) {
      newErrors.weight = "Weight is required";
    }

    if (!discountedPrice) {
      newErrors.discountedPrice = "Discounted Price is required";
    }
    if (!quantity) {
      newErrors.quantity = "quantity is required";
    }
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("discountedPrice", discountedPrice);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("sku", sku);
      formData.append("weight", weight);
      formData.append("category", category);
      formData.append("printify", false);
      formData.append("subCategory", subCategory);
      formData.append("quantity", quantity);
      const colorSizesJSON = JSON.stringify(colorSizes);
      formData.append("colorSizes", colorSizesJSON);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      axios
        .post("http://localhost:3001/product/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/dashboard/products");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container shadow border rounded-5 p-5">
      {/* <button className="btn btn-primary" onClick={() => handlePrintify()}>
        Auth
      </button> */}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.productName ? "is-invalid" : ""
                }`}
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {errors.productName && (
                <div className="invalid-feedback">{errors.productName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <ReactQuill value={description} onChange={setDescription} />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.quantity ? "is-invalid" : ""
                }`}
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="sku" className="form-label">
                SKU
              </label>
              <input
                type="text"
                className={`form-control ${errors.sku ? "is-invalid" : ""}`}
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              {errors.sku && (
                <div className="invalid-feedback">{errors.sku}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight (Kg)
              </label>
              <input
                type="text"
                className={`form-control ${errors.weight ? "is-invalid" : ""}`}
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              {errors.weight && (
                <div className="invalid-feedback">{errors.weight}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className={`form-select ${errors.category ? "is-invalid" : ""}`}
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
                <option value="accessories">Accessories</option>
                <option value="homeLiving">Home & Living</option>
                <option value="more">More</option>
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
            {category && (
              <div className="mb-3">
                <label htmlFor="subcategory" className="form-label">
                  Sub Category
                </label>
                <select
                  className={`form-select ${
                    errors.subCategory ? "is-invalid" : ""
                  }`}
                  id="subcategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  {category === "men" || category === "women" ? (
                    <>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Hoodies">Hoodies</option>
                      <option value="Sweatshirts">Sweatshirts</option>
                      <option value="Long Sleeves">Long Sleeves</option>
                      <option value="Tank Top">Tank Top</option>
                      <option value="Sportswear">Sportswear</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Swimwear">Swimwear</option>
                      <option value="Shoes">Shoes</option>
                      {category === "women" && (
                        <option value="Skirts & dresses">
                          Skirts & dresses
                        </option>
                      )}
                    </>
                  ) : category === "kid" ? (
                    <>
                      <option value="accessories">Accessories</option>
                      <option value="Baby Clothing">Baby Clothing</option>
                      <option value="T-shirt">T-shirt</option>
                      <option value="Long Sleeves">Long Sleeves</option>
                      <option value="Sweatshirts">Sweatshirts</option>
                      <option value="Sportswear">Sportswear</option>
                      <option value="Bottoms">Bottoms</option>
                    </>
                  ) : category === "accessories" ? (
                    <>
                      <option value="Face Masks">Face Masks</option>
                      <option value="Phone Case">Phone Case</option>
                      <option value="Bags">Bags</option>
                      <option value="Socks">Socks</option>
                      <option value="Underwear">Underwear</option>
                      <option value="Hats">Hats</option>
                      <option value="Baby Accessories">Baby Accessories</option>
                      <option value="Mouse Pads">Mouse Pads</option>
                      <option value="Pets">Pets</option>
                      <option value="Kitchen Accessories">
                        Kitchen Accessories
                      </option>
                      <option value="Cat Accessories">Cat Accessories</option>
                      <option value="Tech Accessories">Tech Accessories</option>
                      <option value="Travel">Travel</option>
                      <option value="Stationery">Stationery</option>
                    </>
                  ) : category === "homeLiving" ? (
                    <>
                      <option value="Mugs">Mugs</option>
                      <option value="Bottle & Tumblers">
                        Bottle & Tumblers
                      </option>
                      <option value="Canvas">Canvas</option>
                      <option value="Posters">Posters</option>
                      <option value="Postcards">Postcards</option>
                      <option value="Ornaments">Ornaments</option>
                      <option value="Journals & Notebooks">
                        Journals & Notebooks
                      </option>
                      <option value="Magnets & stickers">
                        Magnets & stickers
                      </option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Bathroom">Bathroom</option>
                      <option value="Towels">Towels</option>
                      <option value="Blankets">Blankets</option>
                      <option value="Pillows & Covers">Pillows & Covers</option>
                      <option value="Games">Games</option>
                      <option value="Rugs & Mats">Rugs & Mats</option>
                      <option value="Seasonal Decorations">
                        Seasonal Decorations
                      </option>
                    </>
                  ) : category === "more" ? (
                    <>
                      <option value="Anime">Anime</option>
                      <option value="Movies & TV Series">
                        Movies & TV Series
                      </option>
                      <option value="Cartoons">Cartoons</option>
                      <option value="Sports">Sports</option>
                      <option value="Video Games">Video Games</option>
                      <option value="Gym">Gym</option>
                    </>
                  ) : null}
                </select>
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="discountedPrice" className="form-label">
                Discounted Price
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.discountedPrice ? "is-invalid" : ""
                }`}
                id="discountedPrice"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
              />
              {errors.discountedPrice && (
                <div className="invalid-feedback">{errors.discountedPrice}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="colors" className="form-label">
                Colors (comma-separated)
              </label>
              <input
                type="text"
                className="form-control"
                id="colors"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => {
                  // Split the colors input into an array
                  const colorArray = colors
                    .split(",")
                    .map((color) => color.trim());
                  // Loop through the colors and ask for sizes for each color
                  colorArray.forEach((color) => {
                    const size = prompt(
                      `Enter available sizes for ${color} (comma-separated):`
                    );
                    if (size !== null) {
                      addColorSize(
                        color,
                        size.split(",").map((size) => size.trim())
                      );
                    }
                  });
                }}
              >
                Add Colors and Size
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="colorSizes" className="form-label">
                Color-Sizes Associations
              </label>
              <ul>
                {colorSizes.map((item, index) => (
                  <li key={index} className="m-1">
                    <span>
                      {item.color} - Sizes: {item.size.join(", ")}
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => removeColorSize(item.color)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Product Images (up to 5)
              </label>
              <input
                type="file"
                className="form-control"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
