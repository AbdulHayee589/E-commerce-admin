import { useState, useEffect } from "react";
import axios from "axios";
const AddProduct = ({ selected, prints, variants, ship, setController }) => {
  //   const [productName, setProductName] = useState(`${selected.title}`);
  //   const [description, setDescription] = useState(`${selected.description}`);
  //   const [price, setPrice] = useState(`${selected.price}`);
  //   const [sku, setSku] = useState(`${selected.sku}`);
  //   const [weight, setWeight] = useState(`${selected.weight}`);
  //   const [category, setCategory] = useState(`${selected.category}`);
  //   const [subCategory, setSubCategory] = useState(`${selected.subCategory}`);
  //   const [discountedPrice, setDiscountedPrice] = useState(
  //     `${selected.discountedPrice}`
  //   );
  const [images, setImages] = useState(selected.images || []);
  const uniquePositions = new Set();
  const [colorSizes, setColorSizes] = useState([]);
  const [test, setTest] = useState([]);
  const [placeholder, setPlaceHolder] = useState([]);
  const colorMap = new Map();
  //   const [errors, setErrors] = useState({});
  //   const [quantity, setQuantity] = useState(`${selected.quantity}`);
  //   const [colorSizes, setColorSizes] = useState(selected.colorSizes || []);

  useEffect(() => {
    if (variants) {
      variants.map((variant) => {
        test.push(variant.options);
      });

      // console.log({ colorSizes });
      test.forEach((item) => {
        const { color, size } = item;

        // Check if an entry exists for the color in the Map
        if (colorMap.has(color)) {
          // Update the existing entry by adding the size to its sizes array
          const entry = colorMap.get(color);
          entry.size.push(size); // Use 'sizes' instead of 'size'
        } else {
          // Create a new entry for the color
          colorMap.set(color, { color, size: [size] });
        }
      });

      setColorSizes(Array.from(colorMap.values()));

      variants.forEach((item) => {
        const placeholders = item.placeholders || [];

        placeholders.forEach((placeholder) => {
          uniquePositions.add(
            placeholder.position,
            placeholder.height,
            placeholder.width
          );
        });
      });

      // Convert the Set back into an array if needed

      setPlaceHolder(Array.from(uniquePositions));
    }
  }, []);

  return (
    <div>
      <h5>Please Set details</h5>
      {placeholder && console.log(placeholder)}
      <div className="row col-md-12 border-2 rounded-5 gradient-div  p-2 shadow">
        <div className="row">
          <button
            className="btn btn-light col-md-1"
            onClick={() => {
              setController(false);
            }}
          >
            Back
          </button>
          <h4 className="col-md-12 mt-3 mb-3">{selected.title}</h4>

          {prints && (
            <p>
              Print Provider:{" "}
              {prints.title ? prints.title : JSON.stringify(prints)}
            </p>
          )}
        </div>

        {images.length > 1 &&
          images.map((image, index) => (
            <img
              className="col-md-3 rounded-5 m-2 shadow"
              key={index}
              src={image}
              width={image.width}
              height="200px"
              alt="product image"
            />
          ))}
        {colorSizes &&
          colorSizes.map((colorSize, index) => (
            <div key={index} className="m-1">
              <span>
                <b>Color:</b> {colorSize.color} ,{" "}
              </span>
              <span>
                <b>Size:</b> {colorSize.size.join(", ")}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddProduct;
