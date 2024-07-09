import React, {useState, useEffect} from 'react';
import { Navbar } from '../components';
import AuthService from '../services/AuthService';
import UserForm from '../components/UserForm';
import OrderService from '../services/OrderService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails';

const Profile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(0)
    const [totalPriceForOrder, setTotalPriceForOrder] = useState(0)
    const [totalPages, setTotalPages] = useState(1);
    const [displayedOrders, setDisplayedOrders] = useState(10);

    const handleOrderDetails = (id, totalPrice) => {
        setSelectedOrderId(id);
        setTotalPriceForOrder(totalPrice);
        setOrderDetails(true);
      }

    // const getUserData = async () => {
    //     let res;
    //     try{
    //       res = await AuthService.decodeUser();
    //       setUser(resemai.data);
    //     } catch (err) {
    //       console.error(err)
    //       return null;
    //     }
    //   }

    const loadMoreOrders = () => {
        setDisplayedOrders(prevCount => prevCount + 10); // Load 10 more orders
    };

    const getUserData = async () => {
        await AuthService.decodeUser().then((data) => {
            if(data.message === "Token is expired, Log in again"){
                Swal.fire({
                    title: "You are logged out!",
                    text:"Please log in again",
                    icon:"warning",
                    confirmButtonText: "Log In",
                }).then((confirmed) => {
                    if(confirmed.isConfirmed){
                        localStorage.removeItem("token")
                        navigate("/login")
                    }
                })
            }
            setUser(data);
        })
    }

    const getOrders = async () => {
        await OrderService.getOrdersByUser(null, displayedOrders).then((data) => {
            setOrders(data.orders);
            setTotalPages(data.totalPages)
        })
    }


      const handleEditProfile = () => {
        setIsEditing(true);
      }

      useEffect(() => {
        getUserData();
        getOrders();
      }, [displayedOrders])

    return (
        <div>
            <div className='flex w-full justify-center'>
                <Navbar />
            </div>

            <div className='profile-container flex justify-center w-full md:my-12'>
                <div className='profile-content w-[80%] justify-center md:flex'>
                    
                    <div className='w-[100%] flex '>
                        <div className='w-[100%] flex flex-col gap-10 justify-center my-12'>


                            <h1 className='text-[#212121] w-[100%] md:w-[50%] pb-4  border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-3xl'>My Profile</h1>
                            <div className='flex flex-col md:flex-row w-full'>

                                <div className='flex md:w-[20%] flex-col md:mr-36'>
                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start order-1 md:order-none'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>First Name: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.firstName}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Email: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.email}</h2>
                                    </div>
                                </div>

                                <div className='flex md:w-[20%] flex-col'>
                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Last Name: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.lastName}</h2>
                                    </div>

                                    <div className='flex md:flex-col md:mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Phone: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.phoneNumber}</h2>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleEditProfile} className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-full md:w-[20%]  text-[#FFFFFF] shadow-xl hover:opacity-80'>
                                Edit Profile
                            </button>

                        </div>
                    </div>

                    
          
                </div>
            </div>
            {!orderDetails && 
                <div className='orders-container flex justify-center w-full my-12'>
                    <div className='orders-content w-[80%] flex flex-col'>
                        <div className='flex items-center p-2 w-full justify-between md:justify-normal border border-b-[#BDBDBD] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-xl md:text-2xl text-[#212121] font-semibold'>Recent Orders</h2>
                        </div>
                        <div className='hidden md:flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Order #</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Date</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Ship To</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Order Total</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Status</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Action</h2>
                        </div>

                        {/* STATIC ORDER DATA */}
                        {orders?.length > 0 && orders.map((order, index) => {
                        let totalPrice = 0; // Initialize totalPrice to 0 for each order
                        if (order.Products) {
                            order.Products.forEach(product => {
                                totalPrice += (product.price * product.Order_Products.quantity);
                            });
                        }

                         // Format the date
                        const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB'); // 'en-GB' uses day/month/year format

                        return (
                            <div className='flex justify-between items-center p-2 md:pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0' key={index}>
                                <h2 className='text-[#333333] md:text-lg w-[2%] md:w-[16.6%]'>{order.id}</h2>
                                <h2 className='text-[#333333] md:text-lg md:w-[16.6%]'>{formattedDate}</h2>
                                <h2 className='hidden md:block text-[#333333] md:text-lg w-[16.6%]'>{order.address}</h2>
                                <h2 className='text-[#333333] md:text-lg w-[16.6%]'>${totalPrice.toFixed(2)}</h2> {/* Display the calculated total price */}
                                <h2 className='hidden md:block text-[#333333] md:text-lg w-[16.6%]'>{order.status}</h2>
                                <h2 onClick={() => handleOrderDetails(order.id, totalPrice)} className='text-[#828282] text-end md:text-start md:text-lg w-[16.6%] cursor-pointer'>View</h2>
                            </div>
                        );
                    })}
                    {totalPages > 1 && (
                        <button className='underline' onClick={loadMoreOrders}>Load More Orders</button>
                        )}
                    </div>        
                </div>
                }
                {orderDetails && <OrderDetails closeOrderDetails={() => setOrderDetails(false)} id={selectedOrderId} totalPrice={totalPriceForOrder}/>}
                {isEditing && <UserForm closeModal={() => setIsEditing(false)} user={user} setUser={setUser} />}
        </div>

    )
}

export default Profile

