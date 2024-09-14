import { createContext, useState } from "react";

const themeValue = createContext();

function TheemContextProvider({children}){

    const [theme, setTheme] = useState("light");

    return(
        <themeValue.Provider value={{setTheme,theme}}>
            {children}
        </themeValue.Provider>
    )
}

export { TheemContextProvider, themeValue}