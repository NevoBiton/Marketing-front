import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { formatJWTTokenToUser } from "../../utiles/formatToken"


const UserContext = createContext();


const UserProvider = ({ children }) => {


    const [loggedInUser, setLoggedInUser] = useState("");
    const [loading, setLoading] = useState(true);
    const URL = "http://localhost:3000/api/auth";
    const token = localStorage.getItem("token")

    function logOut() {
        localStorage.removeItem("token");
        setLoggedInUser(null)
        console.log("Logged out");
    }

    useEffect(() => {
        if (token) {
            const { userId } = formatJWTTokenToUser(token)
            async function fetchUser() {
                try {
                    const response = await axios.get(`${URL}/${userId}`);
                    console.log(response.data.user);
                    setLoggedInUser(response.data.user);
                } catch (error) {
                    console.error(error);
                    setLoggedInUser(null);
                } finally {
                    setLoading(false);
                }
            }
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ loggedInUser, logOut, loading }}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };