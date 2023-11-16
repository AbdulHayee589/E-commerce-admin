import Product from "../models/Products.js";
import fs from "fs";
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PRINTIFY_API_BASE_URL = "https://api.printify.com/v1";
const API = process.env.Printify_API;
// ADD PRODUCT
export const addproduct = async (req, res) => {
  try {
    const {
      productName,
      discountedPrice,
      description,
      price,
      sku,
      weight,
      category,
      quantity,
      subCategory,

      colorSizes,
    } = req.body;

    const images = req.files;

    if (!images) {
      return res.status(400).json({ error: "No images uploaded." });
    }

    const base64Images = images.map((image) => {
      try {
        const filePath = image.path;
        const fileContents = fs.readFileSync(filePath);
        const base64 = fileContents.toString("base64");
        return base64;
      } catch (error) {
        console.error("Error converting image to base64:", error);
        return null;
      }
    });

    let uniqueId;
    let isUniqueIdUnique = false;

    while (!isUniqueIdUnique) {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      uniqueId = `${productName}-${randomNumber}`;

      // Check if the uniqueId already exists in the database
      const existingProduct = await Product.findOne({ uniqueId });

      if (!existingProduct) {
        isUniqueIdUnique = true;
      }
    }

    const newProduct = new Product({
      productName,
      discountedPrice,
      description,
      price,
      sku,
      weight,
      category,
      quantity,
      images: base64Images,
      subCategory,
      uniqueId,

      colorSizes: JSON.parse(colorSizes),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET ALL PRODUCTS
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find(); // Assuming you have a Product model

    res.status(200).json(products); // Respond with the array of products
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//EDIT PRODUCTS

export const editProduct = async (req, res) => {
  try {
    const {
      productName,
      discountedPrice,
      description,
      price,
      sku,
      weight,
      category,
      subCategory,
      quantity,
      uniqueId,
      colorSizes,
      _id,
      images,
    } = req.body;
    let check;
    if (!images) {
      check = req.files;
    }
    // if (!check) {
    //   return res.status(400).json({ error: "No images uploaded." });
    // }
    let base64Images;
    if (check) {
      base64Images = check.map((image) => {
        try {
          const filePath = image.path;
          const fileContents = fs.readFileSync(filePath);
          const base64 = fileContents.toString("base64");
          return base64;
        } catch (error) {
          console.error("Error converting image to base64:", error);
          return null;
        }
      });
    }

    // Find the product by _id and update its fields
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        productName,
        discountedPrice,
        description,
        price,
        sku,
        weight,
        category,
        quantity,
        images: base64Images ? base64Images : images,
        subCategory,
        uniqueId,
        colorSizes: JSON.parse(colorSizes),
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const printifyProduct = async (req, res) => {
  try {
    const {
      productName,
      discountedPrice,
      description,
      price,
      sku,
      weight,
      category,
      quantity,
      subCategory,
      images,
      colorSizes,
      printify,
      edit,
      _id,
      blueprint_id,
      placeholders,
      print_provider_id,
    } = req.body;

    const shipping = await axios.get(
      `${PRINTIFY_API_BASE_URL}/catalog/blueprints/${blueprint_id}/print_providers/${print_provider_id}/shipping.json`,
      {
        headers: {
          Authorization: `Bearer ${API}`,
        },
      }
    );
    const ship = shipping.data;

    let uniqueId;
    let isUniqueIdUnique = false;

    while (!isUniqueIdUnique) {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      uniqueId = `${productName}-${randomNumber}`;

      // Check if the uniqueId already exists in the database
      const existingProduct = await Product.findOne({ uniqueId });

      if (!existingProduct) {
        isUniqueIdUnique = true;
      }
    }
    const roundedPrice = Math.round(price);

    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        {
          productName,
          discountedPrice,
          description,
          price: roundedPrice,
          sku,
          weight,
          category,
          quantity,
          images,
          subCategory,
          uniqueId,
          edit,
          printify,
          colorSizes: JSON.parse(colorSizes),
          blueprint_id,
          placeholders,
          print_provider_id,
          ship: ship,
        },
        { new: true } // Return the updated product
      );
      if (updatedProduct) {
        return res.status(201).json({ updatedProduct });
      }
    }
    const newProduct = new Product({
      productName,
      discountedPrice,
      description,
      price: roundedPrice,
      sku,
      weight,
      category,
      quantity,
      images,
      subCategory,
      uniqueId,
      edit,
      printify,
      colorSizes: JSON.parse(colorSizes),
      blueprint_id,
      placeholders,
      print_provider_id,
      ship: ship,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
