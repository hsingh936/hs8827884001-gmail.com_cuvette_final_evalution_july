import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import styles from './login.module.css'; 
import Logo from '../../images/logo.png';

export default function Login({ setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAccountText, setShowAccountText] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          email,
          password,
        });
        console.log(response.data); 
        const authToken = response.data.token;
        const userId = response.data.userId;

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userId', userId);

        setUserId(userId);
       
        navigate('/home');
      } catch (error) {
        console.error('Error logging in:', error);
        
      }
    }
  };

  const handleSignUpClick = () => {
    navigate('/Signup');
  };

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
    setShowWelcome(windowWidth <= 768);
    setShowAccountText(windowWidth <= 768);
  }, [windowWidth]);

  return (
    <div className={styles.WholeContainer}>
      <div className={styles.MainContainer}>
        <div className={styles.headerLogin}>
          <img className={styles.musiclogo} src={Logo} alt="MusicLogo" />
          <h2 className={styles.musicheader}>Musicart</h2>
        </div>

        {showWelcome && <h3 className={styles.welcomeText}>WELCOME</h3>}

        <div className={styles.subMainContainer}>
          <div className={styles.subContainer}>
            <h1 className={styles.subContainerHeader}>
              Sign In
              {showAccountText && <span className={styles.accountText}>&nbsp;. Already a customer?</span>}
            </h1>
           
            <div className={styles.loginForm}>
              <span>Enter Your Email or Mobile Number</span>
              <input
                type="text"
                name="email"
                className={`${styles.inputField} ${errors.email && styles.errorInput}`}
                value={email}
                onChange={handleInputChange}
                placeholder={errors.email ? errors.email : 'Enter your email'}
              />
              <span>Password</span>
              <input
                type="password"
                name="password"
                className={`${styles.inputField} ${errors.password && styles.errorInput}`}
                value={password}
                onChange={handleInputChange}
                placeholder={errors.password ? errors.password : 'Enter your password'}
              />
            </div>

            <div className={styles.contbtn}>
              <button onClick={handleSubmit}>Continue</button>
            </div>

            <div className={styles.para}>
              <p>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
            </div>
          </div>

         
            <div className={styles.siginPara}>
              <span className={styles.separatorLine}></span>
              <span className={styles.siginParatext}>New to Musicart?</span>
              <span className={styles.separatorLine}></span> 
            </div>
    

          <div className={styles.footer}>
            <button className={styles.siginBtn} onClick={handleSignUpClick}>Create your Musicart account</button>
            <span className={styles.rightReserved}>Musicart | All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
