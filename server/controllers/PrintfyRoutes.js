import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PRINTIFY_API_BASE_URL = "https://api.printify.com/v1";
const API = process.env.Printify_API;

const storeid = 12553598;

let productData;

export const PrintifyAuth = async (req, res) => {
  const response = await axios.get(`${PRINTIFY_API_BASE_URL}/shops.json`, {
    headers: {
      Authorization: `Bearer ${API}`,
    },
  });

  const productData = response.data; // Handle the product data as needed

  res.json(productData);
};

const category = "Men";

export const getPrintifyProduct = async (req, res) => {
  try {
    const response = await axios.get(
      `${PRINTIFY_API_BASE_URL}/shops/${storeid}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${API}`,
        },
      }
    );

    // const response = await axios.get(
    //   `${PRINTIFY_API_BASE_URL}/catalog/blueprints.json`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${API}`,
    //     },
    //   }
    // );

    // Extract the data from the response
    const responseData = response.data;

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.json(error);
  }
};

export const getSpecificProduct = async (req, res) => {
  try {
    const id = 522;

    const response = await axios.get(
      `${PRINTIFY_API_BASE_URL}/catalog/blueprints/${id}.json`,
      {
        headers: {
          Authorization: `Bearer ${API}`,
        },
      }
    );
    const responseData = response.data;

    const print = await axios.get(
      `${PRINTIFY_API_BASE_URL}/catalog/blueprints/${id}/print_providers.json`,
      {
        headers: {
          Authorization: `Bearer ${API}`,
        },
      }
    );
    const prints = print.data;
    let provider;
    let variants;
    let ship;
    if (prints.length !== 0) {
      provider = prints[0];

      const variant = await axios.get(
        `${PRINTIFY_API_BASE_URL}/catalog/blueprints/${id}/print_providers/${prints[0].id}/variants.json`,
        {
          headers: {
            Authorization: `Bearer ${API}`,
          },
        }
      );
      variants = variant.data.variants;

      ///catalog/blueprints/{blueprint_id}/print_providers/{print_provider_id}/shipping.json
      const shipping = await axios.get(
        `${PRINTIFY_API_BASE_URL}/catalog/blueprints/${id}/print_providers/${prints[0].id}/shipping.json`,
        {
          headers: {
            Authorization: `Bearer ${API}`,
          },
        }
      );
      ship = shipping.data;
    } else {
      provider = "No Provider";
      variants = "NONE";
      ship = "NULL";
    }

    res.json({ responseData, provider, variants, ship });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.json(error);
  }
};
