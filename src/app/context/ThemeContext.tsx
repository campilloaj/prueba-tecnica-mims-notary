"use client"
import { useState, createContext, useContext, ReactNode } from 'react';

const ThemeContext = createContext({
 state:'light',
 handleSetThemeState: (value:string) => {}
});


export const themeContext = () => useContext(ThemeContext); 

type Props = {
   children:ReactNode
}

export const ThemeProvider = ({ children }:Props) => {

   const [state, setState] = useState('light')

   const handleSetThemeState = (value:string) => {
      setState(value);
   }

   return (
      <ThemeContext.Provider value={{state, handleSetThemeState}}>
       {children}
      </ThemeContext.Provider>

   )
}
