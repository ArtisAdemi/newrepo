import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import DiscountModal from './DiscountModal';
import Orders from './Orders'



const ClientDetails = ({ closeClientDetails, user }) => {
    const [discountModal, setDiscountModal] = useState(false);

    const handleEditDiscount = () => {
        setDiscountModal(true);
    }

    return (
        <div>
            <div className='profile-container flex justify-center w-full -mt-16 pb-10'>
                <div className='profile-content w-[80%] justify-center md:flex'>

                    <div className='w-[100%] flex '>
                        <div className='w-[100%] flex flex-col gap-10 justify-center '>


                            <h1 className='text-[#212121] w-[100%] md:w-[50%] pb-4  border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-xl md:text-2xl'>{`${user.firstName} ${user.lastName}`}</h1>
                            <div className='hidden md:flex flex-col md:flex-row w-full'>

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
                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start order-1 md:order-none'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Last Name: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.lastName}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Phone: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{`0${user.phoneNumber}`}</h2>
                                    </div>
                                    {user.discount > 0 &&
                                        <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                            <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Discount: </h2>
                                            <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{`${user.discount}%`}</h2>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='flex md:hidden flex-col md:flex-row w-full'>

                                <div className='flex md:w-[20%] flex-col md:mr-36'>
                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start '>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>First Name: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.firstName}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Last Name: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.lastName}</h2>
                                    </div>

                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start'>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Email: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.email}</h2>
                                    </div>
                                </div>

                                <div className='flex md:w-[20%] flex-col'>
                                    <div className='flex md:flex-col mb-8 justify-start items-center md:items-start '>
                                        <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Phone: </h2>
                                        <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{`0${user.phoneNumber}`}</h2>
                                    </div>
                                </div>
                                {user.discount > 0 &&
                                    <div className='flex md:w-[20%] flex-col'>
                                        <div className='flex md:flex-col mb-8 justify-start items-center md:items-start '>
                                            <h2 className='md:mr-3 w-[25%] md:w-[100%] text-sm md:text-base font-medium'>Phone: </h2>
                                            <h2 className='rounded-md w-[75%] md:w-[100%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{`0${user.phoneNumber}`}</h2>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className='flex flex-col md:flex-row justify-between md:w-[50%]'>
                                <div onClick={closeClientDetails} className='cursor-pointer mt-4 md:mt-0 flex items-center order-2 md:order-none'>
                                    <FontAwesomeIcon icon={faChevronLeft} color='#828282' />
                                    <h2 className=' ml-3 text-[#828282]'>Back to Clients</h2>
                                </div>
                                <button onClick={handleEditDiscount} type="button" className="order-1 md:order-none btn btn-outline btn-accent md:-mt-5 border rounded-lg p-3 bg-[#A3A7FC] w-full md:w-[40%] text-white hover:opacity-80">
                                    Apply Discount
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Orders userId={user.id} location={"clients"} />

            {discountModal && <DiscountModal userId={user.id} discountValue={user.discount} closeDiscountModal={() => setDiscountModal(false)} />}
        </div>

    )
}

export default ClientDetails

