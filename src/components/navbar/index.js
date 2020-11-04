import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./index.css";
import { UserContext } from "../../context/UserContext";
import { Logo } from "../../assets/images";

const Example = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div>
      <Navbar color="#161616" expand="md" className="navbar-wrapper">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="gap-nav">
              <Link to="/profile" className="link">
                Profile
              </Link>
            </NavItem>
            <NavItem className="gap-nav">
              <Link to="/my-collections" className="link">
                My Collection
              </Link>
            </NavItem>
            <NavItem className="gap-nav">
              <Link to="/add-literature" className="link">
                Add Literature
              </Link>
            </NavItem>

            {state.user.role === "admin" ? (
              <NavItem className="gap-nav">
                <Link to="/admin" className="link">
                  Admin
                </Link>
              </NavItem>
            ) : (
              ""
            )}

            <NavItem>
              <Link onClick={handleLogout} className="link">
                Logout
              </Link>
            </NavItem>
          </Nav>
          <NavbarBrand>
            <Link to="/home">
              <img src={Logo} alt="Logo" />
            </Link>
          </NavbarBrand>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
