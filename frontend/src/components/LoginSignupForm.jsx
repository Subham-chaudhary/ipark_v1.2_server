import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './Styles/LoginPage.css'

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState("login");

  const handleSlideChange = (event) => {
    setCurrentSlide(event.target.id);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (username.trim() === "" && currentSlide === "signup") {
      if (!toast.isActive('usernameError')) {
        toast.error("Username cannot be empty!", { toastId: 'usernameError' });
      }
      return;
    }
    if (email.trim() === '') {
      toast.error("Email address cannot be empty!", { toastId: 'emailError' });
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email address!", { toastId: 'emailError' });
      return;
    }
    navigate(`/HomePage`);
  }

  return (
    <div className='loginpage-container'>
      <div className='loginpage-wrapper'>
        <div className="title-text">
          <div className='title login'>i-Park</div>
          <div className='title signup'>Signup Form</div>
        </div>
        <div className="form-container">
        <div class="slide-controls">
          <input
            class="lg_sn"
            type="radio"
            name="slide"
            id="login"
            checked={currentSlide === "login"}
            onChange={handleSlideChange}
          />
          <input
            class="lg_sn"
            type="radio"
            name="slide"
            id="signup"
            checked={currentSlide === "signup"}
            onChange={handleSlideChange}
          />
          <label for="login" class="slide login">
            Login
          </label>
          <label for="signup" class="slide signup">
            SignUp
          </label>
          <div class="slider-tab"></div>
        </div>

          <div className="form-inner">
            {currentSlide === "login" && (
              <form action="#" className='login'>
                <div className='field'>
                  <input type="text" placeholder="Email Address" required value={email} onChange={handleEmailChange} />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" required value={password} onChange={handlePasswordChange} />
                </div>
                <div className="pass-link">
                  <a href="#">Forgot password?</a>
                </div>
                <div className='field btn'>
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" onClick={handleSubmit} />
                </div>
                <div className="signup-link">
                  Do not have an account?{" "}
                  <a href="#" onClick={() => setCurrentSlide("signup")}>
                    Signup now
                  </a>
                </div>
              </form>
            )}
            { currentSlide === "signup" && (
              <form action="#" className="signup">
                <div className='field'>
                  <input type="text" placeholder="UserName" required value={username} onChange={handleUsernameChange} />
                </div>
                <div className='field'>
                  <input type="text" placeholder="Email Address" required value={email} onChange={handleEmailChange} />
                </div>
                <div className='field'>
                  <input type="password" placeholder="Password" required value={password} onChange={handlePasswordChange} />
                </div>
                <div className='field btn'>
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" onClick={handleSubmit} />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginSignupForm;
