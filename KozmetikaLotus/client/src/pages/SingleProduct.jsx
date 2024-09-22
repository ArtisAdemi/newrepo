import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { ProductDetails } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../services/Products";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
import ProductFormModal from "../components/ProductForm";

const SingleProduct = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetchProductById(productName);
    fetchUserData(token);
  }, [productName]);

  const fetchProductById = async (id) => {
    let result;
    try {
      result = await ProductService.getProductById(id);
      setProduct(result);
    } catch (err) {
      console.log("Error fetchin product by id", err);
    }
    return result;
  };

  const fetchUserData = async (token) => {
    if (token) {
      try {
        await AuthService.decodeUser().then((res) => {
          setIsAdmin(res.role === "admin" ? true : false);
        });
      } catch (error) {
        console.error("Error decoding user", error);
      }
    }
  };

  const handleDeleteProduct = async () => {
    // Assuming ProductService.deleteProduct is an async function
    // and productName is the ID or unique identifier for the product
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          ProductService.deleteProduct(productName).then(() => {
            navigate(`/products`);
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "There was an error deleting the product",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error(err);
      }
    });
  };

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex w-full justify-center">
        <Navbar />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[80%] flex flex-col md:flex-row justify-between p-10">
          <div className="flex items-center justify-center">
            <div>
              <h2 className="text-2xl font-bold">Produktet</h2>
            </div>
            <div className="mt-1 ml-2">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <div className="mt-1 ml-2 truncate">
              <span>{product ? product.title : "loading"}</span>
            </div>
          </div>
          {isAdmin && (
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div>
                <button
                  className="md:mr-3 mb-3 mt-3 md:mb-0 md:mt-0 rounded-md border w-[190px] border-[#A10550] text-[#A10550] p-1 px-6 font-semibold"
                  onClick={handleEditProduct}
                >
                  Edit Product
                </button>
              </div>
              <div>
                <button
                  className="md:mr-3 rounded-md border w-[190px] border-[#A10550] text-[#A10550] p-1 px-6 font-semibold"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {product && (
        <div>
          <ProductDetails
            title={product.title}
            shortDescription={product.shortDescription}
            longDescription={product.longDescription}
            subCategory={product?.Subcategories[0]?.name}
            price={product.price}
            id={product.id}
            inStock={product.inStock}
          />
        </div>
      )}
      {isEditing && (
        <ProductFormModal
          closeModal={() => setIsEditing(false)}
          product={product}
        />
      )}
    </div>
  );
};

export default SingleProduct;
