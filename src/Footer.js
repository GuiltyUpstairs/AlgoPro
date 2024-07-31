import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container text-center">
                <p className="footer-text">© {new Date().getFullYear()} AlgoPro. All rights reserved.</p>
                <p className="footer-text">
                    Follow us on
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link"> Twitter</a>,
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link"> Facebook</a>, and
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link"> LinkedIn</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;