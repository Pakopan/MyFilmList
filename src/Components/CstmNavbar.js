import React,{useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
  import { Link } from 'react-router-dom';
  import { Film } from 'react-bootstrap-icons';
  import { PersonBadgeFill } from 'react-bootstrap-icons';
  import { BinocularsFill } from 'react-bootstrap-icons';

export default function CstmNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (

        <Navbar className="row" light expand="md">
          <NavbarBrand className="col-6">
            <Link style={{textDecoration:"none", color:"white"}} to="/">
              <h1><Film color="white" size={40}/><b> MY MOVIE LIST</b></h1>
              
            </Link>
            </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className="col-1" isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="menuButton">
                <Link to="/upcoming">
                  <NavLink className="text-white"><BinocularsFill size={25} color="white"/> Upcoming Movie</NavLink>
                </Link>
              </NavItem>
              <Link to="/about">
              <NavItem className="menuButton">
                <NavLink className="text-white"><PersonBadgeFill size={25} color="white"/>About Me</NavLink>
              </NavItem>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>

    )
}
