import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/Users';
import Orders from '../components/Orders';
import AdminProducts from '../components/AdminProducts';
import Clients from '../components/Clients';
import { Navbar } from '../components';

const AdminPannel = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(getInitialTab());



  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const userInfo = await UserService.validateToken();
        if (userInfo.user.role !== 'admin') {
          navigate('/');
        }
      } catch (error) {
        if (error.message === "No token provided") {
          console.error("No token provided. Redirecting to homepage");
          navigate('/');
        } else {
          console.error("Error validating user role", error);
          navigate('/');
        }
      }
    };
    checkAdminRole();
  }, [navigate]);


  //By default kjo o "Products", kur ndrrohet me onClick perdoret useEffect poshte, edhe masanej ndrrohet savedTab
  function getInitialTab() {
    // getting stored tabs
    const tabData = localStorage.getItem('ADMIN_TAB');
    const savedTab = JSON.parse(tabData);
    return savedTab || "Products";
  }

  useEffect(() => {
    // storing tabs
    const tabData = JSON.stringify(selectedTab);
    localStorage.setItem('ADMIN_TAB', tabData);
  }, [selectedTab]);


  return (
    <div className='w-full justify-center'>

      <div className='flex w-full justify-center'>
        <Navbar />
      </div>

      {/* ADMIN PANEL */}
      <div className='tab-selector bg-[#F1F1F1] flex rounded-md mt-10 w-[330px] mx-auto justify-center'>
        <div className=''>
          {selectedTab === 'Products' ? (
            <button onClick={() => setSelectedTab("Products")} className='font-semibold bg-[#202630] text-[#FFFFFF] rounded-md py-4 px-6'>Products</button>
          ) : (
            <button onClick={() => setSelectedTab("Products")} className='font-semibold rounded-md py-4 px-6'>Products</button>
          )}
        </div>
        <div className=''>
          {selectedTab === 'Orders' ? (
            <button onClick={() => setSelectedTab("Orders")} className='font-semibold bg-[#202630] text-[#FFFFFF] rounded-md py-4 px-6'>Orders</button>
          ) : (
            <button onClick={() => setSelectedTab("Orders")} className='font-semibold rounded-md py-4 px-6'>Orders</button>
          )}
        </div>
        <div className=''>
          {selectedTab === 'Clients' ? (
            <button onClick={() => setSelectedTab("Clients")} className='font-semibold bg-[#202630] text-[#FFFFFF] rounded-md py-4 px-6'>Clients</button>
          ) : (
            <button onClick={() => setSelectedTab("Clients")} className='font-semibold rounded-md py-4 px-6'>Clients</button>
          )}
        </div>
      </div>
      {selectedTab === 'Orders' && <Orders location={"admin"} />}
      {selectedTab === 'Products' && <AdminProducts />}
      {selectedTab === 'Clients' && <Clients />}

    </div>



  );
}

export default AdminPannel;
