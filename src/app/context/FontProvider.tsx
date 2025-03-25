"use client"
import { useState, createContext, useContext, ReactNode } from 'react';

const DispatchFontContext = createContext((str: string) => { });

const FontContext = createContext('');

export const fontContext = () => useContext(FontContext);

export const dispatchFontContext = () => useContext(DispatchFontContext);

type Props = {
   children: ReactNode
}

export const FontProvider = ({ children }: Props) => {

   const [font, setFont] = useState('')

   const handleSetFontState = (value: string) => {
      setFont(value);
   }

   return (
      <FontContext.Provider value={font}>
         <DispatchFontContext.Provider value={handleSetFontState}>
            {children}
         </DispatchFontContext.Provider>
      </FontContext.Provider>

   )
}