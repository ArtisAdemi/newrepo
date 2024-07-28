import React, { useEffect, useState } from 'react'
import ProductService from '../services/Products';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [productName, setProductName] = useState("");
    const [searchModal, setSearchModal] = useState(false);
    const [products, setProducts] = useState([])
    const page = 1;
    const limit = 5;
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setProductName(e.target.value);
    }

    const fetchProducts = async () => {
      try{
        const filterModel = {
          subCategory: null,
          name: productName ? productName : null,
          brand: null,
          page: page,
          limit: limit,
        };

        const result = await ProductService.getProductsByFilter(filterModel);
        if (result) {
          setProducts(result.products)
          setSearchModal(result.products.length > 0);
        } else {
          setProducts([]);
          setSearchModal(false);
        }
      } catch (err) {
        console.log("Error fetching products: ", err);
        setProducts([]);
        setSearchModal(false);
      }
    }

    useEffect(() => {
      if(productName.length > 1){
        fetchProducts();
      } else {
        setSearchModal(false);
        setProducts([]);
      }
    }, [productName])
    
    const onClickProduct = (product) => {
      navigate(`/products/all/${product.id}`);
      setSearchModal(false);
      setProductName("");
    }

    return (
      <div>
        <div className='relative flex items-center p-2 pr-4 -ml-6 end-1 mb-[3px] cursor-pointer'>
          <input value={productName} className='border border-1 sm:w-[150px] md:w-[200px] lg:w-[250px] border-[#0C0C0C4F] rounded-md p-1 px-6 ' style={{color: 'black'}} type="text" onChange={handleInputChange}  placeholder='Kerko...'/>
          {searchModal && 
            <div className='modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] w-[300px] px-4' // Close modal when not hovering
              style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} // Center modal directly below the Profile Icon
            >
              <div className='w-full flex justify-center'>
                <div className='w-[90%] justify-center'>
                  <div className='test flex justify-center flex-col items-center'>
                    <div className='mt-4 text-start items-start align-middle w-full pb-4'>
                      <div className='flex flex-col'>
                        {/* Product cart */}
                        {products.map((product, index) => (
                          <div key={index} className='' onClick={() => onClickProduct(product)}>
                            <div className='flex w-full'>
                              <div className='w-1/3'>
                                {product.Images && product.Images.length > 0 ? (
                                  <img src={`/uploads/${product.Images[0].fileName}`}
                                    className='object-contain h-24 w-24'
                                    alt="" />
                                ) : (
                                  <div className='object-contain h-24 w-24 bg-gray-200 flex items-center justify-center'>
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className='ml-2 w-2/3 flex flex-col justify-center items-start truncate'>
                                <div className='truncate font-semibold'>
                                  {product?.title}
                                </div>
                                <div className='truncate font-semibold'>
                                  {product?.price}€
                                </div>
                              </div>
                            </div>
                            <hr className='border-0 h-[0.3px] bg-black my-4'/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
}

export default SearchBar