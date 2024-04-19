import React, {useContext, createContext, useState, useEffect} from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        if (storedLoginState) {
            setisLoggedIn(JSON.parse(storedLoginState));
        }
      }, []);

    const loginUser = () => {
        setisLoggedIn(true)
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
    }

    const logoutUser = () => {
        setisLoggedIn(false)
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem("currUser")
    }

    return(
        <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}