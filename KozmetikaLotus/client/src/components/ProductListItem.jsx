import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/Products";
import LikeProduct from "./LikeProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../state";
import Swal from "sweetalert2";

const ProductListItem = ({
  title,
  shortDescription,
  price,
  subCategory,
  id,
  isAdmin,
  isLiked,
  toggleWishlist,
  inStock,
  productImage,
}) => {
  const navigate = useNavigate();
  // const [isLiked, setIsLiked] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleLike = () => {
    toggleWishlist(id, isLiked);
  };

  // const fetchImages = async () => {
  //   const fetchedImages = await ProductService.getProductImages(id);
  //   setImages(fetchedImages);
  // };

  const handleRemindMe = async () => {
    try {
      const res = await ProductService.remindMeWhenInStock(id, true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const imagePath = `/uploads/${productImage}`;
  // const img = process.env.PUBLIC_URL + imagePath;

  const handleAddToCart = () => {
    const product = {
      title,
      subCategory,
      shortDescription,
      id,
      price,
      imgUrl: productImage,
    };
    if (inStock) {
      dispatch(addToCart({ product }));
      Swal.fire({
        title: "Item Added!",
        text: "Item was successfully added to cart!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Product Out of Stock!",
        text: "You can set a reminder, so we can inform you when product is back in stock!",
        icon: "error",
        confirmButtonText: "Remind Me",
        confirmButtonColor: "#A3A7FC",
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          handleRemindMe().then(() => {
            Swal.fire({
              title: "Reminder has been set.",
              text: "You will be reminded via email when product is back in stock",
              confirmButtonText: "Ok",
            });
          });
        }
      });
    }
  };

  return (
    <div className="max-w-[250px] w-[250px] mx-auto bg-white shadow-lg h-[430px]">
      <div
        className="flex justify-center items-center w-full h-[300px]"
        onClick={() =>
          isAdmin
            ? navigate(`/admin/${id}`)
            : navigate(`/products/${subCategory}/${id}`)
        }
      >
        <img
          className="object-contain max-w-[250px] min-h-[300px] max-h-[300px]"
          src={process.env.PUBLIC_URL + imagePath}
          alt="Product here"
        />
      </div>
      <div className="p-4">
        <h2 className="text-start text-xl text-[#292929] font-bold max-h-10 overflow-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </h2>
        <p className="mt-1 text-start text-[#292929] text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
          {shortDescription}
        </p>
        {/* Lower Part */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl text-[#292929] font-bold">
            €{price.toFixed(2)}
          </span>
          <button
            className="text-center text-[#A3A7FC] font-semibold items-center py-2 "
            onClick={handleAddToCart}
          >
            {inStock ? "Add To Cart" : "Out of stock"}
          </button>
          {/* This works, it changes the outline of the heart icon to red */}
          {isLiked && <FaHeart size={25} color={"red"} onClick={handleLike} />}
          {!isLiked && (
            <FaRegHeart size={25} color={"black"} onClick={handleLike} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
