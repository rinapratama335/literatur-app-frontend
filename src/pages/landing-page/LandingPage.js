import React, { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import "./LandingPage.css";
import { Landing, Logo } from "../../assets/images";
import SignIn from "../../components/modals/login/SignIn";
import SignUp from "../../components/modals/register/SignUp";

const LandingPage = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const signInToggle = () => setSignIn(!signIn);
  const signUpToggle = () => setSignUp(!signUp);

  return (
    <div>
      <Container>
        <Row style={{ display: "flex", flexDirection: "row" }}>
          <Col>
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="txt-landing">
              <h1>source of intelligence</h1>
              <p>
                Sign-up and receive unlimited accesss to all of your literatur -
                share your literature.
              </p>
            </div>
            <div className="btn-landing">
              <button className="btn-signin" onClick={signInToggle}>
                Sign In
              </button>
              <button className="btn-signup" onClick={signUpToggle}>
                Sign Up
              </button>
            </div>
          </Col>
          <Col>
            <div className="img-landing">
              <img src={Landing} alt="Landing Page" />
            </div>
          </Col>
        </Row>
      </Container>
      {signIn ? <SignIn isOpen={signIn} toggle={signInToggle} /> : null}

      {signUp ? <SignUp isOpen={signUp} toggle={signUpToggle} /> : null}
    </div>
  );
};

export default LandingPage;
