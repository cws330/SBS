import React from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import "../Navbar.css";
class Navigation extends React.Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <Navbar expand='md'>
        <NavbarBrand href='/'>SBS</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/'></NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Companies
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/newCompany'>
                      New Company
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/viewCompanies'>
                      View Companies
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Money
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/newDrawerCount'>
                      Drawer Count
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/newDeposit'>
                      New Deposit
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/newSafeCount'>
                      New Safe Count
                    </NavLink>
                  </NavItem>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/moneyReports'>
                      Reports
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                My Company
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/branches'>
                      Branches
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink tag={Link} to='/users'>
                      Users
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink tag={Link} to='/logout'>
                LogOut
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
