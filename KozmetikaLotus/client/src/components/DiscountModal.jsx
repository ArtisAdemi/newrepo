import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserService from '../services/Users';


const DiscountModal = ({ closeDiscountModal, userId, discountValue }) => {
  const [newValue, setNewValue] = useState(discountValue)



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await UserService.giveDiscount(userId, newValue);
      closeDiscountModal();
    } catch (error) {
      console.error("Error changing discount:", error);
    }
  };

  const onChangeInput = (e) => {
    setNewValue(e.target.value)
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Discount</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          <div className='flex items-center pb-6'>
            <p className='text-xs font-semibold'>The discount given will be % value based. Next order the user makes will spend the discount.</p>
          </div>
          <div className='flex items-center'>
            <h2 className='mr-3 w-2/3'>Current Value: </h2>
            <input onChange={onChangeInput} type="text" name="discount" value={newValue} placeholder="0" required className="input p-3 input-bordered w-[100px] border-2 rounded-md border-black" />
            <span>%</span>
          </div>


          <div className="flex justify-end space-x-2">

            <button type="button" onClick={closeDiscountModal} className="btn btn-outline btn-accent border rounded-lg p-3 bg-[#A3A7FC] text-white hover:opacity-80">
              Cancel
            </button>

            <button type="submit" className="btn btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80">
              Apply Discount
            </button>

          </div>
          {/* More input fields and submission button */}
        </form>
      </div>
    </div>
  );
};

export default DiscountModal;