import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './InvoiceDetails.module.css';
import Phone from '../../images/phone.png';
import Line from '../../images/Line.png';
import Logo from '../../images/logo.png';
import Arrow from '../../images/Arrow.png';
import cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import Home from '../../images/Home.png';
import Vector from '../../images/Vector.png';

function InvoiceDetails() {
  const [invoice, setInvoice] = useState({});
  const { checkoutId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
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
    const fetchInvoiceDetails = async () => {
      try {
        const response = await axios.get(`https://musicartapi.onrender.com/checkout/invo/${checkoutId}`);

        const data = response.data;
        setInvoice(data);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    };

    fetchInvoiceDetails();
  }, [checkoutId]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogOutClick = () => {
    navigate('/login')
  }

  let totalPrice = 0;
  if (invoice.items) {
    totalPrice = invoice.items.reduce((total, item) => total + parseFloat(item.price), 0);
  }

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

const handleback2Product = () => {
  navigate('/home');
};

  if (Object.keys(invoice).length === 0) {
    return <div>Loading...</div>;
  }

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
              <button className={styles.outbtn} onClick={handleLogOutClick}>Logout</button>
            </div>
          </div>

          <div className={styles.mainheader}>
            <div className={styles.mainheaderLeft}>
              <img className={styles.logoImg} src={Logo} alt="" />
              <h2 className={styles.headerText}>Muiscart</h2>
              <span className={styles.headerSpan}>HOME /</span>
              <span className={styles.ProductName}>Invoices</span>
            </div>
          </div>

          <div className={styles.back2product}>
            <button className={styles.back2productBtn} onClick={handleback2Product}>Back to products</button>
          </div>

          <div className={styles.CheckoutHeader}>
            <span className={styles.checkoutText}>Invoice</span>
          </div>

          <div className={styles.CheckOutDetailsWholeDiv}>
            <div className={styles.CheckOutDetailsWhole}>
              <div className={styles.CheckOutAddressDiv}>
                <span className={styles.CheckOutAddressText}>1. Delivery Address</span>
                <div className={styles.CheckOutAddress}>
                  <span className={styles.CheckOutUserName}>{invoice.userName}</span>
                  <p className={styles.AddressText}>{invoice.address}</p>
                </div>
              </div>

              <div className={styles.CheckoutPayment}>
                <span className={styles.CheckOutPaymentText}>2. Payment method</span>
                <span className={styles.InvoicePaymentType}>{invoice.payment}</span>
              </div>

              <div className={styles.CheckoutitemsDiv}>
                <span className={styles.CheckoutitemsText}>3. Review items and delivery</span>
                <div className={styles.ProductGrid}>
                  {invoice.items.map((item) => (
                    <div key={item._id} className={styles.Checkoutitems}>
                      <div className={styles.itemHolderDiv}>
                        <button className={styles.itemBtn} onClick={() => handleItemClick(item)}>
                          <img className={styles.itemBtnImg} src={item.imageUrl} alt={item.name} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedItem && (
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{selectedItem.name}</span>
                    <span className={styles.itemColor}>Color: {selectedItem.color}</span>
                    <span className={styles.itemEsti}>Estimated delivery :</span>
                    <span className={styles.itemDelivery}> Monday — FREE Standard Delivery</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className={styles.totalamountDiv}>
            <div className={styles.totalamount1stDiv}>
              <span className={styles.summaryText}>Order Summary</span>

              <div className={styles.totalamountitems}>
                <span>Items :</span>
                <span className={styles.itempriceText}>₹{totalPrice}.00</span>
              </div>

              <div className={styles.totalamountDeli}>
                <span>Delivery :</span>
                <span className={styles.totalamounDeliText}>₹45.00</span>
              </div>
            </div>

            <div className={styles.totalamounFinalTextDiv}>
              <span>Order Total :</span>
              <span>₹{invoice.orderTotal}.00</span>
            </div>

          </div>

          <div className={styles.footer}>
            <span className={styles.footerReserved}>Musicart | All rights reserved</span>
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

          <div className={styles.mobileDetailsDiv}>
            <h2 className={styles.mobileDetailsHeader}>Checkout</h2>

            <div className={styles.mobileDetailsAddressDiv}>
              <span className={styles.mobileDetailsAddressText}>1. Delivery Address</span>
              <div className={styles.mobileDetailsAddress}>
                <span className={styles.mobileDetailsUserName}>{invoice.userName}</span>
                <p className={styles.mobileAddressText}>{invoice.address}</p>
              </div>
            </div>

            <div className={styles.mobileDetailsPayment}>
              <span className={styles.mobileDetailsPaymentText}>2. Payment method</span>
              <span className={styles.mobileDetailsPaymentType}>{invoice.payment}</span>
            </div>

            <div className={styles.mobileDetailsitemsDiv}>
              <span className={styles.mobileDetailsitemsText}>3. Review items and delivery</span>
              <div className={styles.mobileDetailsProductGrid}>
                {invoice.items.map((item) => (
                  <div key={item._id} className={styles.mobileDetailsitems}>
                    <div className={styles.mobileDetailsDiv}>
                      <button className={styles.mobileDetailsitemBtn} onClick={() => handleItemClick(item)}>
                        <img className={styles.mobileDetailsitemBtnImg} src={item.imageUrl} alt={item.name} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {selectedItem && (
                <div className={styles.mobileDetailsitemDetails}>
                  <span className={styles.mobileDetailsitemName}>{selectedItem.name}</span>
                  <span className={styles.mobileDetailsitemColor}>Color: {selectedItem.color}</span>
                  <span className={styles.mobileDetailsitemEsti}>Estimated delivery :</span>
                  <span className={styles.mobileDetailsitemDelivery}> Monday — FREE Standard Delivery</span>
                </div>
              )}
            </div>
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

                    <div className={styles.mobileTotalOrderDiv}>
                      <span className={styles.mobileTotalOrderDivText}>Order Total :</span>
                      <span className={styles.mobileTotalOrderText}>₹{invoice.orderTotal}.00</span>
                    </div>
        </div>
      )}

    </div>
  );
}

export default InvoiceDetails;
