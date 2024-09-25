import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import WishlistService from "../services/Wishlist";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";

const LikeProduct = ({ productId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0);
  const token = localStorage.getItem("token");

  const getUserData = async () => {
    let res;
    try {
      res = await AuthService.decodeUser();
      setUser(res);
      return res.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleLike = () => {
    if (isLiked) {
      removeFromWishlist();
      setIsLiked(!isLiked);
    } else {
      addToWishlist();
      setIsLiked(!isLiked);
    }
  };

  const addToWishlist = async () => {
    let res;
    try {
      res = await WishlistService.addToWishlist(userId, productId).then(() => {
        Swal.fire({
          title: "Item Added!",
          text: "Item was successfully added to wishlist!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async () => {
    let res;
    try {
      res = await WishlistService.removeFromWishlist(userId, productId).then(() => {
        Swal.fire({
          title: "Item Removed!",
          text: "Item was successfully removed from wishlist!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loadData = async () => {
    const userId = await getUserData();
    if (userId) {
      setUserId(userId);
      try {
        let res = await WishlistService.checkIfProductIsInWishlist(userId, productId);
        if (res.data === true) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, []);

  return (
    <div className="cursor-pointer">
      {isLiked && <FaHeart size={25} color={"red"} onClick={handleLike} />}
      {!isLiked && <FaRegHeart size={25} color={"black"} onClick={handleLike} />}
    </div>
  );
};

export default LikeProduct;
