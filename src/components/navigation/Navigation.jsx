import React, { Fragment } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = ({ user }) => {
    // console.log(user, 'users')
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand mt-2 mt-lg-0 text-info" to={"/"}>
                    CRUD
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDarkDropdown"
                    aria-controls="navbarNavDarkDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user &&
                            <>
                                {(user && (user.authorization === 'admin')) &&
                                    <NavDropdown title="database" id="basic-nav-dropdown">


                                        <NavDropdown.Item href="origins">Origin</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="brands">Brands</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="product">Products</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="categories">Categories</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="units">Units</NavDropdown.Item>
                                        <NavDropdown.Divider />


                                    </NavDropdown>
                                }

                                {user && (user.authorization === 'user') &&
                                    <>
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link className="nav-link text-white" to={"/"}>
                                                    Home
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="d-flex input-group w-auto">
                                            <Link className="nav-link text-white" to={"/OrderUser"}>
                                                Order User
                                            </Link>
                                        </div>
                                    </>
                                }
                            </>
                        }
                    </ul>
                    <div className="d-flex input-group w-auto">
                        {!user &&
                            <Fragment>
                                <Nav.Link href="/login" style={{ color: "white" }}>Login</Nav.Link>/
                                <Nav.Link href='/register' style={{ color: "white" }}>Register</Nav.Link>
                            </Fragment>}

                        {user &&
                            <>
                                <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ color: "white" }}>
                                    {(user && (user.authorization === "user")) &&
                                        <Fragment>
                                            <NavDropdown.Item href="product">product</NavDropdown.Item>
                                            <NavDropdown.Item href="UsersStore">Store</NavDropdown.Item>
                                            <NavDropdown.Item href="profile">Pofile</NavDropdown.Item>
                                            <NavDropdown.Item href="logout">Logout</NavDropdown.Item>

                                        </Fragment>}
                                    {(user && (user.authorization === "admin")) &&
                                        <Fragment>
                                            <NavDropdown.Item href="logout">Logout</NavDropdown.Item>
                                        </Fragment>
                                    }
                                </NavDropdown>/

                            </>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;