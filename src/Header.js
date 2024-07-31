import React from 'react';
import './Header.css';

const Header = ({ title, description, imageUrl }) => {
    return (
        <header className="header" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="header-content">
                <h1 className="header-title">{title}</h1>
                <p className="header-description">{description}</p>
            </div>
        </header>
    );
};

export default Header;