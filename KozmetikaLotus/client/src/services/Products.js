import axios from "axios";
import buildUrl from "../helpers/BuildParam";
import Swal from "sweetalert2";
import API_URL from "./backendUrl";
const PRODUCTS_API_URL = `${API_URL}/products`;

// Create an axios instance for authenticated requests
const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Access-Control-Allow-Origin": "*",
  },
});

const ProductService = {
  getProducts: async () => {
    try {
      const response = await axios.get(`${PRODUCTS_API_URL}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return null;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${PRODUCTS_API_URL}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return null;
    }
  },

  // Shembull qysh me kriju modelin per me perdore funksionin ma poshte
  // const filterModel = {
  //     category: 'example',
  //     name: 'example'
  //     page: 1,
  //     limit: 12,
  // }

  getProductsByFilter: async (filterModel) => {
    let endpoint = `${PRODUCTS_API_URL}?`;
    try {
      let params = {};
      if (filterModel.subCategory) {
        const subCategory = filterModel.subCategory.toLowerCase();
        params["subCategory"] = subCategory;
      }
      if (filterModel.name) {
        params["productName"] = filterModel.name;
      }
      //  E kom shtu ktu per brands dmth
      if (filterModel.brand) {
        params["brand"] = filterModel.brand; // Add brandName to the params
      }
      if (filterModel.page) {
        params["page"] = filterModel.page;
      }
      if (filterModel.limit) {
        params["limit"] = filterModel.limit;
      }
      endpoint += buildUrl(params);

      const response = await axios.get(endpoint, { withCredentials: true });
      return response.data;
    } catch (err) {
      console.error("Error fetching products: ", err);
      return null;
    }
  },

  // Get 1 product per Category

  getUniqueCategory: async () => {
    try {
      const response = await axios.get(
        `${PRODUCTS_API_URL}/productPerCategory`,
        { withCredentials: true }
      );
      return response;
    } catch (err) {
      console.error("Error fetching products:", err);
      return null;
    }
  },

  // Product images
  getProductImages: async (productId) => {
    try {
      const res = await axios.get(`${PRODUCTS_API_URL}/${productId}/images`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error("Error fetching images", err);
      return [];
    }
  },

  registerProduct: async (productData, images) => {
    const formData = new FormData();
    // Append product data fields to formData, excluding categoryNames
    Object.keys(productData).forEach((key) => {
      if (Array.isArray(productData[key])) {
        // If the value is an array, append each item individually
        productData[key].forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        // For non-array values, append them as before
        formData.append(key, productData[key]);
      }
    });

    // Append images to formData
    images.forEach((image) => {
      formData.append("uploadedFiles", image);
    });

    try {
      const response = await axiosInstance.post(
        `${PRODUCTS_API_URL}`,
        formData,
        {
          withCredentialsq: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error registering product:", err);
      Swal.fire({
        title: "Error!",
        text: `${err.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return null;
    }
  },

  updateProduct: async (productId, productData, images) => {
    const formData = new FormData();
    // Append product data fields to formData, excluding categoryNames
    Object.keys(productData).forEach((key) => {
      if (Array.isArray(productData[key])) {
        // If the value is an array, append each item individually
        productData[key].forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        // For non-array values, append them as before
        formData.append(key, productData[key]);
      }
    });

    // Append images to formData
    images.forEach((image) => {
      formData.append("uploadedFiles", image);
    });

    try {
      const response = await axiosInstance.put(
        `${PRODUCTS_API_URL}/${productId}`,
        formData,
        {
          withCredentialsq: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error updating product:", err);
      Swal.fire({
        title: "Error!",
        text: "Product could not be saved",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return null;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await axiosInstance
        .delete(`${PRODUCTS_API_URL}/${productId}`)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Product was deleted successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        });
      return response;
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Product could not be deleted",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error("Error deleting product:", err);
      return null;
    }
  },

  getBrands: async () => {
    try {
      const res = await axios.get(`${PRODUCTS_API_URL}/brands`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error("Error fetching images", err);
      return [];
    }
  },

  remindMeWhenInStock: async (productId, remindMe) => {
    try {
      const res = await axios.post(
        `${PRODUCTS_API_URL}/remindWhenInStock`,
        {
          productId: productId,
          remindMe: remindMe,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Error fetching images", err);
      return null;
    }
  },

  remindMeForThisProduct: async (productId) => {
    try {
      const res = await axiosInstance.get(
        `${PRODUCTS_API_URL}/remindWhenInStock/${productId}`
      );

      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  getBestSellers: async () => {
    try {
      const res = await axiosInstance.get(`${PRODUCTS_API_URL}/best-selling`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};

export default ProductService;
