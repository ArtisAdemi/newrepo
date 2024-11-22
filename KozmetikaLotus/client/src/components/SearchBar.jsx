import React, { useEffect, useState } from "react";
import ProductService from "../services/Products";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [productName, setProductName] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.getSearchResult(productName);
        if (result) {
          setProducts(result);
          setSearchModal(result.length > 0);
        } else {
          setProducts([]);
          setSearchModal(false);
        }
      } catch (err) {
        console.log("Error fetching products: ", err);
        setProducts([]);
        setSearchModal(false);
      }
    };
    if (productName.length > 1) {
      fetchProducts();
    } else {
      setSearchModal(false);
      setProducts([]);
    }
  }, [productName]);

  const onClickProduct = (product) => {
    navigate(`/products/all/${product.id}`);
    setSearchModal(false);
    setProductName("");
  };

  return (
    <div>
      <div className="relative flex items-center md:p-2 md:pr-4 md:-ml-6 md:end-1 md:mb-[3px] cursor-pointer">
        <input
          value={productName}
          className="border border-1 w-[100px] md:w-[200px] lg:w-[250px] border-[#0C0C0C4F] rounded-md p-1 px-6 "
          style={{ color: "black" }}
          type="text"
          onChange={handleInputChange}
          placeholder="Kerko..."
        />
        {searchModal && (
          <div
            className="modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] shadow-lg w-[300px] px-4" // Close modal when not hovering
            style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }} // Center modal directly below the Profile Icon
          >
            <div className="w-full flex justify-center">
              <div className="w-[90%] justify-center">
                <div className="test flex justify-center flex-col items-center">
                  <div className="mt-4 text-start items-start align-middle w-full pb-4">
                    <div className="flex flex-col border-[0.5px] border-x-0 border-t-0 border-gray-500">
                      <h2 className="text-gray-500 font-semibold">
                        Rezultatet:
                      </h2>
                      {/* Product cart */}
                      {products.map((product, index) => (
                        <div
                          key={index}
                          className="border-[0.5px] border-x-0 border-b-0 py-1 m-1 border-gray-500"
                          onClick={() => onClickProduct(product)}
                        >
                          {/* <hr className='border-0 h-[0.3px] bg-black my-4'/> */}
                          <div className="flex w-full max-h-[40px]">
                            <div className="w-1/3">
                              {product.Images && product.Images.length > 0 ? (
                                <img
                                  src={`/uploads/${product.Images[0].fileName}`}
                                  className="object-contain h-12 w-full"
                                  alt=""
                                />
                              ) : (
                                <div className="object-contain h-12 w-full bg-gray-200 flex items-center justify-center">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="pl-3 w-2/3 flex flex-col justify-center items-start truncate">
                              <div className="truncate font-semibold text-xs">
                                {product?.title}
                              </div>
                              <div className="truncate font-semibold text-xs">
                                {product?.price}€
                              </div>
                            </div>
                          </div>
                          {/* <hr className='border-0 h-[0.3px] bg-black my-4'/> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
