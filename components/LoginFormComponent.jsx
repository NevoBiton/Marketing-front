import React from 'react'
import InputComponent from './Input'
import "../styles/components.style.css/login-form.css"

function LoginFormComponent(props) {
    return (
        <div className='login-wrapper'>
            <form className='login-form' onSubmit={props.handleLogin}>

                <h1>Login</h1>

                <div className='login-label-and-input'>
                    <label htmlFor="name">Name :</label>
                    <InputComponent
                        type={"text"}
                        placeholder={"Name"}
                        id={"name"}
                        name={"username"}
                        required={"required"}
                    />
                </div>

                <div className='login-label-and-input'>   <label htmlFor="password">Password :</label>
                    <InputComponent
                        type={"password"}
                        placeholder={"password"}
                        id={"password"}
                        name={"password"}
                        required={"required"}
                    />
                </div>

                <InputComponent
                    type={"submit"}
                    className={"login-submit-button"}
                />
            </form>


        </div>
    )
}

export default LoginFormComponent