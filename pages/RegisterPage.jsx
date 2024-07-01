import React from 'react'
import axios from 'axios';
import RegisterFormComp from '../components/RegisterFormComp'

function RegisterPage() {

    async function handleRegister(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        console.log(formData);
        const username = formData.get("username");
        const password = formData.get("password");
        const firstName = formData.get("fname");
        const lastName = formData.get("lname");

        try {
            await axios.post("http://localhost:3000/api/auth/register", {
                username,
                password,
                firstName,
                lastName
            });

            console.log("User Register successfully");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <RegisterFormComp
                handleRegister={handleRegister} />
        </div>
    )
}

export default RegisterPage