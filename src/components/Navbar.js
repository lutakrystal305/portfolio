import React, { useState, useEffect, useContext } from "react";
import '../styles/Navbar.css';
import classNames from 'classnames';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import avt from '../img/panda.png';
import Drawer from './Drawer';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  const handleOver = () => {
    setHover(true)
  }
  const handleOut = () => {
    setHover(false)
  }
  
  return (
    <div className='d-Navbar'>
      <Navbar  light expand="md">
        <NavbarBrand href="/">
          <span className='logo-icon'><FontAwesomeIcon icon={faMoon} /></span>
          Thaidaik  
        </NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="Top">
              <Link to="/home" className='Linkz'>Home</Link>
            </NavItem>
            <NavItem className="Top">
              <Link to="/model" className='Linkz'>Models</Link>
            </NavItem>
            <NavItem className="Top">
              <Link to="/creator" className='Linkz'>About me</Link>
            </NavItem>
           
          </Nav>
          
        </Collapse>
        <NavbarText>
          <div className='user'>
            <Drawer avt={avt} />
          </div>
        </NavbarText>
      </Navbar>
    </div>
  );
};

export default TopBar;
