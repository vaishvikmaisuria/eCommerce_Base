import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import {
    FaShoppingCart,
    FaUser,
  } from "react-icons/fa";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { LinkContainer } from 'react-router-bootstrap'
// import SearchBox from './SearchBox'
import { logout } from '../actions/userActions';


function Header() {
    const router = useRouter();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {

        dispatch(logout())
    }


    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <NextLink href="/" passHref>
                        <Navbar.Brand>Sequoia</Navbar.Brand>
                    </NextLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <SearchBox /> */}
                        <Nav className="ml-auto" >

                            <NextLink  href='/cart' passHref>
                                <Nav.Link  className="nav-item" ><FaShoppingCart/>Cart</Nav.Link>
                            </NextLink>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NextLink href='/profile' passHref>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </NextLink>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <NextLink href='/login' passHref>
                                        <Nav.Link><FaUser/>Login</Nav.Link>
                                    </NextLink>
                                )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <NextLink href='/admin/userlist' passHref>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </NextLink>

                                    <NextLink href='/admin/productlist' passHref>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </NextLink>

                                    <NextLink href='/admin/orderlist' passHref>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </NextLink>

                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
