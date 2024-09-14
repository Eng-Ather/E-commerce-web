
// _____________________
import { Spinner } from "@nextui-org/react";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";

// Create the context
const UserContext = createContext();

// Provider component
function UserContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUserInfo, setCurrentUserInfo] = useState({ isLogin: false, userid: {} });

    // Handle user state changes
    function onAuthChanged(user) {
        if (user) {
            setCurrentUserInfo({
                isLogin: true,
                userid: {
                    // name: user?.displayName,
                    // photoUrl: user?.photoURL,
                    email: user?.email,
                },
            });
        } else {
            setCurrentUserInfo({ isLogin: false, userid: {} });
        }
        setLoading(false);
    }

    // Subscribe to auth state changes
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthChanged);
        return () => subscriber(); // Clean up subscription on unmount
    }, []);

    return (
        <UserContext.Provider value={{ currentUserInfo, setCurrentUserInfo }}>
            {loading ? (
                <div className="w-full h-96 flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}
export { UserContext, UserContextProvider };
