import React, { useEffect } from "react";
import { Col } from "reactstrap";
import { Logo } from "../../../assets/images";
import SearchForm from "../../../components/searchForm";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Col md={12} className="home-page-container">
        <img src={Logo} alt="search" className="img-home" />
      </Col>
      <SearchForm />
    </div>
  );
};

export default HomePage;
