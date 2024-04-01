import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './congo.module.css';
import Logo from '../../images/logo.png';
import CongoImg from '../../images/congoImg.png';
import cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import Home from '../../images/Home.png';
import Vector from '../../images/Vector.png';

export default function Congo() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleGoBack = async () => {
        try {
            const authToken = localStorage.getItem('authToken');

            await axios.delete('https://musicartapi.onrender.com/cart/clearCart', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            navigate('/home');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleHomeMobileClick = () => {
        navigate('/home')
    }

    const handleLogOutMoileClick = () => {
        navigate('/login')
    }

    const handleViewCartButton = () => {
        navigate('/cart');
    }

    const handleInvoiceButton = () => {
        navigate('/invoice');
    }

    return (
        <div className={styles.MainContainer}>
            {windowWidth > 768 && (
                <div className={styles.MainHeader}>
                    <img className={styles.logoImg} src={Logo} alt="" />
                    <h2 className={styles.headerText}>Muiscart</h2>
                </div>
            )}

            {windowWidth > 768 && (
                <div className={styles.MainContentDiv}>
                    <img src={CongoImg} alt="" className={styles.CongoImg} />
                    <span className={styles.OrderPlacedText}>Order is placed successfully!</span>
                    <span className={styles.CongiText}>You will be receiving a confirmation email with order details</span>
                    <button className={styles.backBtn} onClick={handleGoBack}>Go back to Home page</button>
                </div>
            )}

            {windowWidth > 768 && (
                <div className={styles.footer}>
                    <span className={styles.footerReserved}>Musicart | All rights reserved</span>
                </div>
            )}

            {windowWidth <= 768 && (
                <div className={styles.mobileViewDiv}>
                    <div className={styles.headerLogin}>
                        <img className={styles.musiclogo} src={Logo} alt="MusicLogo" />
                        <h2 className={styles.musicheader}>Musicart</h2>
                    </div>

                    <div className={styles.mobileMainContentDiv}>
                        <img src={CongoImg} alt="" className={styles.mobileCongoImg} />
                        <span className={styles.mobileOrderPlacedText}>Order is placed successfully!</span>
                        <span className={styles.mobileCongiText}>You will be receiving a confirmation email with order details</span>
                        <button className={styles.mobilebackBtn} onClick={handleGoBack}>Go back to Home page</button>
                    </div>

                    <div className={styles.MobileNavBar}>
                        <div className={styles.HomeDiv}>
                            <div className={styles.buttonWrapper}>
                                <button className={styles.button1} onClick={handleHomeMobileClick}>
                                    <img src={Home} alt="Home" />
                                    <span className={styles.buttonText}>Home</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles.CartDiv}>
                            <div className={styles.buttonWrapper}>
                                <button className={styles.button2} onClick={handleViewCartButton}>
                                    <img src={cart} alt="Cart" />
                                    <span className={styles.buttonTextCart}>Cart</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles.InvoiceDiv}>
                            <div className={styles.buttonWrapper}>
                                <button className={styles.button4} onClick={handleInvoiceButton}>
                                    <img src={Vector} alt="Invoice" />
                                    <span className={styles.buttonTextInvoice}>Invoice</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles.LoginDiv}>
                            <div className={styles.buttonWrapper}>
                                <button className={styles.button3} onClick={handleLogOutMoileClick}>
                                    <img src={Login} alt="Login" />
                                    <span className={styles.buttonTextLogin}>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}
