import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [address, setServiceProviderAddress] = useState("TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd");
    const [usdtContractAddress, setusdtContractAddress] = useState("TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj");
    const [usddContractAddress, setusddContractAddress] = useState("TGjgvdTWWrybVLaVeFqSyVqJQWjxqRYbaK");
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
                setServiceProviderAddress(data.Addresses.serviceProvider);
                setusdtContractAddress(data.Addresses.usdt);
                setusddContractAddress(data.Addresses.usdc);
            } else {
                console.error('Failed to fetch payment history:', res.status);
            }
        } catch (error) {
            console.log('Error fetching payment history:', error);
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
        userAuthentication();
        getAddresses();
    }, [])


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, token,address, usdtContractAddress, usddContractAddress}}>
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