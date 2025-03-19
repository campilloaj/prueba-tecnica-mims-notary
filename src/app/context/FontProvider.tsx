"use client"
import { useState, createContext, useContext, ReactNode } from 'react';

const FontContext = createContext({
 font:'',
 handleSetFontState: (value:string) => {}
});

export const fontContext = () => useContext(FontContext); 

type Props = {
   children:ReactNode
}

export const FontProvider = ({ children }:Props) => {

   const [font, setFont] = useState('')

   const handleSetFontState = (value:string) => {
      setFont(value);
   }

   return (
      <FontContext.Provider value={{font, handleSetFontState}}>
       {children}
      </FontContext.Provider>

   )
}