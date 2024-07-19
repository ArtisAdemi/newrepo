import React, { useEffect, useState } from 'react'
import { Navbar } from '../components'
import {ProductDetails} from '../components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import ProductService from '../services/Products'


const SingleProduct = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(productName);
  }, [productName])

  const fetchProductById = async (id) => {
    let result;
    try {
      result = await ProductService.getProductById(id);
      setProduct(result);
    }catch (err) {
      console.log("Error fetchin product by id", err);
    }
    return result;
  }
  return (
    <div>
        <div className='flex w-full justify-center'>
          <Navbar />
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-[80%] flex justify-between p-10'>
            <div className='flex ml-[-35px]'>
              <div>
                <h2 className='text-2xl font-bold'>Produktet</h2>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className='mt-1 ml-2'>
                <span>{product?.Subcategories[0]?.name}</span>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className='mt-1 ml-2'>
                <span>{product ? product.title : 'loading'}</span>
              </div>
            </div>
          </div>
        </div>
          {product && (
            <div>
              <ProductDetails title={product.title} shortDescription={product.shortDescription} longDescription={product.longDescription} subCategory={product?.Subcategories[0]?.name} price={product.price} id={product.id} inStock={product.inStock}/>
            </div>
          )}
    </div>
  )
}

export default SingleProduct