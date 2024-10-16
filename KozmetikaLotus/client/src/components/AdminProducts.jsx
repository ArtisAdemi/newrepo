import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList';
import FilteredProductList from '../components/FilteredProductList'; // Import FilteredProductList
import ProductFormModal from '../components/ProductForm';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [reload, setReload] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  }

  const selectChange = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleReload = () => {
    setReload(true);
  }

  return (
    <div>
      <div className='w-full flex justify-center'>
        <div className='w-[80%] md:flex justify-between p-10 md:ml-[-35px]'>
          <div className='flex items-center justify-center'>
            <div>
              <h2 className='text-2xl font-bold'>Produktet</h2>
            </div>
            <div className='mt-1 ml-2'>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-center items-center'>
            <select
              className='md:mr-3 border w-[190px] mt-3 md:mt-0 border-[#0C0C0C] bg-[#0C0C0C] text-[#FFF] hover:opacity-85 p-1 px-6 font-semibold'
              onChange={selectChange}
              value={selectedOption}
            >
              <option value="all">Show All</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="inStock">In Stock</option>
            </select>
            <button
              className='md:mr-3 border w-[190px] mt-3 md:mt-0 border-[#0C0C0C] bg-[#0C0C0C] text-[#FFF] hover:opacity-85 p-1 px-6 font-semibold'
              onClick={() => setIsModalOpen(true)}
            >
              Add New Product
            </button>
            <input className='border w-[190px] mt-3 md:mt-0 border-1 border-[#0C0C0C4F] p-1 px-6' style={{ color: 'black' }} onChange={handleInputChange} type="text" placeholder='Kerko...' />
          </div>
        </div>
      </div>
      <div>
        {selectedOption === "all" ? (
          <ProductList isAdmin={true} productName={productName} reload={reload} setReload={setReload} />
        ) : (
          <FilteredProductList filter={selectedOption} />
        )}
      </div>
      {isModalOpen && <ProductFormModal closeModal={() => setIsModalOpen(false)} handleReload={handleReload} />}
    </div>
  );
}

export default AdminProducts;
