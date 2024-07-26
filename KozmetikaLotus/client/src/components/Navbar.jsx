import {React, useState, useEffect} from 'react';
import LotusLogo from '../Icons/LotusLogo'
import CategoryService from '../services/Categories';
import {useNavigate} from 'react-router-dom';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import Logout from "../helpers/Logout"
import UserService from '../services/Users';
import AuthService from '../services/AuthService';
import { setIsCartOpen } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import ProductService from '../services/Products';
import WishlistService from '../services/Wishlist';
import { setWishlistLength } from '../state';
import SearchBar from './SearchBar';


const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [nav, setNav] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [user, setUser] = useState({});
    const { logout } = Logout();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart)
    const wishlistLength = useSelector((state) => state.cart.wishlist)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen)
    const [subCategories, setSubCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [brands, setBrands] = useState([]);
    const [brandModal, setBrandModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);



    const handleNav = () => {
        setNav(!nav);
    };

   
    const redirect = (name) => {
        name = name.toString().toLowerCase().replace(/\s+/g, '-');
        navigate(`/products/${name}`);
        handleNav(); // addition to remove navbar after navigating to categories..
    }

    const navProfile = () => {
        navigate('/profile');
    }
    const navWishList = () => {
        navigate('/wishlist');
    }

  useEffect(() => {
    const fetchWishlistItems = async () => {
        try {
          let token = localStorage.getItem("token")
          if (token) {
            if(user.id){
              const userId = user.id;
              await WishlistService.getUsersWishlist(userId).then((res) => {
                setWishlist(res);
                dispatch(setWishlistLength(res.length))
              });
            }
          }
        } catch (error) {
            console.error("Error fetching wishlist", error);
        }
    };
    fetchWishlistItems();
}, [user]);

    const isLoggedIn = async () => {
        const user = await UserService.validateToken();
        if(user){
            setCurrentUser(true);
        }
    }
    const getUserData = async () => {
        let res;
        try{
          res = await AuthService.decodeUser();
          setUser(res);
        } catch (err) {
          console.error(err)
          return null;
        }
      }

      const fetchBrands = async () => {
        await ProductService.getBrands().then((brands) => {
          setBrands(brands);
        });
      }

    useEffect(() => {
        if (token) {
            getUserData();
        }
        isLoggedIn();
        fetchCategories();
        fetchBrands();
      }, [])

      useEffect(() => {
        // When the navbar is open, prevent scrolling on the body
        if (nav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [nav]);


      const fetchCategories = async () => {
        let result;
      
        try{
              result = await CategoryService.getCategories();
              if (result) {
                setCategories(result);
              }

        } catch (err) {
          console.error("Error:", err)
        }
      }

    

    const handleCategoryHover = async (categoryId) => {
        try {
          if (selectedCategory !== categoryId) {
            // Fetch subcategories only if a new category is hovered
            const subCategoriesData = await CategoryService.getSubcategories(categoryId);
            setSubCategories({ [categoryId]: subCategoriesData });
            setSelectedCategory(categoryId);
          }
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      const handleCategoryMobile = async (categoryId) => {
        try {
          if (selectedCategory !== categoryId) {
            const subCategoriesData = await CategoryService.getSubcategories(categoryId);
            if (subCategoriesData.length === 1) {
              redirect(subCategoriesData[0].name);
              setShowModal(false);
            } else {
              setSubCategories({ [categoryId]: subCategoriesData });
              setSelectedCategory(categoryId);
            }
          }
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };
    
      const closeModal = () => {
        setSelectedCategory(null);
        setSubCategories({});
      };

     // console.log(brands);

      // Swap categories logic
  if (categories.length >= 3) {
    const categoriesCopy = [...categories];
    const temp = categoriesCopy[0];
    categoriesCopy[0] = categoriesCopy[2];
    categoriesCopy[2] = temp;
  


  return (
    <div className='navbar-wrapper flex flex-col w-[100%]'>

    <div className='pages-navbar flex justify-between bg-[#FFFFFF] pr-10 md:px-[9%] w-[100%]  p-4 pb-8'>
        <div>
            <div className='absolute top-2 md:top-4 cursor-pointer' onClick={() => navigate("/")}>
                <LotusLogo />
            </div>
        </div>
        <div className='justify-between items-center gap-x-5 mt-1 -mb-3 hidden md:flex md:translate-x-[4rem]'> 
            <div className='m-2 ml-32'>
                <p><a href="/">Home</a></p>
            </div>
            
            <div className='m-2'>
                <p><a href="/about">About Us</a></p>
            </div>
            <div className='m-2'>
                <p><a href="/contact">Contact Us</a></p>
            </div>
            {
            (user.role === 'admin') &&
                (<div className='m-2'>
                    <p><a href="/admin">Admin</a></p>
                </div>) 
        
            }
        </div>
        <div className=' hidden md:flex mt-1 -mb-3 justify-between items-center relative'>
            {/* Wishlist Icon*/}
            {currentUser && 
                <div onClick={navWishList} className='relative wishlist flex items-center p-2 pr-4 -ml-6 mb-[3px] cursor-pointer'>
                    <FaRegHeart size={22}/>
                    <span className="text-xs absolute right-0 top-0 transform translate-x-50% -translate-y-50% text-white bg-red-700 font-semibold rounded-full pr-1 p-1">{wishlistLength && wishlistLength > 0 ? wishlistLength : "0"}</span>
                </div>
            }

            {/* Shopping cart icon */}
            <div onClick={() => dispatch(setIsCartOpen({}))} className="relative p-2 pr-4 hover:cursor-pointer">
                <IoCartOutline size={25}/>
                <span className="text-xs absolute top-0 right-[0] transform translate-x-50% -translate-y-50% text-white bg-red-700 font-semibold rounded-full p-1">{cart.length > 0 ? cart.length: "0"}</span>
            </div>

            <div className='m-2 relative'
                 onMouseEnter={() => setProfileModal(true)} // Open profile modal on hover
                 onMouseLeave={() => setProfileModal(false)} // Close profile modal when not hovering
            >   
            {/* User Profile Icon */}
                <FaRegUser size={20} className='hover:cursor-pointer mr-2'/>
                {profileModal &&
                    <div className='modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] w-[300px] px-4'
                    onMouseEnter={() => setProfileModal(true)} // Open modal on hover
                    onMouseLeave={() => setProfileModal(false)} // Close modal when not hovering
                    style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} // Center modal directly below the Profile Icon
                    >
                        <div className='w-full flex justify-center'>
                            <div className='w-[90%] justify-center'>
                                <div className='test flex justify-center flex-col items-center'>
                                <div className='mt-4 text-start items-start align-middle w-full pb-4'>
                                    {currentUser  ? (
                                    <div>

                                        <h2 className='text-[#101817] text-lg font-semibold mb-1'>My Profile</h2>                     
                                        <div onClick={navProfile} className='profile flex items-center border rounded-lg p-2 mb-1 cursor-pointer border-[#A2A2A2]'>
                                            <FaRegUserCircle size={20}/>
                                            <h2 className='ml-3 text-[#101817] w-[100%] text-sm font-semibold '>Account Information</h2>
                                        </div>
                                        <p className='text-red-700 text-sm ml-1'><a href="/login" onClick={logout}>Log Out</a></p> 
                                    </div>
                                    ) : (
                                        <div onClick={() => navigate('/login')} className='profile flex items-center border rounded-lg p-2 cursor-pointer border-[#A2A2A2]'>
                                            <FaRegUserCircle size={20}/>
                                            <h2 className='ml-3 text-[#101817] w-[100%] text-sm font-semibold '>Log In</h2>
                                        </div>                                          
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
          <div className='translate-x-[1rem]'>
            <SearchBar />
          </div>
            
        </div>     
        
        <div onClick={handleNav} className='block md:hidden mt-1 -mb-3 cursor-pointer'>
            {nav ? <AiOutlineClose size={25} color='#292929'/> : <AiOutlineMenu size={25} color='#292929'/>}    
        </div>
        
        <div className={nav ? 'z-50 fixed overflow-auto  left-0 top-0 w-[100%] block md:hidden border-r h-full bg-[#FFFFFF] ease-in-out duration-500' : 'fixed left-[-100%]'}>
            <div className='flex items-center border-b border-[#DFDFDF]'>
                <div className='cursor-pointer absolute left-4 top-6' onClick={handleNav}>
                    <AiOutlineClose size={25} color='#292929'/>
                </div>
                <div className='flex justify-center items-center mx-auto'>
                  <div className='mr-3 mt-2'>
                    <LotusLogo />
                  </div>
                </div>
            </div>
            <div>
                <ul className='p-4'>
                    <li className='p-4 font-semibold text-[#292929] border-b border-[#DFDFDF]'><a href="/">Home</a></li>
                    <li className='p-4 font-semibold text-[#292929] border-b border-[#DFDFDF]'><a href="/about">About Us</a></li>
                    <li className='p-4 font-semibold text-[#292929] border-b border-[#DFDFDF]'><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
            <div className="categories mt-3 ml-3 overflow-auto">

              <h1 className="text-[#292929] text-sm font-semibold p-4 w-[95%] border-b border-[#DFDFDF]">Categories</h1>
              <div>
                <h2 className="text-[#292929] ml-2 font-semibold cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]" onClick={() => {redirect('all'); setBrandModal(!brandModal)}}>
                  All
                </h2>
                <div>
                  <h2 className='text-[#292929] ml-2 font-semibold cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]'
                    onClick={() => {setBrandModal(!brandModal); setShowModal(false)}}>
                    Marka
                  </h2>
                  {brandModal && (
                      <div className="dropdown-content w-[94%] left-2 top-full py-2 shadow-md shadow-[#FFFFFF] rounded-lg">
                      {brands.map((brand, index) => (
                        <p
                          key={index}
                          className="text-[#292929] font-semibold capitalize cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]"
                          onClick={() => {redirect(`brands/${brand.name}`); setBrandModal(!brandModal)}}
                        >
                          {brand.name}
                        </p>
                      ))}
                    </div>
                    )
                  }
                </div>
                
                {categories.map((category) => (
                <div key={category.id} className="m-2 relative text-[#292929]">
                  {subCategories[category.id]?.length === 1 ? (
                    <p
                      className="text-[#292929] font-semibold cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]"
                      onClick={() => {redirect(subCategories[category.id][0].name); setBrandModal(false)}}
                    >
                      {category.name}
                    </p>
                  ) : (
                    <p
                      className="text-[#292929] font-semibold cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]"
                      onClick={() => {handleCategoryMobile(category.id); setShowModal(!showModal); setBrandModal(false)}}
                    >
                      {category.name}
                    </p>
                  )}
                  {selectedCategory === category.id && showModal && subCategories[category.id]?.length > 1 && (
                    <div className="dropdown-content w-[94%] left-2 top-full py-2 shadow-md shadow-[#FFFFFF] rounded-lg">
                      {subCategories[category.id]?.map((subCategory, index) => (
                        <h2
                          key={index}
                          className="text-[#292929] ml-5 capitalize font-semibold cursor-pointer p-3 border-b border-[#DFDFDF]"
                          onClick={() => {redirect(subCategory.name); setShowModal(!showModal); setBrandModal(false)}}
                        >
                          {subCategory.name}
                        </h2>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
            <div className='profile mt-10 ml-3'>
                <h1 className='text-[#292929] text-sm font-semibold p-4 w-[95%] border-b border-[#DFDFDF]'>Profile</h1>
                <ul className='p-4'>    
                {currentUser ? (
                    <div>
                        <div onClick={navProfile} className='profile flex items-center p-3 mb-2 border-b border-[#DFDFDF]'>
                        <FaRegUserCircle size={20}/>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Account Information</h2>
                    </div>
                    {/* Shopping cart icon */}
                    <div onClick={() => {dispatch(setIsCartOpen({})); handleNav()}} className="cart flex items-center p-1 mb-2 border-b border-[#DFDFDF]">
                        <IoCartOutline size={25}/>
                        <span className="text-xs top-0 mb-5 right-[0] transform translate-x-50% -translate-y-50% text-white bg-red-700 font-semibold rounded-full p-1">{cart.length > 0 ? cart.length: "0"}</span>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Shopping Cart</h2>
                    </div>
                    <div onClick={navWishList} className='wishlist flex items-center p-3 mb-2 border-b border-[#DFDFDF]'>
                        <FaRegHeart size={20}/>
                        <h2 className=' ml-3 text-[#101817] w-[100%] text-md font-semibold '>My Wishlist</h2>
                    </div>
                    {
                    (user.role === 'admin') &&
                        (<div onClick={() => navigate('/admin')} className='wishlist flex items-center p-3 mb-2 border-b border-[#DFDFDF]'>
                            <h2 className='text-[#101817] w-[100%] text-md font-semibold'>Admin</h2>
                        </div>) 
                    }
                    <li className='p-3 font-semibold text-red-700 border-b border-[#DFDFDF]' onClick={logout}><a href="/">Log out</a></li>
                    </div>
                ) : (
                    <div>
                    <div onClick={() => {dispatch(setIsCartOpen({})); handleNav()}} className="cart flex items-center p-1 mb-2 border-b border-[#DFDFDF]">
                        <IoCartOutline size={25}/>
                        <span className="text-xs top-0 mb-5 right-[0] transform translate-x-50% -translate-y-50% text-white bg-red-700 font-semibold rounded-full p-1">{cart.length > 0 ? cart.length: "0"}</span>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Shopping Cart</h2>
                    </div>
                    <div onClick={() => navigate('/login')} className='profile flex items-center p-3 mb-2 cursor-pointer border-b border-[#DFDFDF]'>
                        <FaRegUserCircle size={20}/>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Log In</h2>
                    </div>
                    </div>
                    )         
                }           
                    
                </ul>
            </div>
        </div>

    </div>

    <div className='categories-navbar bg-[#292929] w-full hidden md:flex'>
        <div className='modal-content w-[90%] mx-auto flex justify-between py-4 items-center overflow-auto scrollbar scrollbar-thumb-white scrollbar-thin scrollbar-track-[#292929]'>
            <h2 className='text-[#FFFFFF]  text-lg cursor-pointer' onClick={() => redirect("all")}>All</h2>

            <div className='m-2 '
                 onMouseEnter={() => setBrandModal(true)} // Open modal on hover
                 onMouseLeave={() => setBrandModal(false)} // Close modal when not hovering
            >
                <h2 className='text-[#FFFFFF]  text-lg cursor-pointer'>Marka</h2>
                {brandModal &&
                     <div className="modal-overlay absolute top-[130px] left-[10%] right-[10%] bg-[#292929] px-8 py-3 shadow-md shadow-[#FFFFFF] rounded-lg">
                     <div className="modal flex items-center justify-center">
                       <div className="flex flex-wrap gap-y-2 gap-x-10 justify-center items-center">
                         {brands.map((brand, index) => (
                           <h2 key={index}   className="text-[#FFFFFF] text-sm cursor-pointer hover:underline capitalize" onClick={() => {redirect(`brands/${brand.name}`); setBrandModal(!brandModal)}}>
                             {brand.name}
                           </h2>
                         ))}
                       </div>
                     </div>
                   </div>
                }
            </div>

            
            {categoriesCopy.map((category) => (
            <div key={category.id} className="m-2 text-[#FFFFFF]" onMouseLeave={closeModal}>
              {subCategories[category.id]?.length === 1 ? (
              <p
                className="cursor-pointer text-lg whitespace-nowrap"
                onClick={() => redirect(subCategories[category.id][0].name)}
              >
                {category.name}
              </p>
              ) : (
              <p
                className="cursor-pointer text-lg whitespace-nowrap"
                onMouseEnter={() => handleCategoryHover(category.id)}
              >
                {category.name}
              </p>
              )}
              {selectedCategory === category.id && subCategories[category.id]?.length > 1 &&  (
                <div className="modal-overlay absolute top-[130px] left-[10%] right-[10%] bg-[#292929] px-8 py-3 shadow-md shadow-[#FFFFFF] rounded-lg">
                  <div className="modal flex items-center justify-center">
                    <div className="flex flex-wrap gap-y-2 gap-x-10 justify-center items-center">
                      {subCategories[category.id]?.map((subCategory, index) => (
                        <h2 key={index} className="text-[#FFFFFF] text-sm cursor-pointer hover:underline capitalize" onClick={() => redirect(subCategory.name)}>
                          {subCategory.name}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            ))}

        </div>
    </div>
    </div>

  )}
}

export default Navbar