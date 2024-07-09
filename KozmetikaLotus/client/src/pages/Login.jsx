import contact from "../images/ContactUs.png";
import { useFormik } from "formik";
import * as yup from "yup";
import UserService from "../services/Users";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit:async (values) => {
            // Handle form submission here
            let userData = {
                email: values.email,
                password: values.password,
            }
            try {
                let res = await UserService.loginUser(userData);
                localStorage.setItem("token", res.token)
                if (!res.message) {
                    navigate("/admin");
                }                
            } catch (err) {
                setError('Email and Password don\'t match!');
                console.error("Error logging in: ", err);
            }
        },
    });


    return (
        <div>
            <div className='flex w-full justify-center'>
                <Navbar />
            </div>
            <div className='contact-container flex justify-center w-full my-12'>
                <div className='contact-content w-[80%] shadow-2xl justify-center md:flex md:h-[800px]'>
                    
                    <div className='w-[100%] flex bg-[#FBEFF2] '>

                        <form onSubmit={formik.handleSubmit} className='w-[100%] flex flex-col gap-10 justify-center my-12'>

                            <h1 className='text-[#A10550] text-3xl text-center'>Login</h1>

                            <input className='rounded-md p-3 md:p-4 placeholder-gray-400 w-[60%] mx-auto'
                            type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email && formik.touched.email && 
                            <h2 className='w-[60%] text-red-500 text-sm -mt-10 -mb-5 mx-auto'>{formik.errors.email}</h2>}
   
                            <input className='rounded-md p-3 md:p-4 placeholder-gray-400 w-[60%] mx-auto' 
                            type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                            {formik.errors.password && formik.touched.password && 
                            <h2 className='w-[60%] text-red-500 text-sm -mt-10 -mb-5 mx-auto'>{formik.errors.password}</h2>}
                            
                            <button type="submit" className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md hover:opacity-80 border-2 p-3 md:p-4 w-[60%] mx-auto text-[#FFFFFF] shadow-xl'>Login</button>

                            {error === 'Email and Password don\'t match!' &&
                                <h2 className="w-[60%] text-red-500 text-sm -mt-10 -mb-5 mx-auto">{error}</h2>
                            }

                        <h2 className="mx-auto">Don't have an account ? <a className="text-[#A3A7FC]" href="/register">Register</a></h2>
                        </form>

                    </div>

                    <div className='w-[100%] h-[100%]'>
                      <img src={contact} alt="" className="md:w-[100%] md:h-[800px]"  />
                    </div>
          
                </div>
            </div>
        </div>
    )
}

export default Login

