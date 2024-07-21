import React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const DropDown = ({setIsSignupModalOpen, setIsLoginModalOpen, user, fetchedUserData}) => {
  return (
    <>
      <button
        id="multiLevelDropdownButton"
        data-dropdown-toggle="multi-dropdown"
        class="text-black border bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:focus:ring-white lg:hidden h-10"
        type="button"
      ><i class="fa-solid fa-user"></i>
        {" "}
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="multi-dropdown"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="multiLevelDropdownButton"
        >
          <li>
            <button
              id="doubleDropdownButton"
              data-dropdown-toggle="doubleDropdown"
              data-dropdown-placement="right-start"
              type="button"
              class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <i className="fa-solid fa-language m-1"></i> English
              <svg
                class="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
            <div
              id="doubleDropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="doubleDropdownButton"
                >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    English
                  </a>
                </li>
              </ul>
            </div>
          </li>
          {user? 
          
            <>
              <li>
                <Link to='myAds'>
                  <a
                    onClick
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    hello, {fetchedUserData.userName}
                  </a>
                </Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    auth.signOut()
                    .then(() => {
                      localStorage.removeItem('userData')
                      console.log("user logged out")
                    })
                    .catch((error) => {
                      console.log(`error while logout \n ${error}`)
                    })
                  }}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                >
                  Log out
                </a>
              </li>
            </> : 

            <>
              <li>
                <a
                  onClick={() => setIsSignupModalOpen(true)}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                >
                  Sign up
                </a>
              </li>
              <li>
                <a
                  onClick={() => setIsLoginModalOpen(true)}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                >
                  Log in
                </a>
              </li>
            </>
          }
        </ul>
      </div>
    </>
  );
};

export default DropDown;
