import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

export interface Props {
    children: React.ReactNode;
}

const ThemeContext = createContext<any>('')

const useTheme = () => useContext(ThemeContext)

const ThemeProvider: React.FC<Props> = ({ children }) => {
    const theme: string | any = useColorScheme()

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { useTheme, ThemeProvider }