import { useContext } from "react";
import { themeValue } from "../pages/context/themContext";   


function Button({ label, bgColor, onPress, txtColor }) {
  const { theme } = useContext(themeValue);
  return (
    <button
      onClick={onPress}
      className={`  
       ${theme == 'light' ? 'bg-orange-400 text-white' : "bg-white text-orange-400"} 
       rounded-md p-1 px-4 m-4`}
    >
      {label}
    </button>
  );
}

export default Button;