import { React, useState, useEffect } from "react";
import Slider from "react-slick";
import ProductService from "../services/Products";

// Import the slick carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
  const truncated = description.split(" ").slice(0, maxLength).join(" ");
  return truncated + "...";
};

const ProductSliderDetails = ({ subCategory, uniqueCategories }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const redirect = (name) => {
    name = name.toString().toLowerCase().replace(/\s+/g, "-");
    navigate(`/products/${name}`); // addition to remove navbar after navigating to categories..
  };

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: products.length > 4 ? true : false,
    speed: 650,
    vertical: false,
    horizontal: true,
    arrows: false,
    // autoplay:true,
    // autoplaySpeed: 1500,
    slidesToShow: products.length > 0 ? Math.min(products.length, 4) : 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // Add any other settings you need
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterModel = {
    subCategory: subCategory[0]?.name,
  };

  const fetchProducts = async () => {
    let result;
    try {
      if (uniqueCategories) {
        result = await ProductService.getUniqueCategory();
        if (result.data) {
          setProducts(result.data);
        }
      } else {
        if (filterModel.subCategory) {
          result = await ProductService.getProductsByFilter(filterModel);
          if (result) {
            setProducts(result.products);
          }
        } else {
          result = await ProductService.getProducts();
          if (result) {
            setProducts(result);
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[80%]">
        <Slider {...settings}>
          {products.length > 0 &&
            products.map((product, index) => (
              <div className="max-w-[250px] w-auto mx-auto bg-white shadow-lg cursor-pointer" onClick={() => redirect(`${product.Subcategories[0].name}/${product.id}`)} key={index}>
                <div className="flex justify-center items-center w-full">{product.Images && product.Images.length > 0 && <img className="object-cover w-full min-h-[375px] max-h-[375px]" src={`/uploads/${product.Images[0].fileName}`} alt={product.title} />}</div>
                <div className="p-4">
                  {uniqueCategories ? <h3 className="text-start text-xl text-[#292929] font-bold">{product.Subcategories[0].name}</h3> : <h3 className="text-start text-xl text-[#292929] font-bold truncate">{product.title}</h3>}
                  {uniqueCategories ? null : <p className="mt-1 text-start text-[#292929] text-sm">{truncateDescription(product.shortDescription, 10)}</p>}
                  <div className="flex justify-start items-start mt-4">
                    <span className="text-xl text-[#292929] font-bold">{uniqueCategories ? null : <span className="text-xl text-[#292929] font-bold">€{product.price}</span>}</span>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSliderDetails;
