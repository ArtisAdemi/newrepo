import { React, useState, useEffect } from "react";
import Slider from "react-slick";
import ProductService from "../services/Products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "./ProductSlider.css"; // Import the CSS file

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
  const truncated = description.split(" ").slice(0, maxLength).join(" ");
  return truncated + "...";
};

const ProductSlider = ({ subCategory, uniqueCategories, bestSeller }) => {
  const [products, setProducts] = useState([]);
  const [helperProductsArray, setHelperProductsArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const navigate = useNavigate();

  const handleProducts = () => {
    if (bestSeller) {
      let productArray = [];
      helperProductsArray.map((product) => {
        productArray.push(product.product);
      });

      setProducts(productArray);
    }
  };

  const CustomDots = ({ dots, currentIndex, prevIndex }) => {
    const totalDots = dots.length;
    const visibleDots = 5;
    const startIndex = Math.max(0, currentIndex - 2);
    const endIndex = Math.min(totalDots, currentIndex + 3);
    const slideClass = currentIndex > prevIndex ? "slide-right" : "slide-left";

    return (
      <div className={`slick-dots-container ${slideClass}`}>
        <ul className="slick-dots">
          {dots.slice(startIndex, endIndex).map((dot, index) => (
            <li key={index} className={dot.props.className}>
              {dot.props.children}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: products.length > 4 ? true : false,
    speed: 650,
    vertical: false,
    horizontal: true,
    arrows: false,
    slidesToShow: products.length > 0 ? Math.min(products.length, 4) : 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    customPaging: (i) => <button>{i + 1}</button>,
    appendDots: (dots) => (
      <CustomDots
        dots={dots}
        currentIndex={currentIndex}
        prevIndex={prevIndex}
      />
    ),
    beforeChange: (oldIndex, newIndex) => {
      setPrevIndex(oldIndex);
      setCurrentIndex(newIndex);
    },
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

  useEffect(() => {
    handleProducts();
  }, [helperProductsArray]);

  const filterModel = {
    subCategory: subCategory,
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
        } else if (bestSeller) {
          result = await ProductService.getBestSellers();
          if (result) {
            setHelperProductsArray(result);
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
              <div
                className="max-w-[250px] ml-8 md:pl-0 w-auto mx-auto bg-white shadow-lg cursor-pointer"
                key={index}
              >
                <a
                  href={
                    bestSeller
                      ? `products/all/${product.id}`
                      : `/products/${product.Subcategories[0].name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                  }
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex justify-center items-center w-full">
                    {product.Images && product.Images.length > 0 && (
                      <img
                        className="object-contain w-full min-h-[375px] max-h-[375px]"
                        src={`/uploads/${product.Images[0].fileName}`}
                        alt={product.title}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    {uniqueCategories ? (
                      <h3 className="text-start text-xl text-[#292929] font-bold">
                        {product.Subcategories[0].name}
                      </h3>
                    ) : (
                      <h3 className="text-start text-xl text-[#292929] font-bold">
                        {product.title}
                      </h3>
                    )}
                    {uniqueCategories ? null : (
                      <p className="mt-1 text-start text-[#292929] text-sm">
                        {truncateDescription(product.shortDescription, 10)}
                      </p>
                    )}
                    <div className="flex justify-start items-start mt-4">
                      <span className="text-xl text-[#292929] font-bold">
                        {uniqueCategories ? null : (
                          <span className="text-xl text-[#292929] font-bold">
                            €{product.price}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
