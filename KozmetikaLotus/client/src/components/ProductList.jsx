import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import ProductService from '../services/Products';
import WishlistService from '../services/Wishlist'; // Import WishlistService
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../state';

const ProductList = ({ subCategory, productName, brand, isAdmin }) => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0); // Track total number of products
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Track total number of pages
    const [wishlist, setWishlist] = useState([]); // State to hold wishlist items
    const [userId, setUserId] = useState(null); // Initialize userId state
    const limit = 12; // Assuming each page shows 12 products
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Assuming you store token in localStorage
    const dispatch = useDispatch();

    useEffect(() => {
       fetchProducts();
    }, [page, subCategory, productName, brand]);

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
            if (userId) { // Ensure userId is not null
                try {
                    const wishlistItems = await WishlistService.getUsersWishlist(userId);
                    if (wishlistItems.length > 0){
                        setWishlist(wishlistItems.map(item => item.id));
                    }
                } catch (error) {
                    console.error("Error fetching wishlist", error);
                }
            }
        };

        fetchWishlist();
    }, [userId]); // Dependency on userId

    const fetchProducts = async () => {
        try {
            const filterModel = {
                subCategory: subCategory !== 'all' ? subCategory : null,
                name: productName ? productName : null,
                brand: brand ? brand : null,
                page: page,
                limit: limit,
            };

            const result = await ProductService.getProductsByFilter(filterModel);
            if (result) {
                setProducts(result.products); // Assuming the result has a 'products' array
                setTotalProducts(result.totalProducts); // Assuming the result includes the 'total' number of products
                setTotalPages(result.totalPages); // Calculate total pages
            }
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page changes
        setPage(newPage);
    };

    const toggleWishlistItem = async (productId, isLiked) => {
        try {
            if (isLiked) {
                // Call service to remove from wishlist
                await WishlistService.removeFromWishlist(userId, productId).then(() => {
                    Swal.fire({
                        title: "Item Removed!",
                        text: "Item was successfully removed from wishlist!",
                        icon:"success",
                        confirmButtonText: "Ok",
                      })
                });
                dispatch(removeFromWishlist())
                setWishlist(wishlist.filter(id => id !== productId));
            } else {
                // Call service to add to wishlist
                await WishlistService.addToWishlist(userId, productId).then(() => {
                    Swal.fire({
                        title: "Item Added!",
                        text: "Item was successfully added to wishlist!",
                        icon:"success",
                        confirmButtonText: "Ok",
                      })
                });
                  dispatch(addToWishlist())
                setWishlist([...wishlist, productId]);
            }
        } catch (error) {
            console.error("Error updating wishlist", error);
        }
    };
        
    return (
        <div className='w-full pb-10 flex justify-center'>
            <div>
                <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer'>
                {products.length > 0 && products.map((product, index) => (
                    <div  key={index}>
                    <ProductListItem title={product.title} shortDescription={product.shortDescription} longDescription={product.longDescription} price={product.price} id={product.id} subCategory={subCategory} isAdmin={isAdmin} isLiked={wishlist.includes(product.id)} toggleWishlist={toggleWishlistItem} inStock={product.inStock}/>
                    </div>
                ))}
                </div> 
                {totalPages > 1 && (

                    <div className='w-full flex justify-center'>
                    {/* Pagination component to handle page changes */} 
                    <div className='m-3 text-[#292929] mt-5 font-semibold text-xl align-text-bottom px-3 py-1'>
                        {page}
                    </div>
                    <div className='m-3 shadow-md px-3 py-1 rounded-md text-[#292929] items-baseline text-lg font-semibold' style={{display: page === 1 ? 'none' : 'block'}}>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className='align-text-bottom'>Previous</button>
                    </div>
                    <div className='m-3 shadow-md px-3 py-1 rounded-md text-[#292929] align-text-bottom text-lg font-semibold' style={{display: page >= totalPages ? 'none' : 'block'}}>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} >Next</button>
                    </div>
                </div>
                    )}
            </div>
        </div>
    );
};

export default ProductList;
