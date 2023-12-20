import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    let isLoggedIn = !!token;
    
    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token")
    }

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8000/user", {
                method: "GET",
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User data: ", data.userData);
                setUser(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userAuthentication();
    }, [])
    

    return (
        <AuthContext.Provider value={{ isLoggedIn , storeTokenInLS, LogoutUser , user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};