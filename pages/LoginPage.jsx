import React from 'react'
import axios from 'axios';
import LoginFormComponent from '../components/LoginFormComponent'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
    const [redirect, setRedirect] = useState(false);

    async function handleLogin(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        console.log(formData);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                username,
                password,
            });
            const { token } = res.data;
            console.log(token);
            localStorage.setItem("token", token);
            console.log("Logged in!");
            setRedirect(true);

        } catch (error) {
            console.log(error);
        }
    }

    function formatJWTTokenToUser(token) {
        const decodedJwt = _parseJwt(token);
        if (!decodedJwt) return null;

        const {
            payload: { userId },
        } = decodedJwt;

        return { userId };
    }

    function _parseJwt(token) {
        // split the token into header, payload, and signature
        const [header, payload, signature] = token.split(".");

        // replace URL-safe characters with standard base64 characters
        const fixedHeader = header.replace(/-/g, "+").replace(/_/g, "/");
        const fixedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");

        // decode the header and payload from base64
        const decodedHeader = atob(fixedHeader);
        const decodedPayload = atob(fixedPayload);

        // parse the JSON objects from the decoded header and payload
        const headerObj = JSON.parse(decodedHeader);
        const payloadObj = JSON.parse(decodedPayload);

        // return an object with the decoded header, payload, and signature
        return {
            header: headerObj,
            payload: payloadObj,
            signature,
        };
    }

    if (redirect) {
        return <Navigate to="/product" />; // Redirect to /product if redirect is true
    }

    return (
        <div><LoginFormComponent
            handleLogin={handleLogin}
        /></div>
    )
}

export default LoginPage