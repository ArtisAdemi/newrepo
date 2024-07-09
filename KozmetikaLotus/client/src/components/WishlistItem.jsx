import React, { useEffect, useState } from 'react'
import XIcon from '../Icons/XIcon';
import AuthService from '../services/AuthService';
import WishlistService from '../services/Wishlist';
import { useNavigate } from 'react-router-dom';

const WishlistItem = ({product, onRemoveItem}) => {
  const {title, price, id} = product;
  const productImg = product.Images[0].fileName;
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0)
  const navigate = useNavigate();


  
  const getUserData = async () => {
    let res;
    try{
      res = await AuthService.decodeUser();
      setUser(res);
      return res.id
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  const redirect = () => {
    navigate(`/products/all/${id}`)
  }
  

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className='md:flex md:px-3 md:py-2 md:h-150px w-[200px] md:w-1/2 mx-auto md:mx-0 cursor-pointer mb-8 md:mb-0'>
        <div onClick={redirect} className=''>
          <img src={`/uploads/${productImg}`} className='w-[160px] mx-auto h-[130px] object-contain' alt="ASD" />
        </div>
        <div onClick={redirect} className='md:flex md:flex-col md:justify-between md:ml-10'>
          <div className='md:pl-6 md:pt-6'>
              <h2 className='text-sm underline px-3'>{title}</h2>
          </div>
          <div className='md:pl-6 md:pb-6'>
              <p className='text-md font-semibold px-3'>{price}€</p>
          </div>
        </div>
        <div className='md:pl-6 md:pt-6'>
          <div className='cursor-pointer px-3 md:px-0' onClick={() => onRemoveItem(id)}>
            <XIcon />
          </div>
        </div>
    </div>
  )
}

export default WishlistItem