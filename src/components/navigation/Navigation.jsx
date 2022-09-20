import React, { Fragment } from "react";
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
                    data-bs-target="#navbarNavDarkDropdown1"
                    aria-controls="navbarNavDarkDropdown1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown1">

                    {user &&
                        <>

                            {(user && (user.authorization === 'admin')) &&
                                <>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/origins"}>
                                                Origin
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/brands"}>
                                                Brands
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/product"}>
                                                Products
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/Units"}>
                                                Units
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/categories"}>
                                                Categories
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="d-flex input-group w-auto">
                                        <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ color: "white" }}>
                                            <Fragment>
                                                <NavDropdown.Item href="logout">Logout</NavDropdown.Item>
                                            </Fragment>
                                        </NavDropdown>
                                    </div>
                                </>

                            }
                        </>
                    }
                    {user &&
                        <>
                            {(user && (user.authorization === 'user')) &&
                                <>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/"}>
                                                Home
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/product"}>
                                                Products
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/product"}>
                                                Products
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={"/UsersStore"}>
                                                Users Store
                                            </Link>
                                        </li>

                                    </ul>
                                    <div className="d-flex input-group w-auto">
                                        <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ color: "white" }}>
                                            <Fragment>
                                                <NavDropdown.Item href="logout">Logout</NavDropdown.Item>
                                            </Fragment>
                                        </NavDropdown>
                                    </div>
                                </>
                            }
                        </>}


                    {!user &&
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to={"/"}>
                                        Home
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex input-group w-auto">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to={"/register"}>
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    }


                </div>
            </div>
        </nav>
    );
};

export default Navigation;