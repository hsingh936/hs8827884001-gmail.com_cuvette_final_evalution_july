import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import styles from './homeLogged.module.css';
import Phone from '../../images/phone.png';
import Line from '../../images/Line.png';
import Logo from '../../images/logo.png';
import Girl from '../../images/girl.png';
import Home from '../../images/Home.png';
import CartDesk from '../../images/CartDesk.png';
import Cart from '../../images/Cart.png';
import Login from '../../images/Login.png';
import SearchIcon from '../../images/search.png';
import GridViewIcon from '../../images/grid.png';
import ListViewIcon from '../../images/list.png';
import Feedback from '../../images/feedback.png';


export default function HomenotLogged() {
  const [userName, setUserName] = useState('');
  const [initialsDropdownVisible, setInitialsDropdownVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [types, setTypes] = useState([]);
  const [sortingOption, setSortingOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [detailedFeedback, setDetailedFeedback] = useState('');
  const [feedbackTypeError, setFeedbackTypeError] = useState('');
  const [detailedFeedbackError, setDetailedFeedbackError] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  
  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      
      const authToken = localStorage.getItem('authToken');

      const response = await axios.get(`https://musicartapi.onrender.com/auth/username`, {
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
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('https://musicartapi.onrender.com/cart/cartCount', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCartCount(response.data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const toggleInitialsDropdown = () => {
    setInitialsDropdownVisible(!initialsDropdownVisible);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://musicartapi.onrender.com/product/all');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('https://musicartapi.onrender.com/product/headphoneTypes');
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleBrandChange = async (e) => {
    const brandName = e.target.value;
    setSelectedBrand(brandName);
    if (brandName === '') {
      fetchProducts();
    } else {
      fetchFilteredProducts({ brand: brandName });
    }
  };

  const handleColorChange = async (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    if (color === '') {
      fetchProducts();
    } else {
      fetchFilteredProducts({ color });
    }
  };

  const handlePriceRangeChange = async (e) => {
    const priceRange = e.target.value;
    setSelectedPriceRange(priceRange);
    if (priceRange === '') {
      fetchProducts();
    } else {
      const [minPrice, maxPrice] = priceRange.split('-');
      fetchFilteredProducts({ minPrice, maxPrice });
    }
  };

  const handleSortingChange = async (e) => {
    const sortingOption = e.target.value;
    setSortingOption(sortingOption);
    sortProducts(sortingOption);
  };

  const fetchFilteredProducts = async (filters) => {
    try {
      const { minPrice, maxPrice, brand, color } = filters;
      let url = `https://musicartapi.onrender.com/product/all`;
      if (minPrice !== undefined && maxPrice !== undefined) {
        url = `https://musicartapi.onrender.com/product/price/${minPrice}/${maxPrice}`;
      } else if (brand !== undefined) {
        url = `https://musicartapi.onrender.com/product/brand/${brand}`;
      } else if (color !== undefined) {
        url = `https://musicartapi.onrender.com/product/color/${color}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  const filteredProducts = selectedType
    ? products.filter((product) => product.type === selectedType)
    : products;

    const sortProducts = (sortingOption) => {
      switch (sortingOption) {
        case 'priceLowest':
          setProducts([...products.sort((a, b) => a.price - b.price)]);
          break;
        case 'priceHighest':
          setProducts([...products.sort((a, b) => b.price - a.price)]);
          break;
        case 'nameAZ':
          setProducts([...products.sort((a, b) => a.name.localeCompare(b.name))]);
          break;
        case 'nameZA':
          setProducts([...products.sort((a, b) => b.name.localeCompare(a.name))]);
          break;
        default:
          break;
      }
    };

    const handleSearch = (e) => {
      const searchValue = e.target.value.toLowerCase(); 
      setSearchQuery(searchValue);
      if (searchValue === '') {
        fetchProducts(); 
      } else {
        const filteredResults = products.filter((product) =>
          product.name.toLowerCase().includes(searchValue)
        );
        setProducts(filteredResults);
      }
    };

    const validateFeedbackForm = () => {
      let isValid = true;
  
      if (!feedbackType) {
        setFeedbackTypeError('* Required field');
        isValid = false;
      } else {
        setFeedbackTypeError('');
      }
  
      if (!detailedFeedback.trim()) {
        setDetailedFeedbackError('* Required field');
        isValid = false;
      } else {
        setDetailedFeedbackError('');
      }
  
      return isValid;
    };
  
    const submitFeedback = async () => {
      if (validateFeedbackForm()) {
        try {
          const authToken = localStorage.getItem('authToken');
          const userId = localStorage.getItem('userId');
  
          const response = await axios.post(
            'https://musicartapi.onrender.com/feed/feedback',
            {
              type: feedbackType,
              feedbackText: detailedFeedback,
              userId: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
  
          console.log('Feedback submitted:', response.data);
          toast.success('Feedback submitted successfully');
        
          setShowFeedbackForm(false);
          setFeedbackType('');
          setDetailedFeedback('');
        } catch (error) {
          console.error('Error submitting feedback:', error);
          
        }
      }
    };

    const handleDetailsClick = (productId) => {
      console.log(`Details clicked for product ID: ${productId}`);
      navigate(`/details/${productId}`);
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

      </div>
    )}
      
      {windowWidth > 768 && (
      <div className={styles.mainheader}>
        <div className={styles.mainheaderLeft}>
          <img className={styles.logoImg} src={Logo} alt="" />
          <h2 className={styles.headerText}>Muiscart</h2>
          <span className={styles.headerSpan}>HOME</span>
          <button className={styles.Invoicebtn} onClick={handleInvoiceButton}>Invoice</button>
        </div>

        <div className={styles.mainheaderRight}>
          <button className={styles.viewCartBtn} onClick={handleViewCartButton}>
            <img className={styles.cartImg} src={CartDesk} alt="" />
            <span className={styles.viewCartText}>View Cart</span>
            <span className={styles.count}>{cartCount}</span>
          </button>

          <button className={styles.initialsBtn} onClick={toggleInitialsDropdown}>
            {userName && userName.length > 0 ? userName.substring(0, 2).toUpperCase() : ''}
          </button>
          {initialsDropdownVisible && (
            <div className={styles.dropdownContent}>
              <span>{userName}</span>
              <button onClick={handleLogOutMoileClick}>Logout</button>
            </div>
          )}

        </div>
      </div>
      )}

      <div className={styles.ImgDiv}>
        <p className={styles.discImgDiv} >Grab upto 50% off on <br /> Selected headphones</p>
        <img className={styles.girlImg} src={Girl} alt="" />
      </div>

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

      <div className={styles.functionDiv}>
      {windowWidth > 768 && (
        <div className={styles.view}>
          <button className={styles.gridViewBtn} onClick={() => toggleViewMode('grid')}>
            <img src={GridViewIcon} alt="Grid View" className={styles.viewIcon} />
          </button>

          <button className={styles.listViewBtn} onClick={() => toggleViewMode('list')}>
            <img src={ListViewIcon} alt="List View" className={styles.viewIcon} />
          </button>
        </div>
      )}

        <div className={styles.dropdown}>
          
        <select className={styles.dropDownType} value={selectedType} onChange={handleTypeChange}>
          <option value="">Headphone Type</option>
          {types.map((type) => (
            <option key={type.type} value={type.type}>{type.type}</option>
          ))}
        </select>

          <select className={styles.dropDownBrand} value={selectedBrand} onChange={handleBrandChange}>

            <option value="">Company</option>
            <option value="Sony">Sony</option>
            <option value="Bose">Bose</option>
            <option value="Sennheiser">Sennheiser</option>
            <option value="Audio-Technica">Audio-Technica</option>
            <option value="JBL">JBL</option>

          </select>

          <select className={styles.dropDowncolor} value={selectedColor} onChange={handleColorChange}>
            <option value="">Colour</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="Silver">Silver</option>
            <option value="White">White</option>
          </select>

          <select className={styles.dropDownPrice} value={selectedPriceRange} onChange={handlePriceRangeChange}>
            <option value="">Price</option>
            <option value="0-1000">₹0 - ₹1,000</option>
            <option value="1000-10000">₹1,000 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
          </select>

          <select className={styles.dropDownsort} value={sortingOption} onChange={handleSortingChange}>
            
            <option value="">Sort by : Featured</option>
            <option value="priceLowest">Price : Lowest</option>
            <option value="priceHighest">Price : Highest</option>
            <option value="nameAZ">Name : (A-Z)</option>
            <option value="nameZA">Name : (Z-A)</option>
          
          </select>

        </div>

      </div>

      <div className={`${styles.wholeProductsDiv} ${viewMode === 'list' ? styles.list : ''}`}>
       
        {filteredProducts.map((product) => (
          <div key={product._id} className={`${styles.productDiv} ${viewMode === 'list' ? styles.list : ''}`}>
            <div className={`${styles.productImg} ${viewMode === 'list' ? styles.list : ''}`}>
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={`${styles.productInfo} ${viewMode === 'list' ? styles.list : ''}`}>
            <button className={styles.productBtn} onClick={() => handleDetailsClick(product._id)}>
              <span className={`${styles.productName} ${viewMode === 'list' ? styles.list : ''}`}>{product.name}</span>
              <span className={`${styles.productPrice} ${viewMode === 'list' ? styles.list : ''}`}>Price - ₹{product.price}</span>
              <p className={`${styles.productColourandType} ${viewMode === 'list' ? styles.list : ''}`}>
                {product.color} | {product.type}
              </p>
            </button>
            
              {viewMode === 'list' && (
                <div className={styles.productDetailsContainer}>
                  <p className={styles.productDetails}>{product.about}</p>
                  <button className={styles.detailsButton} onClick={() => handleDetailsClick(product._id)}>
                    Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {windowWidth > 768 && (
      <div className={styles.feedbackDiv}>
        <button className={styles.feedbackBtn} onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
          <img className={styles.feedbackImg} src={Feedback} alt="" />
        </button>
        {showFeedbackForm && (
          <div className={styles.feedbackForm}>
            <span className={styles.feedbackType}>Type of feedback</span>
            <select className={styles.feedbackTypeDropDown} value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)}>
              <option value="">Select Feedback Type</option>
              <option value="bugs">Bugs</option>
              <option value="feedback">Feedback</option>
              <option value="query">Query</option>
            </select>
            {feedbackTypeError && <span className={styles.errorMessage}>{feedbackTypeError}</span>}

            <span className={styles.feedbackDetailText}>Feedback</span>
            <textarea className={styles.feedbackDetailTextArea}
              value={detailedFeedback}
              onChange={(e) => setDetailedFeedback(e.target.value)}
              placeholder="Type your feedback"
              rows={4}
            ></textarea>
            {detailedFeedbackError && <span className={styles.errorMessage}>{detailedFeedbackError}</span>}

            <button className={styles.feedbackSubmit} onClick={submitFeedback}>Submit</button>
          </div>
        )}
      </div>
      )}
      

      {windowWidth > 768 && (
        <div className={styles.footer}>
          <span className={styles.footerReserved}>Musicart | All rights reserved</span>
        </div>
      )}
      
      {windowWidth <= 768 && (
      <div className={styles.MobileNavBar}>
        <div className={styles.HomeDiv}>
          <button className={styles.button1} onClick={handleHomeMobileClick}>
            <img src={Home} alt="Home" />
            <span className={styles.buttonText}>Home</span>
          </button>
        </div>

        <div className={styles.CartDiv}>
          <button className={styles.button2} onClick={handleViewCartButton}>
            <img src={Cart} alt="Cart" />
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
      )}

    </div>
  )
}

