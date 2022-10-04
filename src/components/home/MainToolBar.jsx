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
import ListAltIcon from '@mui/icons-material/ListAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

const MainToolBar = ({ mainState, setMainState }) => {

    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    let endOrders = mainState.userProfile && mainState.userProfile.orders.filter(o => o.status === 1)
    let startOrders = mainState.userProfile && mainState.userProfile.orders.filter(o => o.status === 0)
    return (<div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Avatar alt={mainState.selectedUser && mainState.selectedUser.logo} src={mainState.selectedUser && mainState.selectedUser.logo} />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>
                        {mainState.selectedUser &&
                            <IconButton
                                sx={{ color: "white", fontSize: 15 }}
                                onClick={() => {
                                    const newState = { ...mainState };
                                    newState.stage = 'user';
                                    setMainState(newState);
                                }}
                            >
                                {mainState.selectedUser.publishednameen}
                            </IconButton>
                        }
                    </Typography>
                    <Typography sx={{ flexGrow: 1 }}>

                        {mainState.selectedUser &&
                            <>
                                {mainState && (mainState.stage === "product" || mainState.stage === "EndOrders" || mainState.stage === "allorders") &&
                                    <IconButton
                                        sx={{ color: "white", fontSize: 15 }}
                                        onClick={() => {
                                            const newState = { ...mainState };
                                            newState.stage = 'product';
                                            setMainState(newState);
                                        }}
                                    >
                                        Products
                                    </IconButton>
                                }
                            </>
                        }
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => {
                            mainState.language = (mainState.language === 'EN') ? 'AR' : 'EN';
                            setMainState({ ...mainState })
                        }}
                    >
                        {mainState.language === 'EN' ? `AR` : `EN`}
                    </Button>
                    {mainState.userProfile &&
                        <>
                            {mainState && (mainState.stage === "product" || mainState.stage === "EndOrders" || mainState.stage === "allorders") &&
                                <>
                                    <Badge badgeContent={endOrders && endOrders.length} color='secondary'>
                                        <IconButton
                                            title=' End Orders'
                                            color="inherit"
                                            onClick={() => {
                                                mainState.stage = 'EndOrders';
                                                mainState.endOrders = endOrders;
                                                setMainState({ ...mainState });
                                            }}
                                        >
                                            <ListAltIcon />
                                        </IconButton>
                                    </Badge>
                                    <Badge badgeContent={startOrders && startOrders.length} color='secondary'>
                                        <IconButton
                                            title='Orders'
                                            color="inherit"
                                            onClick={() => {
                                                mainState.stage = 'allorders';
                                                mainState.startOrders = startOrders;
                                                setMainState({ ...mainState });
                                            }}
                                        >
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </Badge>
                                </>
                            }
                        </>
                    }
                    {(mainState.currentOrder) &&
                        <div>
                            <span className='mx-2' style={{ color: "white" }}>{mainState.currentOrder.clientname} </span>
                            <Badge badgeContent={mainState.currentOrder.userProducts && mainState.currentOrder.userProducts.length} color='primary'
                            >
                                <IconButton
                                    title='Shopping Cart '
                                    color="inherit"
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
                                    color="inherit"
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
                </Toolbar>
            </AppBar>
        </Box>
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
    </div>
    )
}
export default MainToolBar