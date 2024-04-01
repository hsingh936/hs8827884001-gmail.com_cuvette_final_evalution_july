import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './checkout.module.css';
import Phone from '../../images/phone.png';
import Line from '../../images/Line.png';
import Logo from '../../images/logo.png';
import Arrow from '../../images/Arrow.png';
import cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import Home from '../../images/Home.png';
import Congratulations from '../Checkout/congo';

export default function Checkout() {
  const [userName, setUserName] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const deliveryFee = 45;

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
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {

      const authToken = localStorage.getItem('authToken');

      const response = await axios.get(`http://localhost:5000/auth/username`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const { name } = response.data;
      setUserName(name);
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/mycart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handlePlaceOrder = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const address = document.getElementById('addressTextArea').value;
      const paymentMethod = document.getElementById('paymentDropdown').value;

      const response = await axios.post(
        'http://localhost:5000/checkout/check',
        {
          userId: localStorage.getItem('userId'),
          userName,
          address,
          payment: paymentMethod,
          items: cartItems.map(item => ({
            imageUrl: item.imageUrl,
            name: item.name,
            color: item.color,
            price: item.price,
          })),
          orderTotal: totalCost,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      setOrderPlaced(true);
    }
    catch (error) {
      console.error('Error placing order:', error);
    }
  };


  const totalCost = cartItems.reduce((total, item) => total + parseFloat(item.price), 0) + deliveryFee;

  const handleHomeMobileClick = () => {
    navigate('/home')
  }

  const handleLogOutMoileClick = () => {
    navigate('/login')
  }

  const handleViewCartButton = () => {
    navigate('/cart');
  }

  return (
    <div className={styles.MainConatiner}>

      {orderPlaced ? (
        <Congratulations />
      ) : (
        <>
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
                  <span className={styles.ProductName}>Checkout</span>
                </div>
              </div>

              <div className={styles.back2product}>
                <button className={styles.back2productBtn}>Back to products</button>
              </div>

              <div className={styles.CheckoutHeader}>
                <span className={styles.checkoutText}>Checkout</span>
              </div>

              <div className={styles.CheckOutDetailsWholeDiv}>
                <div className={styles.CheckOutDetailsWhole}>
                  <div className={styles.CheckOutAddressDiv}>
                    <span className={styles.CheckOutAddressText}>1. Delivery Address</span>
                    <div className={styles.CheckOutAddress}>
                      <span className={styles.CheckOutUserName}>{userName}</span>
                      <textarea id="addressTextArea" className={styles.AddressText}></textarea>
                    </div>
                  </div>

                  <div className={styles.CheckoutPayment}>
                    <span className={styles.CheckOutPaymentText}>2. Payment method</span>
                    <select id="paymentDropdown" className={styles.paymentDropdown}>
                      <option value="">Mode of payment</option>
                      <option value="Pay on delivery">Pay on delivery</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>

                  <div className={styles.CheckoutitemsDiv}>
                    <span className={styles.CheckoutitemsText}>3. Review items and delivery</span>
                    <div className={styles.ProductGrid}>
                      {cartItems.map((item) => (
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
                        <span className={styles.itemStock}>In Stock</span>
                        <span className={styles.itemEsti}>Estimated delivery :</span>
                        <span className={styles.itemDelivery}> Monday — FREE Standard Delivery</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.placeOrderDiv}>
                <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>Place your order</button>
                <p className={styles.placeOrderPara}>Order Total : ₹ {totalCost} <br /> By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
              </div>

              <div className={styles.footer}>
                <span className={styles.footerReserved}>Musicart | All rights reserved</span>
              </div>
            </div>
          )}

          {windowWidth > 768 && (
            <div className={styles.placeOrderDivRight}>

              <div className={styles.placeOrderRight1stHalf}>
                <button className={styles.placeOrderBtnRight} onClick={handlePlaceOrder}>Place your order</button>
                <p className={styles.placeOrderRightPara}>By placing your order, you agree to Musicart privacy <br /> notice and conditions of use.</p>
              </div>

              <div className={styles.placeOrderRight2ndHalf}>
                <span>Order Summary</span>
                <div className={styles.placeOrderRight2ndHalfItems}>
                  <span>Items : </span>
                  <span>₹ {cartItems.reduce((total, item) => total + parseFloat(item.price), 0)}.00</span>
                </div>

                <div className={styles.placeOrderRight2ndHalfIDeli}>
                  <span>Delivery : </span>
                  <span>₹45.00</span>
                </div>
              </div>

              <div className={styles.placeOrderRight3rdHalf}>
                <span>Order Total :</span>
                <span>₹ {totalCost}.00</span>
              </div>

            </div>
          )}

          {windowWidth <= 768 && (
            <div className={styles.mobileviewContainer}>

              <div className={styles.headerLogin}>
                <img className={styles.musiclogo} src={Logo} alt="MusicLogo" />
                <h2 className={styles.musicheader}>Musicart</h2>
              </div>

              <button className={styles.mobileBackButton}>
                <img src={Arrow} alt="" />
              </button>

              <div className={styles.mobileDetailsDiv}>
                <h2 className={styles.mobileDetailsHeader}>Checkout</h2>


                <div className={styles.mobileDetailsAddressDiv}>
                  <span className={styles.mobileDetailsAddressText}>1. Delivery Address</span>
                  <div className={styles.mobileDetailsAddress}>
                    <span className={styles.mobileDetailsUserName}>{userName}</span>
                    <textarea id="addressTextArea" className={styles.AddressText}></textarea>
                  </div>
                </div>

                <div className={styles.mobileDetailsPayment}>
                  <span className={styles.mobileDetailsPaymentText}>2. Payment method</span>
                  <select id="paymentDropdown" className={styles.mobileDetailspaymentDropdown}>
                    <option value="">Mode of payment</option>
                    <option value="Pay on delivery">Pay on delivery</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>

                <div className={styles.mobileDetailsitemsDiv}>
                  <span className={styles.mobileDetailsitemsText}>3. Review items and delivery</span>
                  <div className={styles.mobileDetailsProductGrid}>
                    {cartItems.map((item) => (
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
                      <span className={styles.mobileDetailsitemStock}>In Stock</span>
                      <span className={styles.mobileDetailsitemEsti}>Estimated delivery :</span>
                      <span className={styles.mobileDetailsitemDelivery}> Monday — FREE Standard Delivery</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.MobileNavBar}>
                <div className={styles.HomeDiv}>
                  <button className={styles.button1} onClick={handleHomeMobileClick}>
                    <img src={Home} alt="Home" />
                    <span className={styles.buttonText}>Home</span>
                  </button>
                </div>

                <div className={styles.CartDiv}>
                  <button className={styles.button2} onClick={handleViewCartButton}>
                    <img src={cart} alt="Cart" />
                    <span className={styles.buttonTextCart}>Cart</span>
                  </button>
                </div>

                <div className={styles.LoginDiv}>
                  <button className={styles.button3} onClick={handleLogOutMoileClick}>
                    <img src={Login} alt="Login" />
                    <span className={styles.buttonText}>Logout</span>
                  </button>
                </div>
              </div>

              <div className={styles.OrderSummary}>
                <div className={styles.OrderSummaryText}>
                  <span>Order Total :</span>
                  <span>₹ {totalCost}.00</span>
                </div>
                <button className={styles.mobileDetailsOrderBtn} onClick={handlePlaceOrder}>Place your order</button>
              </div>
            </div>
          )}
         </>
      )}
        </div>

      );
}
