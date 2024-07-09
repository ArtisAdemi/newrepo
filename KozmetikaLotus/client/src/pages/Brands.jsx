import { useEffect, useState } from 'react'
import { Navbar } from '../components'
import {useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList';


const BrandsPage = () => {
  // Getting subCategory from url
  const [brandNameValue, setBrandNameValue] = useState("");
  const { brandName } = useParams();
  const [productName, setProductName] = useState("");

  useEffect(() => {
    // updating subCategory
    setBrandNameValue(brandName.toLowerCase());
  }, [brandNameValue]);


  const handleInputChange = (e) => {
    setProductName(e.target.value);
  }

  return (
    <div>
        <div className='flex w-full justify-center'>
          <Navbar />
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-[80%] md:flex justify-between p-10 md:ml-[-35px]'>
            <div className='flex items-center justify-center'>
              <div>
                <h2 className='text-2xl font-bold text-[#292929]'>Produktet</h2>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} color='#292929'/>
              </div>
              <div className='mt-1 ml-2 text-[#292929]'>
                <span>{brandName}</span>
              </div>
            </div>
            <div className='flex justify-center'>
              <input className='border border-1 w-[180px] md:w-[250px] border-[#0C0C0C4F] rounded-md p-1 px-6 ' style={{color: 'black'}} type="text" onChange={handleInputChange}  placeholder='Kerko...'/>
            </div>
          </div>
        </div>
        <div>
          <ProductList brand={brandName.replace(/-/g, ' ')}/>
        </div>
    </div>
  )
}

export default BrandsPage;