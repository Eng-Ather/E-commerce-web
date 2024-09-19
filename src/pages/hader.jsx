import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

import Button from "../component/Button";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { themeValue } from "./context/themContext";
import { UserContext } from "./context/userContext";

function Header() {
    const {currentUserInfo} = useContext(UserContext)
    const {theme, setTheme} = useContext(themeValue)
    const navigate = useNavigate()

    // // signout Function
    // const handleSignOut = async () => {
    //     try {await signOut(auth); navigate("/"); } 
    //     catch (error) {console.error("Sign Out Error:", error); }
    // }
   
    return (
        <header 
         className={`
            ${theme == "light" ? "bg-white text-orange-400" : "bg-orange-400 text-white"}
             body-font headre p-3 font-semibold md:ml-auto flex flex-wrap items-center 
             text-base justify-center`}>
                    
             <Link to="/home" className="mr-5 hover:text-gray-900">
             Home
             </Link>
             
             <Link to="/signup" className="mr-5 hover:text-gray-900">
             Sign Up
             </Link>

             {/* Change theme Button */}
             <Button
                 onPress={() => 
                        {
                        if (theme === "light") {setTheme("dark");}
                        else {setTheme("light");}
                        }
                 }
                 label={theme === "light" ? 'Orange Theme' : 'Change Theme'}
                /> 
             
                {/* _____ User Profile Statuse ___ */}
                <div>
                    {
                     currentUserInfo.isLogin ?
                     (
                     <div className="text-center">
                        <div className="text-2xl"> { currentUserInfo.userid.email}</div>
                         <Link to="/signin" className="text-center px-2 hover:text-gray-900 rounded-md hover:bg-white">
                          <Button 
                           // signout Function
                            onPress={ async()=>{                            
                                    try
                                    {
                                        await signOut(auth); 
                                        navigate("/"); 
                                    } 
                                    catch (error) 
                                    {alert("Sign Out Error:", error); }
                                }}
                             label={'sign out'}
                            />
                         </Link>
                     </div>
                     )
                      :
                     (
                     <Link to="/signin" className="mr-5 hover:text-gray-900">
                        Sign In
                     </Link>
                     )
                    }
                </div>         
        </header>
    );
}
export default Header;
