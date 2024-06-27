import React from 'react'
import InputComponent from './Input'
import "../styles/components.style.css/register-form.css"

function RegisterFormComp() {
    return (
        <div>
            <form className='register-form'>

                <h1>Register</h1>

                <div className='register-label-and-input'>
                    <label htmlFor="fname">First name :</label>
                    <InputComponent
                        type={"text"}
                        placeholder={"Name"}
                        id={"fname"}
                        required={"required"}
                    />
                </div>

                <div className='register-label-and-input'>
                    <label htmlFor="lname">Last name :</label>
                    <InputComponent
                        type={"text"}
                        placeholder={"Last name"}
                        id={"lname"}
                        required={"required"}
                    />
                </div>

                <div className='register-label-and-input'>
                    <label htmlFor="username">Username :</label>
                    <InputComponent
                        type={"text"}
                        placeholder={"Username"}
                        id={"username"}
                        required={"required"}
                    />
                </div>

                <div className='register-label-and-input'>
                    <label htmlFor="email">Email :</label>
                    <InputComponent
                        type={"email"}
                        placeholder={"Email"}
                        id={"email"}
                        required={"required"}
                    />
                </div>

                <div className='register-label-and-input'>   <label htmlFor="password">Password :</label>
                    <InputComponent
                        type={"password"}
                        placeholder={"Password"}
                        id={"password"}
                        required={"required"}
                    />
                </div>

                <div className='register-label-and-input'>   <label htmlFor="password">Confirm Password :</label>
                    <InputComponent
                        type={"password"}
                        placeholder={"Confirm Password"}
                        id={"password"}
                        required={"required"}
                    />
                </div>

                <InputComponent
                    type={"submit"}
                    className={"register-submit-button"}
                />
            </form>


        </div>
    )
}

export default RegisterFormComp