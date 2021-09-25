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
              <NavItem>
                <Link to="/upcoming">
                  <NavLink className="text-white">Upcoming Movie</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink className="text-white">About Me</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

    )
}
