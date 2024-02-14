import { useState, useContext,createContext } from "react";

const DarkThemeContext = createContext()


export const TodoThemeContext = ({children}) => {

    const [dark, setDark] = useState(false)
   
  return (
    <DarkThemeContext.Provider value={{dark,setDark}}>
       {children}
    </DarkThemeContext.Provider>
  )
}


export const DarkTheme =()=>{
    return useContext(DarkThemeContext)
}



