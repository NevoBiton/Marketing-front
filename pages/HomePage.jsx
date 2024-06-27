import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/homepage.css"

function HomePage() {
    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to Our Products App</h1>
                <p>Discover amazing products just for you</p>
            </header>
            <main className="main-content">
                <section className="features">
                    <div className="feature">
                        <h2>Explore Products</h2>
                        <p>Discover a wide range of products tailored to your needs.</p>
                    </div>
                    <div className="feature">
                        <h2>Easy Shopping</h2>
                        <p>Shop conveniently with our intuitive search and filter options.</p>
                    </div>
                    <div className="feature">
                        <h2>Manage Inventory</h2>
                        <p>Efficiently manage your product inventory with our powerful tools.</p>
                    </div>
                </section>
                <section className="cta">
                    <h2>Start Exploring Now!</h2>
                    <Link to="/products" className="cta-button">Explore Products</Link>
                </section>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Your Products App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
