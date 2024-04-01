import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './invoice.module.css';
import Phone from '../../images/phone.png';
import Line from '../../images/Line.png';
import Logo from '../../images/logo.png';
import InvoiceIcon from '../../images/invoice.png';
import Arrow from '../../images/Arrow.png';
import MobileInvoice from '../../images/MobileInvoice.png';
import cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import Home from '../../images/Home.png';
import Vector from '../../images/Vector.png';

export default function Invoice() {
    const [invoices, setInvoices] = useState([]);
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

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const userId = localStorage.getItem('userId');

            const response = await axios.get(`http://localhost:5000/checkout/invoice/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const data = response.data;
            setInvoices(data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
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

    const handleDetailsButton = (invoiceId) => {
        console.log(`Details clicked for product ID: ${invoiceId}`);
        navigate(`/invo/${invoiceId}`);
    };

    const handleback2Product = () => {
        navigate('/home');
      };


    return (
        <div className={styles.MainConatiner}>
            {windowWidth > 768 && (
                <div className={styles.DesktopConatiner}>
                    <div className={styles.headerInfo}>
                        <div className={styles.headerInfoLeft}>
                            <img className={styles.phoneImg} src={Phone} alt="" />
                            <span className={styles.number}>912121131313</span>
                        </div>

                        <div className={styles.headerInfoCenter}>
                            <span className={styles.disc}>Get 50% off on selected items</span>
                            <img className={styles.lineImg} src={Line} alt="" />
                            <span className={styles.ShopNow}>Shop Now</span>
                        </div>

                        <div className={styles.headerInfoRight}>
                            <button className={styles.outbtn} onClick={handleLogOutMoileClick}>Logout</button>
                        </div>
                    </div>

                    <div className={styles.mainheader}>
                        <div className={styles.mainheaderLeft}>
                            <img className={styles.logoImg} src={Logo} alt="" />
                            <h2 className={styles.headerText}>Muiscart</h2>
                            <span className={styles.headerSpan}>HOME /</span>
                            <span className={styles.ProductName}>Invoice</span>
                        </div>
                    </div>

                    <div className={styles.back2product}>
                        <button className={styles.back2productBtn} onClick={handleback2Product}>Back to Home</button>
                    </div>

                    <div className={styles.InvoiceHeader}>
                        <span className={styles.invoiceText}>My Invoices</span>
                    </div>

                    <div className={styles.footer}>
                        <span className={styles.footerReserved}>Musicart | All rights reserved</span>
                    </div>

                    <div className={styles.invoicesWholeDiv}>
                        {invoices.map((invoice) => (
                            <div className={styles.invoicesDiv} key={invoice._id}>
                                <img src={InvoiceIcon} alt="" className={styles.invoicesImg} />
                                <div className={styles.invoicesUserDetails}>
                                    <span className={styles.invoicesUserName}>{invoice.userName}</span>
                                    <p className={styles.invoicesUserAddress}>{invoice.address}</p>
                                </div>
                                <button className={styles.invoicesBtn} onClick={() => handleDetailsButton(invoice._id)}>View Invoice</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {windowWidth <= 768 && (
                <div className={styles.mobileviewContainer}>

                    <div className={styles.headerLogin}>
                        <img className={styles.musiclogo} src={Logo} alt="MusicLogo" />
                        <h2 className={styles.musicheader}>Musicart</h2>
                    </div>

                    <button className={styles.mobileBackButton} onClick={handleback2Product}>
                        <img src={Arrow} alt="" />
                    </button>

                    <div className={styles.mobileDetailsHeaderDiv}>
                        <img src={MobileInvoice} alt="" className={styles.mobileInvoiveIcon} />
                        <h2 className={styles.mobileDetailsHeader}>My Invoices</h2>
                    </div>

                    <div className={styles.mobileinvoicesWholeDiv}>
                        {invoices.map((invoice) => (
                            <div className={styles.mobileinvoicesDiv} key={invoice._id}>
                                <img src={InvoiceIcon} alt="" className={styles.mobileinvoicesImg} />
                                <div className={styles.mobileinvoicesUserDetails}>
                                    <span className={styles.mobileinvoicesUserName}>{invoice.userName}</span>
                                    <p className={styles.mobileinvoicesUserAddress}>{invoice.address}</p>
                                </div>
                                <button className={styles.mobileinvoicesBtn} onClick={() => handleDetailsButton(invoice._id)}>View Invoice</button>
                            </div>
                        ))}
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
    )
}

