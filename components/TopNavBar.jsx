import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/nav-bar.css"

function TopNavBar() {


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

    return (
        <>
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
                    <li>
                        <TopNavLink href="/login">Login</TopNavLink>
                    </li>
                    <li>
                        <TopNavLink href="/register">Register</TopNavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default TopNavBar;