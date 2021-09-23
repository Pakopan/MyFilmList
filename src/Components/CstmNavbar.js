import React,{useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
  import { Link } from 'react-router-dom';

export default function CstmNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (

        <Navbar className="row" light expand="md">
          <NavbarBrand className="col">
            <Link style={{textDecoration:"none", color:"white"}} to="/">
              <h1><b>MY MOVIE LIST</b></h1>
            </Link>
            </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className="col bg-white rounded" isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/upcoming">
                  <NavLink>Upcoming Movie</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink>GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

    )
}
