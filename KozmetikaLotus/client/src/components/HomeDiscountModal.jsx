import React from "react";
import {useNavigate} from 'react-router-dom';
import image from "../images/ContactUs.png"
import { MdOutlineCancel } from "react-icons/md";

const HomeDiscountModal = ({ closeHomeDiscount }) => {

    const navigate = useNavigate();

    const registerHomeDiscount = () => {
        navigate("/register");
        closeHomeDiscount();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white  max-w-lg w-full space-y-4">

                <div className="w-full flex flex-col items-end">
                    <MdOutlineCancel onClick={closeHomeDiscount} className="absolute m-2 cursor-pointer" size={40}/>
                    <img src={image} className="h-[500px] w-full object-cover"/>
                </div>

                <div className="w-[80%] mx-auto flex flex-col justify-center items-center">
                    <h2 className="font-bold text-4xl mb-5 mt-2">Fito 15% Lirim</h2>
                    <h2 className=" mb-5">Regjistrohu dhe fito 15% lirim në porosinë e parë</h2>

                    <button onClick={registerHomeDiscount} className="w-full py-3 mb-5 bg-[#A3A7FC] text-[#FFFFFF] cursor-pointer hover:opacity-80">
                        Regjistrohu
                    </button>
                </div>

            </div>
        </div>
    );
  };
  
  export default HomeDiscountModal