import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import AuthService from "../services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../services/OrderService";
import Swal from "sweetalert2";
import { resetCart } from "../state";
import { useNavigate } from "react-router-dom";
// import Select from "react-select";

const Checkout = () => {
  const [user, setUser] = useState({});
  const products = useSelector((state) => state.cart.cart);
  const [discount, setDiscount] = useState(0);
  const [fullPrice, setFullPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Kosova");
  const [transport, setTransport] = useState(2);

  const getUserData = async () => {
    let res;
    try {
      let token = localStorage.getItem("token");
      if (token) {
        await AuthService.decodeUser().then((res) => {
          setUser(res);
          setDiscount(res?.discount);
        });
      } else {
        Swal.fire({
          title: "You are not logged in!",
          text: "Please log in before making an order",
          icon: "warning",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (err) {
      return null;
    }
  };

  const validationSchema = yup.object({
    address: yup.string().required("Address is Required"),
  });

  const formik = useFormik({
    initialValues: {
      // Preload user data into initialValues
      firstName: user?.firstName || "", // Ensure to handle cases where user.firstName might be undefined
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: "",
      additionalInfo: "",
      country: selectedCountry,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerOrder(values);
      formik.resetForm();
    },
  });

  const registerOrder = async (values) => {
    let newOrder = {
      products: products.map((product) => ({
        id: product.id,
        quantity: product.count,
        price: product.price,
      })),
      address: values.address,
      additionalInfo: values.additionalInfo,
      country: selectedCountry,
      transport: transport,
    };

    try {
      await OrderService.registerOrder(newOrder).then((res) => {
        if (res) {
          Swal.fire({
            title: "Order has been made.",
            text: 'Current order status is "pending". You will be notified via email when order status changes.',
            icon: "success",
          });
          dispatch(resetCart());
          navigate("/");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  // const getDiscount = async () => {
  //     try {
  //         const res = await AuthService.decodeUser();
  //         if (res.discount) {
  //             setDiscount(res.discount);
  //         }
  //     } catch (err) {
  //         console.error(err);
  //     }
  // }

  const handleTotalPrice = () => {
    let price = 0;
    products.forEach((product) => {
      price += product.price * product.count; // Sum up the price of each product
    });
    setFullPrice(price);
    if (discount > 0) {
      let priceWithDiscount = price;
      priceWithDiscount = price - (price * discount) / 100;
      setTotalPrice(priceWithDiscount + transport); // transport
    }
  };

  useEffect(() => {
    handleTotalPrice();
    getUserData();
  }, [discount, transport]);

  //Second useEffect is to handle the form changes -- (to set initial pre-loaded user data)
  useEffect(() => {
    // Set formik initialValues when user data changes
    formik.setValues({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: formik.values.address || "", // Preserve the current address value
      additionalInfo: formik.values.additionalInfo || "", // Preserve the current additionalInfo value
      country: selectedCountry,
    });
  }, [user]); // Listen for changes in the user state

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    if (e.target.value === "Kosova") {
      setTransport(2);
    } else if (e.target.value === "Shqiperia") {
      setTransport(6);
    } else if (e.target.value === "Maqedoni") {
      setTransport(6);
    }
  };

  return (
    <div>
      <div className="flex w-full justify-center">
        <Navbar />
      </div>

      <div className="profile-container flex justify-center w-full my-12">
        <div className="profile-content w-[80%] justify-center md:flex">
          <div className="w-[100%] flex ">
            <div className="w-[100%] flex flex-col gap-10 justify-center md:my-12">
              <div className="flex w-full">
                <div className="flex w-full md:w-[40%] flex-col">
                  <form className="w-full" onSubmit={formik.handleSubmit}>
                    <h1 className="text-[#212121] pb-4 mb-8 border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-3xl">Fatura e Adresimit</h1>

                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Emri: </h2>
                      <input className="rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" type="text" name="firstName" disabled onChange={formik.handleChange} value={formik.values.firstName} />
                    </div>

                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Mbiemri: </h2>
                      <input className="rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" type="text" name="lastName" disabled onChange={formik.handleChange} value={formik.values.lastName} />
                    </div>

                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Email: </h2>
                      <input className="rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" type="text" name="email" disabled onChange={formik.handleChange} value={formik.values.email} />
                    </div>

                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Nr. Telefonit: </h2>
                      <input className="rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" type="text" name="phoneNumber" disabled onChange={formik.handleChange} value={formik.values.phoneNumber} />
                    </div>
                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Shteti: </h2>
                      <select name="country" className="rounded-md text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" onChange={handleCountryChange}>
                        <option value="Kosova">Kosove</option>
                        <option value="Shqiperia">Shqiperi</option>
                        <option value="Maqedoni">Maqedoni</option>
                      </select>
                    </div>
                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Adresa: </h2>
                      <input className="rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" type="text" name="address" onChange={formik.handleChange} value={formik.values.address} />
                    </div>
                    {formik.errors.address && formik.touched.address && <h2 className="w-[50%] md:w-[60%] text-red-500 text-xs md:text-sm -mt-4 md:-mt-5 mx-auto">{formik.errors.address}</h2>}
                    <span className="text-xs text-gray-500">(Nese keni ndonje orar te caktuar qe mund te pranoni porosine, plotesoni kete fushe)</span>
                    <div className="flex mb-5 justify-start items-center">
                      <h2 className="w-[25%] md:w-[20%] text-sm md:text-base font-medium">Informata shtese: </h2>
                      <input className="rounded-md w-[75%] md:w-[80%] text-sm md:text-base p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]" type="text" name="additionalInfo" onChange={formik.handleChange} value={formik.values.additionalInfo} />
                    </div>
                    <div>
                      <h2 className="font-semibold">Total Price: €{fullPrice.toFixed(2)}</h2>
                      <span fontWeight={"bold"}>+ {transport} (Transport)</span>
                      {discount > 0 && (
                        <>
                          <br />
                          <span fontWeight={"bold"}>-{discount}%</span>
                        </>
                      )}
                      <hr />
                      <span fontWeight={"bold"}>{discount ? totalPrice.toFixed(2) : (fullPrice + transport).toFixed(2)}€</span>
                    </div>
                    <button type="submit" className="border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-full md:w-[50%]  text-[#FFFFFF] shadow-xl hover:opacity-80">
                      Porosit
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faChevronLeft} color="#828282" />
                <h2 className=" ml-3 text-[#828282]">
                  <a href="/products/all">Back to Products</a>
                </h2>
              </div>
              <div className=" flex justify-center">
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
                  {products.map((product, index) => {
                    return (
                      <div key={index} className="max-w-[250px] w-[250px] mx-auto bg-white shadow-lg h-[430px] m-5">
                        <div className="flex justify-center items-center w-full h-[300px]">
                          <img className="object-contain max-w-[250px] min-h-[300px] max-h-[300px]" src={`/uploads/${product.imgUrl}`} alt="Image here" />
                        </div>
                        <div className="p-4">
                          <h2 className="text-start text-xl text-[#292929] font-bold max-h-10 overflow-ellipsis overflow-hidden whitespace-nowrap">{product.title}</h2>
                          <p className="mt-1 text-start text-[#292929] text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">{product.shortDescription}</p>
                          {/* Lower Part */}
                          <div className="flex justify-between">
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-xl text-[#292929] font-bold">€{product.price}</span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-md text-[#292929]">Quantity: {product.count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
