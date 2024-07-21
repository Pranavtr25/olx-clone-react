import React, { useState } from 'react'
import logo from "../images/olx_logo1.jpg";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import {useForm} from 'react-hook-form'

export const SignupModal = ({setIsSignupModalOpen}) => {

  const {register, handleSubmit, formState : {errors}} = useForm()

  const navigate = useNavigate()

    const closeModal = () => {
        setIsSignupModalOpen(false);
    };

    const signUp = (data) => {
      const {email, username, phone, password} = data;
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user)
        localStorage.setItem('userData',JSON.stringify(userCredentials?.user))

        addDoc(collection(db, 'users'),{
          email : email,
          userName : username,
          phoneNumber : phone,
          uid : userCredentials.user?.uid
        })

        setIsSignupModalOpen(false)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
    }


  return (
    <>
    
      
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-30"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-2xl">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <div className="flex items-center justify-center flex-1">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-40 object-contain cursor-pointer"
                  />
                </div>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 md:w-10 md:h-10 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="" method='post' onSubmit={handleSubmit(signUp)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                    {...register('email',{
                      required : 'Email is required',
                      pattern : {
                        value : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message : 'Invalid email address'
                      }
                    })}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black"
                      placeholder="username@gmail.com"
                    />
                    {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Username
                    </label>
                    <input
                    {...register('username',{
                      required : 'Username is required',
                      pattern : {
                        value : '^[a-zA-Z0-9]{3,15}$',
                        message : 'invalid username'
                      }
                    })}
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black"
                      placeholder="Enter your username"
                    />
                    {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username.message}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Phone Number
                    </label>
                    <input
                    {...register('phone',{
                      required : 'Phone number is required',
                      pattern : {
                        value : '^\d{10}$',
                        message : 'Length of the phone number should be 10.'
                      }
                    })}
                      type=""
                      name="phone"
                      id="phone"
                      pattern="[0-9]{10}"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black"
                      placeholder="xxx-xxx-xxxx"
                    />
                    {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your password
                    </label>
                    <input
                    {...register('password', {
                      required : 'Password is required',
                      minLength : {
                        value : 6,
                        message : 'Password must be atleast 6 characters'
                      }
                    })}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black"
                    />
                    {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-black-7 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black"
                  >
                    Signup
                  </button>
                  {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Sign in
                    </a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}
