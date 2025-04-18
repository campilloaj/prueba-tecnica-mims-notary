"use client"
import { useState } from 'react';
import { themeContext, dispatchthemeContext } from '../../context/ThemeContext';
import { dispatchFontContext, fontContext } from '../../context/FontProvider';

import { DarkModeIcon } from '../Icons/DarkModeIcon';
import { LightModeIcon } from '../Icons/LightModeIcon';
import { CloseIcon } from '../Icons/CloseIcon';
import { BookIcon } from '../Icons/BookIcon';
import { MoonIcons } from '../Icons/MoonIcons';

export const Navbar = () => {
   const handleSetThemeState = dispatchthemeContext();
   const state = themeContext();
   const font = fontContext();
   //Font
   const handleSetFontState = dispatchFontContext();
   const [isOpen, setIsOpen] = useState(false);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   }
  
   return (
      <nav>

         <div className="max-w-screen-md flex flex-wrap items-center justify-between mx-auto p-4">

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
               <BookIcon />
            </div>

            <div className='flex items-center gap-1'>

               <div className="relative inline-block text-left">
              
                  <label
                     onClick={toggleDropdown}
                     className="flex items-center px-4 py-2 gap-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  >
                        <div>
                          {font}
                        </div>
                         <svg
                         className="w-4 h-4 text-purple-500"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20"
                         fill="currentColor"
                         aria-hidden="true"
                       >
                         <path
                           fillRule="evenodd"
                           d="M5.23 7.29a1 1 0 011.41 0L10 10.12l3.36-2.83a1 1 0 111.28 1.56l-4 3.33a1 1 0 01-1.28 0l-4-3.33a1 1 0 010-1.56z"
                           clipRule="evenodd"
                         />
                       </svg> 
                        
                  </label>

                  {/* Dropdown */}
                  {isOpen && (
                     <ul className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                        <li>
                           <div
                              onClick={() => handleSetFontState("serif")}
                              className="text-black block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                           >
                              serif
                           </div>
                        </li>
                        <li>
                           <div
                              onClick={() => handleSetFontState("sans serif")}
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

               <div>

                  <label className="inline-flex items-center cursor-pointer">
                     <input type="checkbox" onClick={_ => handleSetThemeState(state !== 'light' ? 'light' : 'dark')}  value="" className="sr-only peer" />
                     <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600 dark:peer-checked:bg-gray-600"></div>
                     <div className='ml-1'>
                         <MoonIcons />
                     </div>
                     
                  </label>


               </div>

            </div>

         </div>

      </nav>
   )
}




