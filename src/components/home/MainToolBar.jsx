import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ConfirmDeleteDialog from '../common/ConfirmDeleteDialog'
import usersOrdersService from '../../service/usersOrdersService';
import myGoogleMaps from '../../service/geolocation';


function MainToolBar({ mainState, setMainState }) {
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        {mainState.selectedUser &&
                            <Typography sx={{ flexGrow: 1 }}>
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
                            </Typography>}
                    </li>
                    <li className="nav-item">
                        {mainState.selectedUser &&
                            <Typography sx={{ flexGrow: 1 }}>
                                <IconButton
                                    sx={{ color: "white" }}
                                    onClick={() => {
                                        const newState = { ...mainState };
                                        newState.stage = 'product';
                                        setMainState(newState);
                                    }}
                                >
                                    Products
                                </IconButton>
                            </Typography>
                        }
                    </li>
                </ul>
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
                                <Button
                                    onClick={() => {
                                        mainState.language = (mainState.language == 'EN') ? 'AR' : 'EN';
                                        setMainState({ ...mainState })
                                    }}
                                >
                                    {mainState.language == 'EN' ? `AR` : `EN`}
                                </Button>
                            </li>
                            <li className="nav-item">
                                {mainState.userProfile &&

                                    <Badge badgeContent={mainState.userProfile.orders && mainState.userProfile.orders.length} color='secondary'>
                                        <IconButton
                                            title='Orders'
                                            color="primary"
                                            onClick={() => {
                                                mainState.stage = 'allorders';
                                                setMainState({ ...mainState });
                                            }}
                                        >
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </Badge>
                                }
                            </li>
                            <li className="nav-item">
                                {(mainState.currentOrder) &&
                                    <div>
                                        <span className='mx-2' style={{ color: "white" }}>{mainState.currentOrder.clientname} </span>
                                        <Badge badgeContent={mainState.currentOrder.userProducts && mainState.currentOrder.userProducts.length} color='primary'
                                        >
                                            <IconButton
                                                title='Shopping Cart '
                                                color="primary"
                                                onClick={() => {
                                                    mainState.stage = 'currentorder';
                                                    setMainState({ ...mainState });
                                                }}
                                            >
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        </Badge>
                                    </div>
                                }
                            </li>
                            <li className="nav-item">
                                {(!mainState.userProfile && mainState.selectedUser &&
                                    <div>
                                        {(mainState.currentOrder) ?
                                            <Button
                                                color="error"
                                                title='Delete Order'
                                                onClick={() => {
                                                    setopenConfirmDelDlg(true)
                                                    setMainState({ ...mainState });
                                                }}
                                            >
                                                <RemoveShoppingCartIcon />
                                            </Button>
                                            :
                                            <Button
                                                color="primary"
                                                title='new Order'
                                                onClick={async () => {
                                                    mainState.stage = 'neworder';
                                                    const _geolocation = await myGoogleMaps._getCurrentLocation()
                                                    mainState.locationObject = _geolocation;
                                                    setMainState({ ...mainState });
                                                }}
                                            >
                                                New Order
                                            </Button>
                                        }
                                    </div>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <ConfirmDeleteDialog
                open={openConfirmDelDlg}
                setopen={setopenConfirmDelDlg}
                text={`Order ${mainState.currentOrder && mainState.currentOrder.clientname}  will be deleted permenantly, are you sure?`}
                onConfirm={async () => {
                    if (!mainState.currentOrder) return;
                    mainState.loading = true;
                    setMainState({ ...mainState })

                    await usersOrdersService._delete(mainState.currentOrder.id);
                    mainState.currentOrder.userProducts.forEach(upo => {
                        const userProduct = mainState.selectedUser.userProducts.find(up => up.id == upo.userproductid);
                        if (userProduct && userProduct.myOrder) userProduct.myOrder = null;
                    });

                    mainState.currentOrder = null;
                    mainState.loading = false;
                    setMainState({ ...mainState })
                }} />
        </nav >
    )


}
export default MainToolBar