import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
  import { Link } from 'react-router-dom';
  import { Film } from 'react-bootstrap-icons';
  import { PersonBadgeFill } from 'react-bootstrap-icons';
  import { BinocularsFill } from 'react-bootstrap-icons';
  import { ArchiveFill } from 'react-bootstrap-icons';

export default function CstmNavbar() {

    return (
        <Navbar className="row" expand="md">
          <NavbarBrand className="col-5">
            <Link style={{textDecoration:"none", color:"white"}} to="/">
              <h1><Film color="white" size={40}/><b> MY MOVIE LIST</b></h1>
            </Link>
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

            <Link to="/upcoming">
              <NavItem className="menuButton">
                  <NavLink className="text-white"><BinocularsFill size={25} color="white"/> Upcoming Movie</NavLink>
              </NavItem>
              </Link>

              <Link to="/my-space">
              <NavItem className="menuButton">
                <NavLink className="text-white"><ArchiveFill size={25} color="white"/>My Space</NavLink>
              </NavItem>
              </Link>
              
              <Link to="/about">
              <NavItem className="menuButton">
                <NavLink className="text-white"><PersonBadgeFill size={25} color="white"/>About Me</NavLink>
              </NavItem>
              </Link>
            </Nav>
        </Navbar>

    )
}
