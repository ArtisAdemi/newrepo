import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import image from "../images/ContactUs.png"
import { MdOutlineCancel } from "react-icons/md";

const HomeDiscountModal = ({ closeHomeDiscount }) => {

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const registerHomeDiscount = () => {
        navigate("/register");
        closeHomeDiscount();
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white max-w-md w-[90%] relative rounded-lg">
                <MdOutlineCancel
                    onClick={closeHomeDiscount}
                    className="absolute right-2 top-2 cursor-pointer z-10"
                    size={30}
                />

                <div className="w-full">
                    <img src={image} className="h-[400px] w-full object-cover" alt="img" />
                </div>

                <div className="w-[80%] mx-auto py-6 flex flex-col justify-center items-center">
                    <h2 className="font-bold text-2xl mb-3">Perfitoni 10% Zbritje</h2>
                    <h2 className="mb-4 text-sm">Regjistrohu dhe fito 10% zbritje në porosinë e parë</h2>

                    <button
                        onClick={registerHomeDiscount}
                        className="w-full py-2.5 bg-[#A3A7FC] text-[#FFFFFF] cursor-pointer hover:opacity-80 rounded"
                    >
                        Regjistrohu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeDiscountModal