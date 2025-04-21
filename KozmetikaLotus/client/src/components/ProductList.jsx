import React, { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import ProductService from "../services/Products";
import WishlistService from "../services/Wishlist"; // Import WishlistService
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../state";

const ProductList = ({ subCategory, productName, brand, isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0); // Track total number of products
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Track total number of pages
  const [wishlist, setWishlist] = useState([]); // State to hold wishlist items
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [productCache, setProductCache] = useState({}); // Cache for products
  const [sortOption, setSortOption] = useState('oldest'); // Default sort is oldest
  const limit = 12; // Assuming each page shows 12 products
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Assuming you store token in localStorage
  const dispatch = useDispatch();

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setPage(parseInt(savedPage, 10));
    }
    const savedProductCache = localStorage.getItem("productCache");
    if (savedProductCache) {
      setProductCache(JSON.parse(savedProductCache));
    }
    // localStorage.setItem("subCategory", subCategory);
  }, []);

  // First useEffect to decode user and set userId
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          await AuthService.decodeUser().then((res) => {
            setUserId(res.id); // Set userId state
          });
        } catch (error) {
          console.error("Error decoding user", error);
        }
      }
    };

    fetchUserData();
  }, [token]); // Dependency on token

  // Second useEffect to fetch wishlist, triggered by changes to userId
  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        // Ensure userId is not null
        try {
          const wishlistItems = await WishlistService.getUsersWishlist(userId);
          if (wishlistItems.length > 0) {
            setWishlist(wishlistItems.map((item) => item.id));
          }
        } catch (error) {
          console.error("Error fetching wishlist", error);
        }
      }
    };

    fetchWishlist();
  }, [userId]); // Dependency on userId

  useEffect(() => {
    if (!isAdmin) {
      // Clear cache and fetch fresh data when subCategory, productName, brand, or sortOption changes
      setProductCache({});
      fetchProducts(page);
      setPage(1);
    }
  }, [subCategory, productName, brand, sortOption]);

  useEffect(() => {
    let subCategoryCache = localStorage.getItem("subCategory");
    if (subCategoryCache !== subCategory) {
      localStorage.removeItem("currentPage");
    }
    localStorage.setItem("subCategory", subCategory);
  }, [subCategory]);

  useEffect(() => {
    fetchProducts(page); // Fetch products whenever the page changes
  }, [page]);

  useEffect(() => {
    let currentPage = localStorage.getItem("currentPage");
    if (currentPage) {
      fetchProducts(currentPage); // Fetch products whenever the page changes
    } else {
      fetchProducts(page); // Fetch products whenever the page changes
    }
  }, [productCache]);

  const fetchProducts = async (currentPage) => {
    const pageToFetch = currentPage || page; // Use the passed page or the state page
    if (productCache[pageToFetch]) {
      // If products for the current page are in cache, use them
      const cachedData = productCache[pageToFetch];
      setProducts(cachedData.products);
      setTotalProducts(cachedData.totalProducts);
      setTotalPages(cachedData.totalPages);
    } else {
      try {
        const filterModel = {
          subCategory: subCategory !== "all" ? subCategory : null,
          name: productName ? productName : null,
          brand: brand ? brand : null,
          page: pageToFetch,
          limit: limit,
          sort: sortOption, // Add sort parameter
        };

        const result = await ProductService.getProductsByFilter(filterModel);
        if (result) {
          setProducts(result.products); // Assuming the result has a 'products' array
          setTotalProducts(result.totalProducts); // Assuming the result includes the 'total' number of products
          setTotalPages(result.totalPages); // Calculate total pages

          // Cache the fetched products
          const newCache = {
            ...productCache,
            [pageToFetch]: {
              products: result.products,
              totalProducts: result.totalProducts,
              totalPages: result.totalPages,
            },
          };
          setProductCache(newCache);
          localStorage.setItem("productCache", JSON.stringify(newCache)); // Save the cache to local storage
        }
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem("currentPage", newPage);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Clear cache when sort option changes
    setProductCache({});
  };

  const toggleWishlistItem = async (productId, isLiked) => {
    try {
      if (isLiked) {
        // Call service to remove from wishlist
        await WishlistService.removeFromWishlist(userId, productId).then(() => {
          Swal.fire({
            title: "Item Removed!",
            text: "Item was successfully removed from wishlist!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        });
        dispatch(removeFromWishlist());
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        // Call service to add to wishlist
        await WishlistService.addToWishlist(userId, productId).then(() => {
          Swal.fire({
            title: "Item Added!",
            text: "Item was successfully added to wishlist!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        });
        dispatch(addToWishlist());
        setWishlist([...wishlist, productId]);
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)} className={`m-1 px-3 py-1 rounded-md ${1 === page ? "bg-gray-300" : "bg-white"}`}>
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="m-1 px-3 py-1">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`m-1 px-3 py-1 rounded-md ${i == page ? "bg-gray-300" : "bg-white"}`}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="m-1 px-3 py-1">
            ...
          </span>
        );
      }
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={`m-1 px-3 py-1 rounded-md ${totalPages === page ? "bg-gray-300" : "bg-white"}`}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full pb-10 flex justify-center">
      <div>
        {/* Add sort dropdown */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="block cursor-pointer appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="oldest">Oldest First</option>
              <option value="newest">Newest First</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer">
          {products.length > 0 &&
            products.map((product, index) => (
              <div key={index}>
                <ProductListItem title={product.title} shortDescription={product.shortDescription} longDescription={product.longDescription} price={product.price} id={product.id} subCategory={subCategory} isAdmin={isAdmin} isLiked={wishlist.includes(product.id)} toggleWishlist={toggleWishlistItem} inStock={product.inStock} productImage={product?.Images[0]?.fileName} />
              </div>
            ))}
        </div>
        {totalPages > 1 && (
          <div className="w-full flex justify-center mt-4">
            {/* Pagination component to handle page changes */}
            <div className="md:flex items-center">
              <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="hidden md:flex m-1 px-3 py-1 rounded-md bg-white">
                Previous
              </button>
              <div className="flex">
                {renderPagination()}
              </div>
              <div className="flex justify-center">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="md:hidden m-1 px-3 py-1 rounded-md bg-white">
                  Previous
                </button>
                <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} className="m-1 px-3 py-1 rounded-md bg-white">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;