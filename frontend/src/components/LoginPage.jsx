// import React from 'react';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
// import OtpInput from 'react-otp-input';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const CustomBackgroundShapes = () => {
//   // return (
//   //   <>
//   //     {/* Background Circles */}
//   //     // <div
//   //     //   style={{
//   //     //     width: 323,
//   //     //     height: 455,
//   //     //     position: 'absolute',
//   //     //     background: '#07054E',
//   //     //     boxShadow: '300px 300px 300px',
//   //     //     borderRadius: '9999px',
//   //     //     filter: 'blur(300px)',
//   //     //     left: 131,
//   //     //     top: 425,
//   //     //   }}
//   //     // />
//   //     // <div
//   //     //   style={{
//   //     //     width: 383.58,
//   //     //     height: 455,
//   //     //     position: 'absolute',
//   //     //     background: '#211EBE',
//   //     //     boxShadow: '300px 300px 300px',
//   //     //     borderRadius: '9999px',
//   //     //     filter: 'blur(300px)',
//   //     //     left: 202,
//   //     //     top: 535.45,
//   //     //     transform: 'rotate(-55.68deg)',
//   //     //     transformOrigin: '0 0',
//   //     //   }}
//   //     // />
//   //     // <div
//   //     //   style={{
//   //     //     width: 342,
//   //     //     height: 455,
//   //     //     position: 'absolute',
//   //     //     background: '#84C5D2',
//   //     //     boxShadow: '300px 300px 300px',
//   //     //     borderRadius: '9999px',
//   //     //     filter: 'blur(300px)',
//   //     //     left: 324,
//   //     //     top: 441.51,
//   //     //     transform: 'rotate(-79.72deg)',
//   //     //     transformOrigin: '0 0',
//   //     //   }}
//   //     // />
//   //   // </>
//   // );
// };

// const Practice01 = () => {
//   // const [otp, setOtp] = useState('');

//   // return (
//   //   <Container fluid style={{ height: '150vh', background: '#EBEDCD', position: 'relative' }}>
//   //     {/* Custom Background Shapes */}
//   //     // <CustomBackgroundShapes />

//   //     // <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
//   //       // <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
//   //         {/* Left Side - Responsive Text */}
//   //         // <div className="responsive-text" >
//   //           // <div className="main-text">You drive,</div>
//   //           // <div className="main-text">&#160;&#160;&#160;&#160;&#160;&#160;&#160;We park</div>
//   //         // </div>
//   //       // </Col>

//   //       // <Col md={6}>
//   //         {/* Right Side - Login Form */}
//   //         // <div className="card bg-white" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: '20px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)', margin:"100px" }}>
//   //           // <h2 className="text-center" style={{ fontSize: '31px', fontFamily: 'Raleway', fontWeight: '800', color: 'black', letterSpacing: '1.55px' }}>
//   //             // Login
//   //           // </h2>
//   //           // <p className="text-center" style={{ color: '#676767', fontFamily: 'Raleway', fontSize: '18px' }}>
//   //             // Don’t have an account?{' '}
//   //             // <a href="#" style={{ color: '#B177C9', fontWeight: '700' }}>
//   //               // Sign up
//   //             // </a>
//   //           // </p>

//   //           // {/* Form */}
//   //           // <Form>
//   //             // <Form.Group className="mb-4" controlId="formPhoneNumber">
//   //               // <Form.Label style={{ color: '#858585', fontFamily: 'Raleway', fontSize: '16px' }}>Phone number</Form.Label>
//   //               // <div style={{ display: 'flex', alignItems: 'center' }}>
//   //                 // <span style={{ fontFamily: 'Radio Canada', fontSize: '22px', fontWeight: '600', color: '#252525', marginRight: '10px' }}>
//   //                   // +91
//   //                 // </span>
//   //                 // <Form.Control type="text" placeholder="Enter phone number" style={{ borderRadius: '14px', border: '1.5px solid #D7D7D7' }} />
//   //               // </div>
//   //             // </Form.Group>

//   //             // <Form.Group controlId="formOtp">
//   //               // <Form.Label style={{ color: '#858585', fontFamily: 'Raleway', fontSize: '16px' }}>OTP</Form.Label>
//   //               // <div>
//   //                 // <OtpInput
//   //                   // value={otp}
//   //                   // onChange={setOtp}
//   //                   // numInputs={6}
//   //                   // renderInput={(props) => <input {...props} style={{ width: '45px', height: '58px', textAlign: 'center', borderRadius: '14px', border: '1.5px solid #D7D7D7' }} />}
//   //                 // />
//   //               // </div>
//   //             // </Form.Group>

//   //             // <p className="text-center" style={{ color: '#676767', fontSize: '12px' }}>
//   //               // By logging in you agree to our{' '}
//   //               // <a href="#" style={{ color: '#B177C9', fontWeight: '700' }}>
//   //                 // Terms of Use
//   //               // </a>{' '}
//   //               // and{' '}
//   //               // <a href="#" style={{ color: '#B177C9', fontWeight: '700' }}>
//   //                 // Privacy Policy
//   //               // </a>
//   //             // </p>

//   //             // <div className="d-grid">
//   //               // <Button variant="success" size="lg" style={{ borderRadius: '14px', fontFamily: 'Raleway', fontWeight: '700' }}>
//   //                 // Login
//   //               // </Button>
//   //             // </div>
//   //           // </Form>
//   //         // </div>
//   //       // </Col>
//   //     // </Row>

//   //     // <style jsx>{`
//   //       // .responsive-text {
//   //       //   text-align: center;
//   //       //   position: relative;
//   //       // }

//   //       // .main-text {
//   //       //   font-family: 'Raleway', sans-serif;
//   //       //   font-weight: 600;
//   //       //   word-wrap: break-word;
//   //       //   color: black;
//   //       //   font-size: 8vw; /* Responsive font size */
//   //       // }

//   //       // @media (max-width: 768px) {
//   //       //   .main-text {
//   //       //     font-size: 10vw; /* Adjust font size on smaller screens */
//   //       //   }
//   //       // }

//   //       // @media (max-width: 576px) {
//   //       //   .main-text {
//   //       //     font-size: 12vw; /* Even larger font size for smaller devices */
//   //       //   }
//   //       // }
//   //     // `}</style>
//   //   // </Container>
//   // );

// export default Practice01;


// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/Practice01.css';

const CustomBackgroundShapes = () => {
  return (
    <>
      {/* Background Circles */}
      <div
        style={{
          width: 323,
          height: 455,
          position: 'absolute',
          background: '#07054E',
          boxShadow: '300px 300px 300px',
          borderRadius: '9999px',
          filter: 'blur(300px)',
          left: 131,
          top: 425,
        }}
      />
      <div
        style={{
          width: 383.58,
          height: 455,
          position: 'absolute',
          background: '#211EBE',
          boxShadow: '300px 300px 300px',
          borderRadius: '9999px',
          filter: 'blur(300px)',
          left: 202,
          top: 535.45,
          transform: 'rotate(-55.68deg)',
          transformOrigin: '0 0',
        }}
      />
      <div
        style={{
          width: 342,
          height: 455,
          position: 'absolute',
          background: '#84C5D2',
          boxShadow: '300px 300px 300px',
          borderRadius: '9999px',
          filter: 'blur(300px)',
          left: 324,
          top: 441.51,
          transform: 'rotate(-79.72deg)',
          transformOrigin: '0 0',
        }}
      />
    </>
  );
};

const Practice01 = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleGetOtp = () => {
    console.log('Get OTP clicked');
  };

  return (
    <Container fluid style={{ height: '150vh', background: '#EBEDCD', position: 'relative' }}>
      <CustomBackgroundShapes />

      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <div className="responsive-text">
            <div className="main-text">You drive,</div>
            <div className="main-text">&#160;&#160;&#160;&#160;&#160;&#160;&#160;We park</div>
          </div>
        </Col>

        <Col md={6}>
          <div className="card bg-white" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: '20px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)', margin: '100px' }}>
            <h2 className="text-center" style={{ fontSize: '31px', fontFamily: 'Raleway', fontWeight: '800', color: 'black', letterSpacing: '1.55px' }}>
              Login
            </h2>
            <p className="text-center" style={{ color: '#676767', fontFamily: 'Raleway', fontSize: '18px' }}>
              Don’t have an account?{' '}
              <a href="#" onClick={handleSignUpClick} style={{ color: '#B177C9', fontWeight: '700' }}>
                Sign up
              </a>
            </p>

            {/* Form */}
            <Form>
              <Form.Group className="mb-4" controlId="formPhoneNumber">
                <Form.Label style={{ color: '#858585', fontFamily: 'Raleway', fontSize: '16px' }}>Phone number</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Radio Canada', fontSize: '22px', fontWeight: '600', color: '#252525', marginRight: '10px' }}>
                    +91
                  </span>
                  <Form.Control type="text" placeholder="Enter phone number" style={{ borderRadius: '14px', border: '1.5px solid #D7D7D7' }} />
                </div>
              </Form.Group>

              {/* Get OTP Button */}
              <div className="d-flex justify-content-center mb-4">
                <Button variant="primary" size="sm" style={{ width: '120px', borderRadius: '8px', fontFamily: 'Raleway', fontWeight: '700', padding: '6px 10px' }} onClick={handleGetOtp}>
                  Get OTP
                </Button>
              </div>

              <Form.Group controlId="formOtp" style={{justifyContent:'space-between'}}>
                <Form.Label style={{ color: '#858585', fontFamily: 'Raleway', fontSize: '16px' }}>OTP</Form.Label>
                <div >
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} style={{ width: '40px', height: '50px', margin: '0 5px', textAlign: 'center', borderRadius: '14px', border: '1.5px solid #D7D7D7' }} />}
                  />
                </div>
              </Form.Group>

              <p className="text-center" style={{ color: '#676767', fontSize: '12px' }}>
                By logging in you agree to our{' '}
                <a href="#" style={{ color: '#B177C9', fontWeight: '700' }}>
                  Terms of Use
                </a>{' '}
                and{' '}
                <a href="#" style={{ color: '#B177C9', fontWeight: '700' }}>
                  Privacy Policy
                </a>
              </p>

              {/* Login Button */}
              <div className="d-flex justify-content-center">
                <Button variant="success" size="sm" style={{ width: '120px', borderRadius: '8px', fontFamily: 'Raleway', fontWeight: '700', padding: '6px 10px' }}>
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Practice01;
