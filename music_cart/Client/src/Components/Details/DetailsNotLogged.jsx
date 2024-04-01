import { useState, useEffect } from 'react';
import styles from './DetailsNotLogged.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import Phone from '../../images/phone.png';
import Line from '../../images/Line.png';
import Logo from '../../images/logo.png';
import CartDesk from '../../images/CartDesk.png';
import Guy from '../../images/takla.png';
import Side1 from '../../images/side1.png';
import Side2 from '../../images/side2.png';
import Star from '../../images/Star.png';
import Arrow from '../../images/Arrow.png';
import cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import Home from '../../images/Home.png';

const DetailsNotLogged = () => {
  const { productId } = useParams(); 

  const [product, setProduct] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


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


  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://musicartapi.onrender.com/product/${productId}`);
        const data = response.data;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(); 
  }, [productId]); 

  if (!product) {
    return <div>Loading...</div>; 
  }

  const handleBuyNow = () => {
    toast.error('Please login before buying.');
    navigate('/login');
  };

  const handleAddToCart = () => {
    toast.error('Please login before adding to cart.');
    navigate('/login');
  };

  const handleLoginbtn = () => {
    navigate('/login');
  };

  const handleback2Product = () => {
    navigate('/');
  };

  const handleDeskLoginClick = () => {
    navigate('/login');
  }

  const handleDeskSignupClick = () => {
    navigate('/Signup');
  }


  return (
    <div  className={styles.MainConatiner}>
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
          <button className={styles.lobtn} onClick={handleDeskLoginClick}>Login</button>
          <img className={styles.lineImg} src={Line} alt="" />
          <button className={styles.signObtn} onClick={handleDeskSignupClick}>Signup</button>
        </div>

     </div>

     <div className={styles.mainheader}>
        <div className={styles.mainheaderLeft}>
          <img className={styles.logoImg} src={Logo} alt="" />
          <h2 className={styles.headerText}>Muiscart</h2>
          <span className={styles.headerSpan}>HOME /</span>
          <span className={styles.ProductName}>{product.name}</span>
        </div>

        <div className={styles.mainheaderRight}>
          <button className={styles.viewCartBtn}>
            <img className={styles.cartImg} src={CartDesk} alt="" />
            <span className={styles.viewCartText}>View Cart</span>
            <span className={styles.count}>  0</span>
          </button>
        </div>
     </div>

     <div className={styles.back2product}>
      <button className={styles.back2productBtn} onClick={handleback2Product}>Back to products</button>
     </div>

     <div className={styles.productHeader}>
       <p className={styles.productNameAbout}>{product.name}, {product.about} ({product.color})</p>
     </div>

     <div className={styles.detailsDiv}>

      <div className={styles.productImg}>

        <img className={styles.ProImg} src={product.imageUrl} alt={product.name} />
        <div className={styles.defaultImg}>
          <img className={styles.GuyImg} src={Guy} alt=""/>
          <img className={styles.Side1Img} src={Side1} alt=""/>
          <img className={styles.Side2Img} src={Side2} alt=""/>
        </div>

      </div>

      <div className={styles.productDetails}>
          <span className={styles.itemName}>{product.name}</span>

          <div className={styles.starReview}>
            <img className={styles.starImg} src={Star} alt="" />
            <img className={styles.starImg} src={Star} alt="" />
            <img className={styles.starImg} src={Star} alt="" />
            <img className={styles.starImg} src={Star} alt="" />
            <img className={styles.starImg} src={Star} alt="" />
            <span>(50 Customer reviews)</span>
          </div>

          <div className={styles.otherDetails}>
            <span>Price - ₹ {product.price}</span>
            <span>{product.color} | {product.type}</span>
          </div>

          <div className={styles.Info}>
            <span>About this item</span>
            <ul className={styles.Infolist}>
              <li>{product.brand}’s lightest {product.type} Noise-cancelling headband ever</li>
              <li>Up to 50-hour battery life with quick charging (3 min charge for up to 1 hour of playback)</li>
              <li>Multi-Point Connection helps to pair with two Bluetooth devices at the same time</li>
              <li>Take noise cancelling to the next level with {product.brand}’s Integrated Processor V1,so you can fully immerse yourself in the music</li>
              <li>Super comfortable and lightweight design</li>
              <li>High sound quality and well-balanced sound tuning</li>
            </ul>

            <div className={styles.Stock}>
            <span className={styles.avail}>Available</span>
            <span>- In stock</span>
            </div>

            <div className={styles.itemBrandDiv}>
            <span className={styles.itemBrand}>Brand</span>
            <span>- {product.brand}</span>
            </div>

            <div className={styles.Buttons}>
              <button className={styles.Add} onClick={handleAddToCart}>Add to cart</button>
              <button className={styles.Buy} onClick={handleBuyNow}>Buy Now</button>
            </div>
            
          </div>

      </div>

     </div>
     <div className={styles.footer}>
      <span className={styles.footerReserved}>Musicart | All rights reserved</span>
     </div>

     {windowWidth > 768 && (
        <div className={styles.back2product}>
          <button className={styles.back2productBtn} onClick={handleback2Product}>Back to products</button>
        </div>
      )}

      {windowWidth > 768 && (
        <div className={styles.productHeader}>
          <p className={styles.productNameAbout}>{product.name}, {product.about} ({product.color})</p>
        </div>
      )}

      {windowWidth > 768 && (
        <div className={styles.detailsDiv}>

          <div className={styles.productImg}>

            <img className={styles.ProImg} src={product.imageUrl} alt={product.name} />
            <div className={styles.defaultImg}>
              <img className={styles.GuyImg} src={Guy} alt="" />
              <img className={styles.Side1Img} src={Side1} alt="" />
              <img className={styles.Side2Img} src={Side2} alt="" />
            </div>

          </div>

          <div className={styles.productDetails}>
            <span className={styles.itemName}>{product.name}</span>

            <div className={styles.starReview}>
              <img className={styles.starImg} src={Star} alt="" />
              <img className={styles.starImg} src={Star} alt="" />
              <img className={styles.starImg} src={Star} alt="" />
              <img className={styles.starImg} src={Star} alt="" />
              <img className={styles.starImg} src={Star} alt="" />
              <span>(50 Customer reviews)</span>
            </div>

            <div className={styles.otherDetails}>
              <span>Price - ₹ {product.price}</span>
              <span>{product.color} | {product.type}</span>
            </div>

            <div className={styles.Info}>
              <span>About this item</span>
              <ul className={styles.Infolist}>
                <li>{product.brand}’s lightest {product.type} Noise-cancelling headband ever</li>
                <li>Up to 50-hour battery life with quick charging (3 min charge for up to 1 hour of playback)</li>
                <li>Multi-Point Connection helps to pair with two Bluetooth devices at the same time</li>
                <li>Take noise cancelling to the next level with {product.brand}’s Integrated Processor V1,so you can fully immerse yourself in the music</li>
                <li>Super comfortable and lightweight design</li>
                <li>High sound quality and well-balanced sound tuning</li>
              </ul>

              <div className={styles.Stock}>
                <span className={styles.avail}>Available</span>
                <span>- In stock</span>
              </div>

              <div className={styles.itemBrandDiv}>
                <span className={styles.itemBrand}>Brand</span>
                <span>- {product.brand}</span>
              </div>

              <div className={styles.Buttons}>
                <button className={styles.Add} onClick={handleAddToCart}>Add to cart</button>
                <button className={styles.Buy} onClick={handleBuyNow}>Buy Now</button>
              </div>

            </div>

          </div>

        </div>
      )}

      {windowWidth > 768 && (
        <div className={styles.footer}>
          <span className={styles.footerReserved}>Musicart | All rights reserved</span>
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

          <div>
            <button className={styles.mobileBuyButton1} onClick={handleBuyNow}>Buy Now</button>
          </div>

          <div className={styles.mobileproductImg}>
            <div className={styles.mobileThumbnailScroll}>
              <img className={styles.mobileThumbnailImg} src={product.imageUrl} alt={product.name} />
              <img className={styles.mobileThumbnailImg} src={Guy} alt="" />
              <img className={styles.mobileThumbnailImg} src={Side1} alt="" />
              <img className={styles.mobileThumbnailImg} src={Side2} alt="" />
            </div>
          </div>

          <div className={styles.mobileproductDetails}>
            <span className={styles.mobileitemName}>{product.name}</span>

            <div className={styles.mobilestarReview}>
              <img className={styles.mobilestarImg} src={Star} alt="" />
              <img className={styles.mobilestarImg} src={Star} alt="" />
              <img className={styles.mobilestarImg} src={Star} alt="" />
              <img className={styles.mobilestarImg} src={Star} alt="" />
              <img className={styles.mobilestarImg} src={Star} alt="" />
              <span className={styles.mobileReviewText}>(50 Customer reviews)</span>
            </div>

            <div>
              <p className={styles.mobileproductNameAbout}>{product.name}, {product.about}</p>
            </div>

            <div className={styles.mobileotherDetails}>
              <span>Price - ₹ {product.price}</span>
              <span>{product.color} | {product.type}</span>
            </div>

            <div className={styles.mobileInfo}>
              <span className={styles.mobileInfoAboutText}>About this item</span>
              <ul className={styles.mobileInfolist}>
                <li>{product.brand}’s lightest {product.type} Noise-cancelling headband ever</li>
                <li>Up to 50-hour battery life with quick charging (3 min charge for up to 1 hour of playback)</li>
                <li>Multi-Point Connection helps to pair with two Bluetooth devices at the same time</li>
                <li>Take noise cancelling to the next level with {product.brand}’s Integrated Processor V1,so you can fully immerse yourself in the music</li>
                <li>Super comfortable and lightweight design</li>
                <li>High sound quality and well-balanced sound tuning</li>
              </ul>

              <div className={styles.mobileStock}>
                <span className={styles.mobileavail}>Available</span>
                <span>- In stock</span>
              </div>

              <div className={styles.mobileitemBrandDiv}>
                <span className={styles.mobileitemBrand}>Brand</span>
                <span>- {product.brand}</span>
              </div>

              <div className={styles.mobileButtons}>
                <button className={styles.mobileAdd} onClick={handleAddToCart}>Add to cart</button>
                <button className={styles.mobileBuy} onClick={handleBuyNow}>Buy Now</button>
              </div>

            </div>

          </div>

          <div className={styles.MobileNavBar}>
            <div className={styles.HomeDiv}>
              <button className={styles.button1} onClick={handleback2Product}>
                <img src={Home} alt="Home" />
                <span className={styles.buttonText}>Home</span>
              </button>
            </div>

            <div className={styles.CartDiv}>
              <button className={styles.button2} onClick={handleAddToCart}>
                <img src={cart} alt="Cart" />
                <span className={styles.buttonTextCart}>Cart</span>
              </button>
            </div>

            <div className={styles.LoginDiv}>
              <button className={styles.button3} onClick={handleLoginbtn}>
                <img src={Login} alt="Login" />
                <span className={styles.buttonText}>Logout</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default DetailsNotLogged;

