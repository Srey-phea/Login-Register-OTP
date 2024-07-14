import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEye, FaEyeSlash, FaCheckCircle, FaFacebook } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

// initialValues
const initialValues = {
  username: "",
  password: ""
}

// validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Password at least 6 characters").required("Password is required")
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // handle login
  const handleLogin = async (value) => {
    console.log(value);
    const response = await fetch(`http://136.228.158.126:50003/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });
    const data = await response.json();
    console.log(data)
  }

  return (
    <section className='h-screen flex justify-center items-center flex-col px-4 sm:px-6'>
      <section className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-100 p-8 rounded-lg'>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-extrabold font-[Koh Santepheap]'>ចូលគណនី</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            handleLogin(value)
          }}
        >
          <Form>
            {/* username */}
            <div className="mt-5 relative">
              <label htmlFor="username" className="mb-2 text-gray-900 dark:text-white"></label>
              <div className="relative flex items-center">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="font-[Koh Santepheap] font-bold text-base sm:text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="នាមត្រកូល"
                />
                <FaUser className="absolute right-3 text-gray-900" />
              </div>
              <ErrorMessage
                component='div'
                name='username'
                className='text-red-700 text-sm'
              />
            </div>

            {/* password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
              </label>
              <div className="relative flex items-center">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="font-[Koh Santepheap] text-base sm:text-lg font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ពាក្យសម្ងាត់"
                />
                {showPassword ? (
                  <FaEyeSlash className="absolute right-3 text-gray-900 cursor-pointer" onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye className="absolute right-3 text-gray-900 cursor-pointer" onClick={() => setShowPassword(true)} />
                )}
              </div>
              <ErrorMessage
                component='div'
                name='password'
                className='text-red-700 text-sm' />
            </div>

            {/* remember me and forgot password */}
            <div className='flex items-center justify-between mt-5'>
              <div className='flex items-center'>
                {rememberMe ? (
                  <FaCheckCircle className='text-blue-600 cursor-pointer' onClick={() => setRememberMe(false)} />
                ) : (
                  <MdOutlineRadioButtonUnchecked className='text-gray-600 cursor-pointer' onClick={() => setRememberMe(true)} />
                )}
                <span className='ml-2 font-[Koh Santepheap] text-lg text-gray-700'>ចង់ចាំលេខសម្ងាត់</span>
              </div>
              <span className='font-[Koh Santepheap] text-blue-600 text-lg cursor-pointer'>ភ្លេចលេខសម្ងាត់</span>
            </div>

            {/* button */}
            <div className='flex justify-center items-center flex-col mt-5'>
              <button type="submit" className="text-white bg-[#222162] font-semibold rounded-lg text-lg sm:text-xl px-5 py-2.5 me-2 focus:outline-none">ចូលគណនី</button>
              <p className='font-[Koh Santepheap] text-base sm:text-lg text-gray-800 text-lg mt-5'>មិនមានគណនី? <span className='text-blue-600 cursor-pointer'>ចូលបង្កើតគណនី</span></p>
            </div>

            {/* horizontal rules and center text */}
            <div className='flex items-center mt-5'>
              <hr className="w-full border-t-2 border-gray-500" />
              <span className="mx-2 text-lg text-gray-500 font-[Koh Santepheap]">ឬ</span>
              <hr className="w-full border-t-2 border-gray-500" />
            </div>
            <div className='flex flex-col space-y-4 mt-4'>
            <button className='flex items-center justify-center w-full py-2.5 rounded-lg border border-black text-gray-500 font-[Koh Santepheap] text-lg'>
            <FaFacebook className='mr-2 text-blue-700' />
                ចូលជាមួយ Facebook
              </button>
              <button className='flex items-center justify-center w-full py-2.5 rounded-lg border border-black text-gray-500 font-[Koh Santepheap] text-lg'>
                <FcGoogle className='mr-2' />
                ចុះឈ្មោះជាមួយ Google
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </section>
  )
}
