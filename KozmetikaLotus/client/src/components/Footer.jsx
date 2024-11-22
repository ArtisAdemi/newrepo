import React, { useEffect, useState } from "react";
import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import Indicator from "../Icons/Indicator";
import LotusIcon from "../Icons/LotusIcon";
import { useNavigate } from "react-router-dom";
import TikTokIcon from "../Icons/TikTokIcon.jsx";
import categoriesData from "../categories.json";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const redirect = (name) => {
    name = name.toString().toLowerCase().replace(/\s+/g, "");
    navigate(`/products/${name}`);
  };

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  return (
    <div className="bg-[#292929] text-[#FFFFFF]">
      <div className=" pt-4">
        <div
          onClick={() => navigate("/")}
          className="w-[150px] cursor-pointer text-3xl -ml-3 font-bold"
        >
          <LotusIcon />
        </div>
      </div>
      <div className="md:flex justify-between p-5">
        <div className="space-y-4 p-4">
          <div>
            <h2 className="font-bold text-lg">Si mund t'ju ndihmojme</h2>
            <p className="my-3">
              <a href="/">Home</a>
            </p>
            <p className="mb-3">
              <a href="/about">Rreth Nesh</a>
            </p>
            <p className="">
              <a href="/contact">Na Kontaktoni</a>
            </p>
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div>
            <h2 className="text-lg font-bold mb-3">Kategoritë</h2>
            <div className="w-full grid grid-cols-2 gap-x-12 gap-y-3">
              <h2
                className=" md:text-lg cursor-pointer"
                onClick={() => redirect("all")}
              >
                Të gjitha
              </h2>
              {categories.map((category, index) => (
                <h2 className=" md:text-lg cursor-pointer" key={index}>
                  {category.name}
                </h2>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 max-w-[600px] p-4 hidden md:block">
          <h2 className="font-bold text-lg">Rreth Nesh</h2>
          <p>
            Ne besojmë në rëndësinë e kujdesit të lëkurës prandaj ofrojmë
            produkte të specializuara për të mbajtur lëkurën të shëndetshme dhe
            të freskët.
          </p>
        </div>
      </div>
      <div className="bg-[#FAFAFA] md:flex justify-between items-center p-5 w-full">
        <div className="flex justify-center w-[50%]">
          <div className="md:flex justify-around]">
            {/* <div className='flex items-center'>
                        <LocationIcon/>                    
                    <p className='mr-4 text-[#292929] font-semibold'>Rruga..., Ferizaj </p>
                </div> */}
            <div className="hidden md:block">
              <Indicator />
            </div>
            <p className="md:ml-4 ml-2 mt-2 md:mt-0 text-[#292929] font-semibold">
              {" "}
              +383-49-887-212
            </p>
          </div>
        </div>
        <div className="flex md:mr-6 w-[45%] justify-center">
          <div className="flex">
            <div className="cursor-pointer">
              <a
                href="https://www.instagram.com/kozmetikalotus"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
              </a>
            </div>
            <div className="cursor-pointer">
              <a
                href="https://www.facebook.com/profile.php?id=100093196230252"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon />
              </a>
            </div>
            <div className="cursor-pointer">
              <a
                href="https://www.tiktok.com/@kozmetikalotus"
                target="_blank"
                rel="noreferrer"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#292929] text-center py-3">
        <span>© {new Date().getFullYear()} Influxo. All Rights Reserved.</span>
      </div>
    </div>
  );
};
export default Footer;
