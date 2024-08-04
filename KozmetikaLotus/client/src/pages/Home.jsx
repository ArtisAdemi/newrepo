import React, { useEffect, useState } from 'react'
import { ProductSlider } from '../components'
import overlap from "../images/overlap.png"
import {useNavigate} from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import HomeDiscountModal from '../components/HomeDiscountModal';
import UserService from '../services/Users';
import Navbar from "../components/Navbar"
const Home = () => {
  const navigate = useNavigate();
  const [homeDiscount, setHomeDiscount] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);
  const token = localStorage.getItem("token");

  const isLoggedIn = async () => {
    const user = await UserService.validateToken();
    if(user){
        setCurrentUser(true);
    }
  }

  useEffect(() => { 
    isLoggedIn();
  }, [])


  return (
    <div>
      {/* Full Container */}
      <div className='bg-[#F7CEE7] w-full'>
        {/* Nav and picture */}
        <div>
          <div className='flex w-full justify-center'>
            <Navbar />
          </div>

          {/* HOME HERO SLIDER */}
         
        </div>
          <div  className='home-hero-slider'>
              <HeroCarousel/>
          </div>
     
      </div>

      {/* Kategorite Section */}

      {/* Parent Container with bg color */}
      <div className='w-full bg-[#FFFFFF] flex justify-center overflow-hidden py-12'>
        {/* Content Container */}
        <div className='w-[80%] grid justify-center'>
          {/* Header */}
          <div className='items-center text-center'>
            <h1 className='text-3xl md:text-5xl font-semibold font-eb-garamond text-center text-[#292929]'>Kategoritë</h1>
          </div>
        </div>
      </div>
          {/* Slider */}
      <div className='bg-[#FFFFFF] capitalize pb-20'>
          <ProductSlider uniqueCategories={true}/>
      </div>
      
      {/* Best Seller slider */}
      <div className='w-full bg-[#F2E2DA] justify-center overflow-hidden py-12'>
        {/* Content Container */}
        <div className='w-[80%] mx-auto grid justify-center'>
          {/* Header */}
          <div className='items-center text-center'>
            <h1 className='text-3xl md:text-5xl font-eb-garamond font-semibold text-center text-[#292929]'>Produktet me te shitura</h1>
          </div>
        </div>
      <div className='bg-[#F2E2DA] capitalize pb-20 mt-10 w-full'>
        <ProductSlider bestSeller={true}/>
      </div>
      </div>
      {/* About us section */}
      <div className='md:flex justify-center bg-[#FAFAFA] px-12 py-16'>
        <div className='w-[100%] mr-12 max-w-[500px] text-center'>
          {/* Text Section */}
          <div>
            <h1 className='text-3xl font-bold text-center text-[#292929]'>Rreth Nesh</h1>
          </div>
          <div>
            <p className='text-center text-[#292929]'>Ju faleminderit që vizitoni website-in tonë. Shpresojmë që të gjeni produktet e duhura për të arritur qëllimet tuaja për kujdesin e lëkurës. Ne jemi këtu për të ndihmuar në rrugën tuaj drejt një lëkure të shëndetshme dhe të bukur. Urojme që të keni një eksperiencë të mrekullueshme me produktet e Kozmetika Lotus</p>
          </div>
          <div className='mt-4'>
            <a className='text-center underline font-semibold text-[#292929]' href="/about">Lexo me shume</a>
          </div>
        {/* Image */}
        </div>
          <div className='md:max-w-[500px]'>
            <img src={require('../images/HomePage1AboutUs.png')} alt="" />
          </div>
      </div>

        {/* Marka Jone (Big Screen)*/}
        <div className='hidden md:flex bg-[#FFFFFF]  items-center flex-col'>
          <div className='w-[80%] flex my-20 flex-col md:flex-row justify-center pt-10 pb-6'>
            <div className='bg-[#292929] justify-center items-center mx-auto'>
              <h2 className='text-[#FFFFFF] mb-3 text-2xl ml-12 mt-5'>Marka Jonë</h2>
              <p className='text-[#FFFFFF] mb-3 ml-12 mt-8'>Klientët tanë janë të rëndësishëm për ne, prandaj ofrojmë këshilla të personalizuara dhe ndihmë për të zgjedhur produktet e duhura për nevojat e tyre. Nëse keni pyetje ose nevojë për këshillë, jemi këtu për t’ju ndihmuar.</p>
              <button className='text-[#FFFFFF] border w-full md:w-[20%] mb-4 ml-12 px-8 py-2' onClick={() => navigate('/contact')}>Na Kontaktoni</button>
            </div>
            <div className=''>
              <img src={overlap} className='object-cover w-full h-full' alt="" />
            </div>
         </div>
        </div>

        {/* overlapping images */}
      <div className='bg-[#FBEFF2] md:hidden mb-5'>
        

        <div className='bg-[#292929] w-[100%] h-52 pt-12'>

        </div>

        <div className='w-full flex justify-center'> 
          <div className='w-[80%] lg:flex gap-10'>

            <div className='-mt-28'>
              <img src={overlap} alt="blla" className="w-[777px] " />
            </div>
            <div className='mt-3 lg:w-96 lg:h-48'>
              <h2 className='text-[#292929] mb-3 text-2xl'>Marka Jonë</h2>
              <p className='text-[#292929] mb-3'>Klientët tanë janë të rëndësishëm për ne, prandaj ofrojmë këshilla të personalizuara dhe ndihmë për të zgjedhur produktet e duhura për nevojat e tyre. Nëse keni pyetje ose nevojë për këshillë, jemi këtu për t’ju ndihmuar.</p>
              <button className='text-[#292929] border border-[#292929] w-full md:w-[20%] px-8 py-2' onClick={() => navigate('/contact')}>Na Kontaktoni</button>
            </div>
          </div>
        </div>
      </div>
      {!currentUser && !token && homeDiscount && <HomeDiscountModal closeHomeDiscount={() => setHomeDiscount(false)} />}
    </div>
  )
}

export default Home;