import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// initialValues
const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}

// validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Confirm Password must match").required("Confirm Password must match")
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle register
  const handleRegister = async (value) => {
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
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-extrabold font-[Koh Santepheap]'>ចុះឈ្មោះ</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            handleRegister(value)
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
                  className="font-[Koh Santepheap] text-base sm:text-lg font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            {/* email */}
            <div className="mt-5 relative">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
              </label>
              <div className="relative flex items-center">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="font-[Koh Santepheap] text-base sm:text-lg font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="អ៊ីមែល"
                />
                <MdEmail className="absolute right-3 text-gray-900" />
              </div>
              <ErrorMessage
                component='div'
                name='email'
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

            {/* confirm password */}
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
              </label>
              <div className="relative flex items-center">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="font-[Koh Santepheap] text-base sm:text-lg font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="បញ្ជាក់ពាក្យសម្ងាត់"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash className="absolute right-3 text-gray-900 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                ) : (
                  <FaEye className="absolute right-3 text-gray-900 cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                )}
              </div>
              <ErrorMessage
                component='div'
                name='confirmPassword'
                className='text-red-700 text-sm' />
            </div>

            {/* button */}
            <div className='flex justify-center items-center flex-col'>
              <button type="submit" className="text-white bg-[#222162] font-semibold rounded-lg text-lg sm:text-xl px-5 py-2.5 me-2 mt-5 focus:outline-none">បង្កើតគណនី</button>
              <p className='font-[Koh Santepheap] text-base sm:text-lg text-gray-800 font-semibold mt-5'>មានគណនីរួចហើយ? <span className='text-blue-600'>ចូលគណនី</span></p>
            </div>
          </Form>
        </Formik>
      </section>
    </section>
  )
}
