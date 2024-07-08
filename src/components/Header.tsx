import React from 'react';
import "../../src/app/styles/Header.css"

const Header = () => {
    return (
        <header className="navbar">
            <div className="container">
                <a href="/home" className="logo">
                    MindSpark
                </a>
                <nav className="nav-links">
                    <a href="/quiz" className="nav-link">Explore</a>
                    <a href="/about" className="nav-link">About</a>
                    <a href="/contact" className="nav-link">Contact</a>
                    <div className="search-bar">
                        <input type="text" placeholder="Search Quiz" className="search-input" />
                        <button type="button" className="search-button">
                            Search
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
