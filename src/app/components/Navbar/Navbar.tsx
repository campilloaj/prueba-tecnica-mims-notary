"use client"
import { useState } from 'react';
import { themeContext } from '../../context/ThemeContext';
import { fontContext } from '../../context/FontProvider';

import { DarkModeIcon } from '../Icons/DarkModeIcon';
import { LightModeIcon } from '../Icons/LightModeIcon';
import { CloseIcon } from '../Icons/CloseIcon';

export const Navbar = () => {
  
   const { state, handleSetThemeState } = themeContext();
   const { handleSetFontState } = fontContext();
   const [isOpen, setIsOpen] = useState(false);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   }

   return (
      <nav className={`bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700`}>
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
               <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">App</span>
            </a>
            <div className="relative inline-block text-left">
               <button
                  onClick={() => handleSetThemeState(state !== 'dark' ? 'dark' : 'light')}
                  className="flex items-center px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
               >
                  {state === 'dark' ? (
                     <DarkModeIcon />
                  ) : (
                     <LightModeIcon />
                  )}
               </button>

            </div>

            <div className="relative inline-block text-left">
               {/* Botón que activa el dropdown */}
               <button
                  onClick={toggleDropdown}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
               >
                  {isOpen === true ? <CloseIcon /> :
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-white hover:text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M3 10h18M3 6h18M3 14h18M3 18h18"
                        />
                     </svg>}
               </button>

               {/* Dropdown */}
               {isOpen && (
                  <ul className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                     <li>
                        <div
                           onClick={() => handleSetFontState("serif")}
                           className="text-black block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                           Serif
                        </div>
                     </li>
                     <li>
                        <div
                           onClick={() => handleSetFontState("sans_serif")}
                           className="text-black block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                           sans serif
                        </div>
                     </li>
                     <li>
                        <div
                           onClick={() => handleSetFontState("monospace")}
                           className="text-black block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                           monospace
                        </div>
                     </li>
                  </ul>
               )}
            </div>
         </div>
      </nav>
   )
}




