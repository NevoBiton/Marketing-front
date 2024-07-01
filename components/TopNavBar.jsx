import React, { useEffect, useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import "../styles/nav-bar.css";
import { UserContext } from "../src/contexts/UserContext";
import Avatar from "./AvatarComponent";

function TopNavBar() {
    const { loggedInUser, logOut, loading } = useContext(UserContext);
    const LoggedUserName = loggedInUser ? loggedInUser.firstName : "";

    function TopNavLink(props) {
        const { href, children } = props;
        return (
            <NavLink
                to={href}
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                {children}
            </NavLink>
        );
    }

    function handleLogout() {
        logOut();
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (loggedInUser) {
        return (
            <nav>
                <ul className="top-nav-bar">
                    <div className="content-links">
                        <li>
                            <TopNavLink href="/">Home</TopNavLink>
                        </li>
                        <li>
                            <TopNavLink href="/product">Products</TopNavLink>
                        </li>
                        <li>
                            <TopNavLink href="/profile">Profile</TopNavLink>
                        </li>
                        <li>
                            <TopNavLink href="/add">Add Product</TopNavLink>
                        </li>
                    </div>
                    <div className="welcome-and-logout">
                        <Avatar />
                        <li>
                            <span>Welcome, {loggedInUser.firstName}!</span>
                        </li>
                        <li>
                            <a href="/" onClick={handleLogout}>Logout</a>
                        </li>
                    </div>
                </ul>
            </nav>
        );
    } else {
        return (
            <nav>
                <ul className="top-nav-bar">
                    <div className="content-links">
                        <li>
                            <TopNavLink href="/">Home</TopNavLink>
                        </li>
                        <li>
                            <TopNavLink href="/product">Products</TopNavLink>
                        </li>
                    </div>
                    <div className="login-and-register">
                        <li>
                            <span>Welcome, Guest!</span>
                        </li>
                        <li>
                            <TopNavLink href="/login">Login</TopNavLink>
                        </li>
                        <li>
                            <TopNavLink href="/register">Register</TopNavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        );
    }


}

export default TopNavBar;


