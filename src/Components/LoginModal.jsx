import React, { useState } from 'react'
import logo from '../images/olx_logo1.jpg'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'

const LoginModal = ({setIsLoginModalOpen}) => {

  const {register, handleSubmit, formState : {errors}} = useForm()

  const [error, setError] = useState('')

  const navigate = useNavigate();

    const closeModal = () => {
        setIsLoginModalOpen(false)
    }

    const signIn = (data) => {
      const {email, password} = data;
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
        setIsLoginModalOpen(false)
        localStorage.setItem('userData', JSON.stringify(userCredentials?.user))
        navigate('/')
      })
      .catch((error) => {
        setError('Invalid email or password')
        console.log(error.message)
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
            <div className="relative bg-white rounded-lg shadow-lg dark:shadow-2xl">
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
                <form className="space-y-4" method="post" onSubmit={handleSubmit(signIn)}>
                  <div>
                    {error.length > 0 ? (<p className='text-red-500 text-xs m-1'>{error}</p>) : null}
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
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your password
                    </label>
                    <input
                    {...register('password',{
                      required : 'password is required',
                      minLength : {
                        value : 6,
                        message : 'password must be atleast 6 characters'
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
                    Login to your account
                  </button>
                  {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{" "}
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Create account
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

export default LoginModal