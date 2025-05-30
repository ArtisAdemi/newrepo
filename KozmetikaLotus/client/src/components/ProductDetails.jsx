import React, { useEffect, useState } from "react";
import ProductService from "../services/Products";
import CardGiftcard from "../Icons/CardGiftcard";
import Discount from "../Icons/Discount";
import QAndA from "../Icons/Q&A";
import LikeProduct from "./LikeProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../state";
import Swal from "sweetalert2";
import ProductSliderDetails from "./ProductSliderDetails";
import { Helmet } from 'react-helmet-async';

const ProductDetails = ({ title, subCategory, shortDescription, longDescription, id, price, inStock, productImages, quantity }) => {
  const dispatch = useDispatch();
  const [remindMe, setRemindMe] = useState(false);

  const [selectedImage, setSelectedImage] = useState(`/uploads/${productImages[0]?.fileName}`);

  // Function to handle image selection
  const handleImageSelect = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleAddToCart = () => {
    const product = {
      title,
      subCategory,
      shortDescription,
      longDescription,
      id,
      price,
      imgUrl: productImages[0]?.fileName,
      quantity,
      maxQuantity: quantity
    };
    dispatch(addToCart({ product }));
    Swal.fire({
      title: "Item Added!",
      text: "Item was successfully added to cart!",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const handleRemindMe = async (remindMeBool) => {
    setRemindMe(!remindMe);

    try {
      await ProductService.remindMeWhenInStock(id, remindMeBool);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getImageUrl = () => {
    const domain = process.env.REACT_APP_DOMAIN || window.location.origin;
    if (productImages && productImages[0]?.fileName) {
      return `${domain}/uploads/${productImages[0].fileName}`;
    }
    return `${domain}/logo.png`;
  };

  useEffect(() => {
    document.title = title ? `${title} | LOTUS` : 'LOTUS';

    const fetchRemindMe = async () => {
      try {
        const res = await ProductService.remindMeForThisProduct(id);
        setRemindMe(res.notification);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) {
      fetchRemindMe();
    }
  }, [id, title]);

  const currentUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | LOTUS` : 'LOTUS'}</title>
        <meta name="description" content={shortDescription} />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={title || 'LOTUS'} />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image" content={getImageUrl()} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="LOTUS" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="product:price:amount" content={price} />
        <meta property="product:price:currency" content="EUR" />
        <meta property="product:availability" content={inStock ? 'in stock' : 'out of stock'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || 'LOTUS'} />
        <meta name="twitter:description" content={shortDescription} />
        <meta name="twitter:image" content={getImageUrl()} />
      </Helmet>

      <div>
        <div className="w-full bg-red flex justify-center">
          <div className="block w-[80%]">
            <div className="flex flex-col md:flex-row pb-10 md:gap-10">
              <h2 className="block md:hidden text-[#292929#292929] text-2xl font-bold mb-3 truncate">{title}</h2>
              <p className="block md:hidden text-sm mb-3">{shortDescription}</p>
              <div className="items-center flex md:w-[60%] justify-center">
                <img src={process.env.PUBLIC_URL + selectedImage} alt="img" className="object-contain w-full max-h-[400px]" />
              </div>
              <div className="block md:hidden w-[90%] mx-auto mt-3">
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {productImages.map((image, index) => (
                    <img key={index} src={`/uploads/${image.fileName}`} alt={`img-${index}`} className="w-24 h-24 object-contain cursor-pointer" onClick={() => handleImageSelect(`/uploads/${image.fileName}`)} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-full mt-3 md:hidden border border-t-0 border-r-0 border-l-0 border-b-[#606060]">
              {quantity !== null && quantity !== undefined && quantity !== 0 ? (
                inStock ? (
                  <p className="text-s">
                    Stock: {quantity > 10 ? "Available" : `Only ${quantity} left!`}
                  </p>
                ) : (
                  <p className="text-sm text-red-600"></p>
                )
              ) : null}
                <p className="w-full font-bold text-xl mb-5 bg-[#ffecf0] rounded-lg py-3 px-5">€{price}</p>
                <LikeProduct productId={id} />
              </div>
              <div className="w-full md:w-[40%]">
                <div className="hidden md:block mb-3">
                  <h2 className="text-[#292929#292929] text-2xl font-bold truncate">{title}</h2>
                </div>
                <div className="hidden md:block mb-4">
                  <p className="text-sm">{shortDescription}</p>
                </div>
                <div className="hidden md:flex w-full md:mb-4">
                  <p className="w-full font-bold text-xl">€{price}</p>
                </div>
                <div className="hidden md:flex justify-between w-full border border-t-0 border-r-0 border-l-0 border-b-[#606060]">
                  <div className="mb-3">
                    {quantity !== null && quantity !== undefined ? (
                      inStock ? (
                        <p className="text-s">
                          Stock: {quantity > 10 ? "Available" : `Only ${quantity} left!`}
                        </p>
                      ) : (
                        <p className="text-sm text-red-600"></p>
                      )
                    ) : null}
                  </div>
                  <LikeProduct productId={id} />
                </div>
                {inStock && (
                  <div onClick={handleAddToCart} className="navbar-right mt-3 border-[2px] cursor-pointer border-[#292929] rounded-lg px-5 items-center justify-center text-center md:flex">
                    <button className="text-center items-center py-2 font-semibold">Add To Cart</button>
                  </div>
                )}
                {!inStock && (
                  <div>
                    <div className="navbar-right mt-3 border-[2px] disabled:opacity-75 border-[#292929] rounded-lg px-5 items-center justify-center text-center md:flex">
                      <button className="text-center items-center py-2 font-semibold cursor-default">Out Of Stock</button>
                    </div>
                    {/* Remind me when in stock button */}
                    <div className="mt-3 flex flex-col">
                      <span className="mb-1 md:text-sm font-semibold text-gray-500 border-0">Remind me when in stock!</span>
                      <label className="relative inline-flex items-center cursor-pointer mb-2">
                        <input type="checkbox" className="sr-only peer" name="inStock" checked={remindMe} onChange={() => handleRemindMe(!remindMe)} />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-dark-input rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-0  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                  </div>
                )}
                <div className="text-xs mt-6 bg-[#292929] p-8 text-[#FFFFFF] font-sans font-semibold">
                  <div className="flex mb-3">
                    <div>
                      <CardGiftcard />
                    </div>
                    <p className="ml-3 mt-1">Transporti Falas Per Porosite Mbi 50$</p>
                  </div>
                  <div className="flex mb-3">
                    <div>
                      <Discount />
                    </div>
                    <p className="ml-3">+10 Vite Eksperience</p>
                  </div>
                  <div className="flex mb-3">
                    <div>
                      <QAndA />
                    </div>
                    <p className="ml-3">Faleminderit Qe Na Zgjodhet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-full">
              <div className="flex flex-wrap justify-center gap-2 mt-4 w-[60%]">
                {productImages.map((image, index) => (
                  <img key={index} src={`/uploads/${image.fileName}`} alt={`img-${index}`} className="w-24 h-24 object-contain cursor-pointer" onClick={() => handleImageSelect(`/uploads/${image.fileName}`)} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 w-full flex justify-center pb-64">
          <div className="w-[80%] bg-[#FFFFFF] border border-1 py-5 px-6">
            <h1 className="text-[#292929] font-semibold">Detajet e Produktit</h1>
            <p className="mt-2">{longDescription}</p>
          </div>
        </div>
        <div className="bg-[#C6D0BC] w-full flex justify-center">
          <div className="w-[80%] text-center p-6">
            <h1 className="font-bold text-xl">You May Also Like</h1>
            <div className="mt-10 pb-10">
              <ProductSliderDetails subCategory={subCategory} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductDetails;
