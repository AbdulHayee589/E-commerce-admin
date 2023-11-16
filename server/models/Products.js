import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      max: 50,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    uniqueId: {
      type: String,
      unique: true,
    },

    colorSizes: {
      type: [],
      required: true,
    },
    cost: {
      type: Number,
    },
    edit: {
      type: Boolean,
    },
    printify: {
      type: Boolean,
    },
    blueprint_id: {
      type: Number,
    },
    placeholders: {
      type: [],
    },
    print_provider_id: {
      type: Number,
      required: true,
    },
    ship: {
      type: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", ProductSchema);
export default Product;
