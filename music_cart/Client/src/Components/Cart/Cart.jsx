import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Phone from '../../images/phone.png';
import Line from '../../images/Line.png';
import Logo from '../../images/logo.png';
import CartDesk from '../../images/CartDesk.png';
import Bag from '../../images/Bag.png';
import SearchIcon from '../../images/search.png';
import Arrow from '../../images/Arrow.png';
import Line2 from '../../images/Line2.png';
import cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import Home from '../../images/Home.png';


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
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


  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/cart/mycart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems(); 
  }, []);

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += parseFloat(item.price) * (item.quantity || 1);
    });
    setTotalPrice(totalPrice);
  };

  const handleQuantityChange = (index, event) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = parseInt(event.target.value);
    setCartItems(newCartItems);
    calculateTotalPrice(newCartItems);
  };

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  const handleback2Product = () => {
    navigate('/home');
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);
    if (searchValue === '') {
      fetchCartItems();
    } else {
      const filteredResults = cartItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      setCartItems(filteredResults);
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

  return (
    <div className={styles.MainConatiner}>

      {windowWidth > 768 && (
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
       )}
      
      {windowWidth > 768 && (
      <div className={styles.mainheader}>
        <div className={styles.mainheaderLeft}>
          <img className={styles.logoImg} src={Logo} alt="" />
          <h2 className={styles.headerText}>Muiscart</h2>
          <span className={styles.headerSpan}>HOME /</span>
          <span className={styles.ProductName}>View Cart</span>
        </div>

        <div className={styles.mainheaderRight}>
          <button className={styles.viewCartBtn}>
            <img className={styles.cartImg} src={CartDesk} alt="" />
            <span className={styles.viewCartText}>View Cart</span>
          </button>
        </div>
      </div>
      )}
      
      {windowWidth > 768 && (
      <div className={styles.back2product}>
        <button className={styles.back2productBtn} onClick={handleback2Product}>Back to products</button>
      </div>
      )}
      
      {windowWidth > 768 && (
      <div className={styles.myCartHeader}>
        <img className={styles.myCartBags} src={Bag} alt="" />
        <span className={styles.myCartText}>My Cart</span>
      </div>
      )}
      
      {windowWidth > 768 && (
      <div className={styles.myCartWholeDetailsDiv}>
        <div className={styles.myCartDetailsDiv}>
          {cartItems.map((item, index) => (
            <div key={index} className={styles.myCartProducts}>
              <div className={styles.myCartProductsInternal}>
                <div>
                  <img className={styles.myCartImg} src={item.imageUrl} alt={item.name} />
                </div>
                <div className={styles.myCartDetails}>
                  <span className={styles.myCartName}>{item.name}</span>
                  <span className={styles.myCartColor}>Colour: {item.color}</span>
                  <span className={styles.myCartStock}>In Stock</span>
                </div>
                <div className={styles.myCartPrice}>
                  <span className={styles.myCartPriceText}>Price</span>
                  <span className={styles.myCartPrice}>₹ {item.price}</span>
                </div>
                <div className={styles.myCartQuant}>
                  <span className={styles.myCartQuanText}>Quantity</span>
                  <select
                    className={styles.dropDownQuantity}
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, e)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.myCartTotal}>
                  <span className={styles.myCartTotalText}>Total</span>
                  <span>₹ {item.price * (item.quantity || 1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        

    
      <div className={styles.myCartPriceDetailsDiv}>
        <span>PRICE DETAILS</span>
        <div className={styles.myCartTotalDetailsDiv}>
          <span className={styles.myCartTotalDetailsText}>Total MRP</span>
          <span className={styles.myCartTotalDetailsCount}>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className={styles.myCartPriceDisDiv}>
          <span className={styles.myCartPriceDisText}>Discount on MRP</span>
          <span className={styles.myCartPriceDisCount}>₹0</span>
        </div>
        <div className={styles.myCartPriceConviDiv}>
          <span className={styles.myCartPriceConviText}>Convenience Fee</span>
          <span className={styles.myCartPriceConviCount}>₹45</span>
        </div>
        <div className={styles.myCartPlaceOrder}>
          <div className={styles.myCartPlaceOrderTotalText}>
            <span>Total Amount</span>
            <span>₹ {(totalPrice + 0 + 45).toFixed(2)}</span>
          </div>
          <button className={styles.myCartPlaceOrderBtn} onClick={handlePlaceOrder}>PLACE ORDER</button>
        </div>
      </div>
      </div>
      )}
      
      {windowWidth > 768 && (
      <div className={styles.totalItemDiv}>
        <span>{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} item</span>
        <span>₹ {totalPrice.toFixed(2)}</span>
      </div>
      )}
      
      {windowWidth > 768 && (
      <div className={styles.footer}>
        <span className={styles.footerReserved}>Musicart | All rights reserved</span>
      </div>
      )}
     
      
     {windowWidth <= 768 && (
  <div className={styles.MobileViewDiv}>
    <div className={styles.MobileHeader}>
      <div className={styles.searchBar}>
        <img src={SearchIcon} alt="Search" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by product name"
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <button className={styles.MobileBackButton} onClick={handleback2Product}>
        <img src={Arrow} alt="" /> 
      </button>

      <div className={styles.MobileCartDetails}>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.MobileCartItem}>
            <div className={styles.MobileCartImgDiv}>
              <img className={styles.MobileCartImg} src={item.imageUrl} alt={item.name} />
            </div>

            <div className={styles.MobileCartText}>
              <span className={styles.MobileCartNameText}>{item.name}</span>
              <span className={styles.MobileCartPriceText}>₹ {item.price}</span>
              <span className={styles.MobileCartColorText}>Color: {item.color}</span>
              <span className={styles.MobileCartStockText}>In Stock</span>
              <span className={styles.MobileCartConviText}>Convenience Fee ₹45</span>
              <span className={styles.MobileCartTotalText}>Total: ₹ {item.price * (item.quantity || 1)}</span>
            </div>
          </div>
        ))}      
      </div>

      <div>
         <img className={styles.MobileCartLine} src={Line2} alt="" />
      </div>

      <div className={styles.MobileTotalAmount}>
        <span>Total Amount :</span>
        <span className={styles.MobileTotalAmountSpan}>₹ {totalPrice.toFixed(2)}</span>
      </div>

      <button className={styles.myCartPlaceOrderMobileBtn} onClick={handlePlaceOrder}>PLACE ORDER</button>

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

    </div>
  </div>
)}

  </div>

    
  );
}
