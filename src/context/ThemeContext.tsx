"use client"
import { useState, createContext, useContext, ReactNode } from 'react';

const DispatchThemeContext = createContext((value: string) => { });

const ThemeContext = createContext('dark');


export const themeContext = () => useContext(ThemeContext);

export const dispatchthemeContext = () => useContext(DispatchThemeContext);

type Props = {
   children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => {

   const [state, setState] = useState('light')

   const handleSetThemeState = (value: string) => {
      setState(value);
   }

   return (
      <ThemeContext.Provider value={state}>
         <DispatchThemeContext.Provider value={handleSetThemeState}>
            {children}
         </DispatchThemeContext.Provider>
      </ThemeContext.Provider>

   )
}
