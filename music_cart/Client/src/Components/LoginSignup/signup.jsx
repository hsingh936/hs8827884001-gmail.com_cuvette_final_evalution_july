import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './signup.module.css';
import Logo from '../../images/logo.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (mobile.trim() === '') {
      newErrors.mobile = 'Mobile number is required';
    }
    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/auth/signup', {
          name,
          mobile,
          email,
          password,
        });
        console.log(response.data); 
        navigate('/login');
      } catch (error) {
        console.error('Error submitting form:', error);
       
      }
    }
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const [showWelcome, setShowWelcome] = useState(false);
  const [showAccountText, setShowAccountText] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      
      const showWelcomeText = windowWidth <= 768; 
      setShowWelcome(showWelcomeText);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const showAccountText = windowWidth <= 768; 
      setShowAccountText(showAccountText);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div className={styles.WholeContainer}>
      <div className={styles.MainContainer}>
        <div className={styles.headerSignup}>
          <img className={styles.musiclogo} src={Logo} alt="MusicLogo" />
          <h2 className={styles.musicheader}>Musicart</h2>
        </div>

        {showWelcome && <h3 className={styles.welcomeText}>WELCOME</h3>}

        <div className={styles.subMainContainer}>
          <div className={styles.subContainer}>
          <h1 className={styles.subContainerHeader}>
            Create Account
            {showAccountText && <span className={styles.accountText}>&nbsp;. Don't have an account</span>}
          </h1>


            <div className={styles.signupForm}>
              <span>Your Name</span>
              <input
                type="text"
                name="name"
                className={`${styles.inputField} ${errors.name && styles.errorInput}`}
                value={name}
                onChange={handleInputChange}
                placeholder={errors.name ? errors.name : 'Enter your name'}
              />

              <span>Mobile Number</span>
              <input
                type="text"
                name="mobile"
                className={`${styles.inputField} ${errors.mobile && styles.errorInput}`}
                value={mobile}
                onChange={handleInputChange}
                placeholder={errors.mobile ? errors.mobile : 'Enter your Mobile Number'}
              />

              <span>Email</span>
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

            <div className={styles.term_cond}>
              <span>By enrolling your mobile phone number, you consent to </span>
              <span>receive automated security notifications via text </span>
              <span>message from Musicart. Message and data rates may</span>
              <span>apply.</span>
            </div>

            <div className={styles.contbtn}>
              <button onClick={handleSubmit}>Continue</button>
            </div>

            <div className={styles.para}>
              <p className={styles.line}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
              <span className={styles.siginPara}>Already have an account?</span>
              <button className={styles.siginBtn} onClick={handleSignInClick}>Sign in</button>
            </div>

            <span className={styles.rightReservedText}>Musicart | All rights reserved</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
