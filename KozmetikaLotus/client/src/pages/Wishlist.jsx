import React, { useEffect, useState } from 'react'
import { Navbar, WishlistItem } from '../components';
import AuthService from '../services/AuthService';
import WishlistService from '../services/Wishlist';
import Swal from 'sweetalert2';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});


  
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

  const getUsersWishlist = async (userId) => {
    let res;
    try{
      res = await WishlistService.getUsersWishlist(userId);
      setProducts(res);
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      await WishlistService.removeFromWishlist(user.id, productId).then(() => {
        Swal.fire({
          title: "Item Removed!",
          text: "Item was successfully removed from wishlist!",
          icon:"success",
          confirmButtonText: "Ok",
        })
      });
      loadData(); // Reload wishlist data
    } catch (err) {
      console.error(err);
    }
  };
  
  const loadData = async () => {
    const userId = await getUserData();
    if (userId) {
      getUsersWishlist(userId);
    }
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className='bg-[#FAF9F5]'>
        <div className='flex w-full justify-center'>
          <Navbar />
        </div>
        <div className='pt-6 w-full flex justify-center pb-24'>
            <div className='w-[80%]'>
                <h4 className='font-semibold text-xl py-2'>Wishlist</h4>
                <div className=' w-[100%] justify-center'>
                  <div className='mt-10 md:flex md:flex-cols md:flex-wrap'>
                    {/* Wishlist item */}
                    {products.length > 0 && products.map((product, index) => (
                      <WishlistItem key={index} product={product} onRemoveItem={handleRemoveItem}/>
                      ))}
                    {/* Wishlist item end */}
                  </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Wishlist