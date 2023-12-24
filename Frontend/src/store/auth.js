import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [address, setServiceProviderAddress] = useState("");
    const [usdtContractAddress, setusdtContractAddress] = useState("");
    const [usddContractAddress, setusddContractAddress] = useState("");
    const [enum1, setEnum1] = useState("");
    const [enum2, setEnum2] = useState("");
    let isLoggedIn = !!token;

    const getAddresses = async () => {
        try {
            const url = "http://localhost:8000/get_address";
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log("API data: ", data);
                setServiceProviderAddress(data.addresses.serviceProvider);
                setusdtContractAddress(data.addresses.usdt);
                setusddContractAddress(data.addresses.usdc);
                setEnum1(data.addresses.enum1);
                setEnum2(data.addresses.enum2);
                console.log("API CHANGES: ", address, usdtContractAddress, usddContractAddress);
            } else {
                console.error('Failed to fetch addresses:', res.status);
            }
        } catch (error) {
            console.log('Error fetching addresses:', error);
        }
    }

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
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
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();

                if (data.msg) {
                    setUser(data.msg);
                    
                    
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };
    

    useEffect(() => {
        getAddresses();
        userAuthentication();
    }, [])


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, token,address, usdtContractAddress, usddContractAddress,enum1,enum2}}>
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