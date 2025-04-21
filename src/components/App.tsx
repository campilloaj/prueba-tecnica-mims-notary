
"use client"
import { ReactNode } from "react";
import { themeContext } from '../context/ThemeContext';
import { fontContext } from '../context/FontProvider';

import { Poppins, Roboto_Mono, Merriweather } from "next/font/google";

//monospace
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
});

//sans serif
const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

//serif
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: '400',
});


export const App = ({children}:{children:ReactNode}) => {
  
  const state = themeContext();
  const font = fontContext();

  const typeFont = font === 'sans serif' ? poppins : 
    font === 'monospace' ? robotoMono : merriweather
  
  return (
    <body className={`${state} ${typeFont['className']} `} >
      {children}
    </body>
  )
} 