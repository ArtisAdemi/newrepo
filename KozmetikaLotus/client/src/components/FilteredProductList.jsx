import React, { useEffect, useState, useRef } from 'react';
import ProductListItem from './ProductListItem';
import ProductService from '../services/Products';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FilteredProductList = ({ filter }) => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(() => {
        // Initialize page state from local storage
        const savedPage = localStorage.getItem("currentFilteredPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const limit = 12; // Assuming each page shows 12 products
    const navigate = useNavigate();
    const prevFilterRef = useRef(filter);

    useEffect(() => {
        let lastFilter = localStorage.getItem("lastFilter");
        if (lastFilter !== filter) {
            setPage(1);
            localStorage.setItem("currentFilteredPage", 1);
            localStorage.setItem("lastFilter", filter);
            fetchFilteredProducts(1);
        }
    }, [filter]);

    useEffect(() => {
        // Scroll to top whenever the page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    useEffect(() => {
        fetchFilteredProducts(page);
    }, [filter, page]);

    const fetchFilteredProducts = async (currentPage) => {
        try {
            const result = await ProductService.getFilteredProducts({
                page: currentPage,
                limit: limit,
                filter: filter,
            });
            if (result) {
                setProducts(result.products);
                setTotalProducts(result.totalProducts);
                setTotalPages(result.totalPages);
            }
        } catch (err) {
            console.error("Error fetching filtered products:", err);
            Swal.fire({
                title: "Error!",
                text: "Could not fetch filtered products",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };


    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        localStorage.setItem("currentFilteredPage", newPage);
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
                <button key={i} onClick={() => handlePageChange(i)} className={`m-1 px-3 py-1 rounded-md ${i === page ? "bg-gray-300" : "bg-white"}`}>
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
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer">
                    {products.length > 0 &&
                        products.map((product, index) => (
                            <div key={index}>
                                <ProductListItem
                                    title={product.title}
                                    shortDescription={product.shortDescription}
                                    longDescription={product.longDescription}
                                    price={product.price}
                                    id={product.id}
                                    inStock={product.inStock}
                                    productImage={product?.Images[0]?.fileName}
                                />
                            </div>
                        ))}
                </div>
                {totalPages > 1 && (
                    <div className="w-full flex justify-center mt-4">
                        <div className="flex items-center">
                            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="m-1 px-3 py-1 rounded-md bg-white">
                                Previous
                            </button>
                            {renderPagination()}
                            <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} className="m-1 px-3 py-1 rounded-md bg-white">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilteredProductList;
