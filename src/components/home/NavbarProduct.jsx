import React from 'react'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
const NavbarProduct = ({ mainState, setMainState, user }) => {
    const arr = mainState.selectedUser.usersOrders
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        result.push(arr)
    }
    console.log("user Product", user)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand mt-3 mt-lg-0 text-info" to={"/"}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={mainState.selectedUser.logo} />
                        </IconButton>
                        <IconButton
                            sx={{ color: "white" }}
                            onClick={() => {
                                const newState = { ...mainState };
                                newState.stage = 'user';
                                setMainState(newState);
                            }}
                        >
                            {mainState.selectedUser.publishednameen}
                        </IconButton>
                    </Typography>
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
                        <li className="nav-item">
                        </li>
                    </ul>
                    <div className="d-flex input-group w-auto">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {mainState.currentOrder &&
                                    <>
                                        {mainState && (mainState.currentOrder != null) &&
                                            <>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        mainState.stage = 'order';
                                                        setMainState({ ...mainState });
                                                    }}
                                                >
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                            </>
                                        }
                                    </>
                                }
                            </li>
                            <li className="nav-item">
                                {user &&
                                    <>
                                        {(user && (user.authorization === "user") &&
                                            <>
                                                <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                                    <Badge color="secondary" badgeContent={result.length}>
                                                        <Button
                                                            color="primary"
                                                            onClick={() => {
                                                                mainState.stage = 'orderUser';
                                                                setMainState({ ...mainState });
                                                            }}>
                                                            List Orders
                                                        </Button>
                                                    </Badge>
                                                </Stack>
                                            </>
                                        )}
                                    </>}
                            </li>
                            <li className="nav-item">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        mainState.currentOrder = { id: 0, clientname: '', clienttel: '', userid: mainState.selectedUser.id, startdate: new Date().toString() }
                                        mainState.stage = 'order';
                                        setMainState({ ...mainState });
                                    }}
                                >
                                    Order
                                </Button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

        </nav >
    )

}
export default NavbarProduct