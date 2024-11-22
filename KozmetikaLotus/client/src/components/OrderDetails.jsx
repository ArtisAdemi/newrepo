import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import StatusModal from './StatusModal';
import OrderService from '../services/OrderService';




const OrderDetails = ({ closeOrderDetails, id, location }) => {
    const [statusModal, setStatusModal] = useState(false);
    const [order, setOrder] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [showUpdateStatus, setShowUpdateStatus] = useState(false);

    const handleEditStatus = () => {
        setStatusModal(true);
    }

    const getOrderById = async (id) => {
        try {
            await OrderService.getOrderById(id).then((res) => {
                setOrder(res);
                setTotalPrice(res.totalPrice)
            })
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (location === "admin" || location === "clients") {
            setShowUpdateStatus(true);
        }
        getOrderById(id);
    }, [id, location]);

    if (!order) { // Check if order is not loaded yet
        return <div>Loading...</div>; // Show loading state or similar message
    }

    return (
        <div>
            <div className='profile-container flex justify-center w-full -mt-16 '>
                <div className='profile-content w-[80%] justify-center md:flex'>

                    <div className='w-[100%] flex '>
                        <div className='w-[100%] flex flex-col gap-10 justify-center '>


                            <h1 className='text-[#212121] w-[100%] md:w-[100%] pb-4 mt-10 border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-xl md:text-2xl'>#{order?.id}</h1>
                            <div className='hidden md:flex flex-col md:flex-row w-full'>

                                <div className='flex md:w-[20%] flex-col md:mr-36'>
                                    {location === "admin" &&
                                        <>
                                            {location !== "clients" &&
                                                <>
                                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start order-1 md:order-none'>
                                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>First Name: </h2>
                                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.firstName}</h2>
                                                    </div>

                                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Email: </h2>
                                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.email}</h2>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    }

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Total Price: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{totalPrice.toFixed(2)}€</h2>
                                    </div>
                                    {order.additionalInfo &&
                                        <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                            <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Additional Info: </h2>
                                            <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.additionalInfo}</h2>
                                        </div>
                                    }
                                </div>


                                <div className='flex md:w-[20%] flex-col'>
                                    {location === "admin" &&
                                        <>
                                            {location !== "clients" &&
                                                <>
                                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start order-1 md:order-none'>
                                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Last Name: </h2>
                                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.lastName}</h2>
                                                    </div>

                                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Phone: </h2>
                                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.phoneNumber}</h2>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    }

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Address: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.address}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Status: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.status}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className='flex md:hidden flex-col md:flex-row w-full'>

                                <div className='flex md:w-[20%] flex-col md:mr-36'>
                                    {location === "admin" &&
                                        <>
                                            <div className='flex md:flex-col mb-8 justify-start items-center md:items-start '>
                                                <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>First Name: </h2>
                                                <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.firstName}</h2>
                                            </div>

                                            <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                                <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Last Name: </h2>
                                                <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.lastName}</h2>
                                            </div>

                                            <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                                <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Email: </h2>
                                                <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.email}</h2>
                                            </div>

                                            <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                                <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Phone: </h2>
                                                <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.User?.phoneNumber}</h2>
                                            </div>
                                        </>
                                    }
                                </div>

                                <div className='flex md:w-[20%] flex-col'>
                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start '>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Address: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.address}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start '>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Additional Info: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.additionalInfo}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Total Price: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{totalPrice.toFixed(2)}€</h2>
                                    </div>

                                    <div className='flex md:flex-col md:mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Action: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{order?.status}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row justify-between md:w-[50%]'>
                                <div onClick={closeOrderDetails} className='cursor-pointer mt-4 md:mt-0 flex items-center order-2 md:order-none'>
                                    <FontAwesomeIcon icon={faChevronLeft} color='#828282' />
                                    <h2 className='ml-3 text-[#828282]'>Back to Orders</h2>
                                </div>
                                {showUpdateStatus &&
                                    <button onClick={handleEditStatus} type="button" className="order-1 md:order-none btn btn-outline btn-accent md:-mt-5 border rounded-lg p-3 bg-[#A3A7FC] w-full md:w-[40%] text-white hover:opacity-80">
                                        Update Status
                                    </button>
                                }
                            </div>
                            <div className='md:mt-5'>
                                <h2 className='text-[#212121] pb-4  border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-xl md:text-2xl'>Products</h2>
                            </div>
                            <div className='grid justify-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 sm:justify-between '>

                                {order.Products && order?.Products.length > 0 && order?.Products.map((product, index) => (
                                    <div key={index} className="max-w-[250px] flex justify-between flex-col w-auto  bg-white shadow-lg h-[430px] mb-5">
                                        <div className="flex justify-center items-center w-full">
                                            <img className="object-contain max-w-[250px] min-h-[300px] max-h-[300px]" src={`uploads/${product?.Images[0]?.fileName}`} alt="Product" />
                                        </div>
                                        <div className="p-4">
                                            <h2 className="text-start text-xl text-[#292929] font-bold truncate">{product?.title}</h2>
                                            <p className="mt-1 text-start text-[#292929] text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">{product?.shortDescription}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <span className="text-xl text-[#292929] font-bold">€{product?.price.toFixed(2)}</span>
                                                <span className="text-md text-[#292929]">Quantity: {product?.Order_Products.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {statusModal && <StatusModal id={id} status={order.status} closeStatusModal={() => setStatusModal(false)} />}

        </div>

    )
}

export default OrderDetails

