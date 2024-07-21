import React, { useState } from 'react'

const AddProductDropDown = () => {
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const [isOpen, setIsOpen] = useState(false);
  
    const options = [
      'Account settings',
      'Support',
      'License',
      'Sign out'
    ];
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsOpen(false); // Close the dropdown after selecting an option
    };
  
    return (
      <>
          <div className="w-full flex justify-center p-4">
              <div className="relative inline-block text-left w-80">
                  <div>
                  <button
                      type="button"
                      onClick={toggleDropdown}
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      aria-expanded="true"
                      aria-haspopup="true"
                  >
                      {selectedOption}
                      <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      >
                      <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                          clipRule="evenodd"
                      />
                      </svg>
                  </button>
                  </div>
  
                  {isOpen && (
                  <div
                      className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="dropdown-menu-button"
                      tabIndex="-1"
                  >
                      {options.map((option, index) => (
                      <button
                          key={index}
                          onClick={() => handleOptionSelect(option)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          tabIndex="-1"
                      >
                          {option}
                      </button>
                      ))}
                  </div>
                  )}
              </div>
          </div>
      </>
    );
}

export default AddProductDropDown