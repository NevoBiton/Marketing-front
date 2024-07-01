import React, { useEffect, useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import "../styles/nav-bar.css";
import { UserContext } from "../src/contexts/UserContext";

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
        return <div>Loading...</div>;
    }

    return (
        <nav>
            <ul className="top-nav-bar">
                <li>
                    <TopNavLink href="/">Home</TopNavLink>
                </li>
                <li>
                    <TopNavLink href="/product">Products</TopNavLink>
                </li>
                <li>
                    <TopNavLink href="/add">Add Product</TopNavLink>
                </li>

                {!loggedInUser ? ( // if statement to check what needed to show on the nav page
                    <>
                        <li>
                            <TopNavLink href="/login">Login</TopNavLink>
                        </li>
                        <li>
                            <TopNavLink href="/register">Register</TopNavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <TopNavLink href="/profile">Profile</TopNavLink>
                        </li>

                        <div className="welcome-and-logout">
                            <li>
                                <span>Welcome, {LoggedUserName}!</span>
                            </li>
                            <li>
                                <a href="/" onClick={handleLogout}>Logout</a>
                            </li>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default TopNavBar;


