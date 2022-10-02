import React from 'react'
import Box from '@mui/material/Box';
import { MDBCard, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { IconButton, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import CardMedia from "@mui/material/CardMedia";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import userProductsOrdersService from '../../service/userProductsOrdersService';
import { toast } from 'react-toastify';
import Badge from '@mui/material/Badge';

function ProductCard({ mainState, setMainState, userProduct }) {
    return (
        <>
            <Box
                sx={{
                    width: 700,
                    maxWidth: "100%",
                    marginBottom: "5%",
                }}
            >
                <MDBCard >
                    <MDBRow className='g-0'>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings">
                                    <Chip
                                        label={mainState.language == 'EN' ? `$${userProduct.salesprice}${" "}${userProduct.product.unit.nameen}` : `$${userProduct.salesprice}${" "}${userProduct.product.unit.namear}`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                </IconButton>
                            }

                            title={mainState.language == 'EN' ? userProduct.product.category.publishednameen : userProduct.product.category.publishednamear}
                        />
                        <MDBCol md='6'>
                            <CardMedia
                                component="img"
                                width="80"
                                height="200"
                                image={userProduct.product.image}
                                alt="green iguana"
                            />
                        </MDBCol>
                        <MDBCol md='6'>
                            <List sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper'
                            }} component="nav" aria-label="mailbox folders">
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="Remy Sharp" src={userProduct.product.category.logo} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={mainState.language == 'EN' ? userProduct.product.descriptionen : userProduct.product.descriptionar} />
                                </ListItem>
                                <ListItem button>
                                    {userProduct &&
                                        <>
                                            {(userProduct && (userProduct.product.brand.nameen !== "none")) &&
                                                <>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <Avatar alt="Remy Sharp" src={userProduct.product.brand.logo} />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={mainState.language == 'EN' ? userProduct.product.brand.nameen : userProduct.product.brand.namear} />
                                                </>
                                            }
                                        </>
                                    }
                                </ListItem>
                                <ListItem button  >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="Remy Sharp" src={userProduct.product.origin.flag} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={mainState.language == 'EN' ? userProduct.product.origin.nameen : userProduct.product.origin.namear} />
                                </ListItem>
                                <ListItem button>
                                    <CardActions disableSpacing>
                                        <ListItemAvatar >
                                            <ListItemText primary={`${userProduct.product.quantity}${" "}${mainState.language == 'EN' ? userProduct.product.unit.nameen : userProduct.product.unit.namear}`} />
                                            {mainState.currentOrder &&
                                                <>
                                                    {mainState && mainState.currentOrder &&
                                                        <Badge badgeContent={userProduct.myOrder && userProduct.myOrder.quantity} color='secondary'>
                                                            <Button
                                                                title='Add to Cart'
                                                                onClick={async () => {
                                                                    userProduct.myOrder = mainState.currentOrder.userProducts.find(up => up.userproductid == userProduct.id);

                                                                    if (userProduct.myOrder) {
                                                                        userProduct.myOrder.quantity += 1;
                                                                    }
                                                                    else
                                                                        userProduct.myOrder = {
                                                                            id: 0,
                                                                            orderid: mainState.currentOrder.id,
                                                                            userproductid: userProduct.id,
                                                                            quantity: 1,
                                                                            unitprice: userProduct.salesprice,
                                                                        }

                                                                    mainState.loading = true;
                                                                    setMainState({ ...mainState });
                                                                    try {
                                                                        const res = await userProductsOrdersService._save(userProduct.myOrder);
                                                                        if (userProduct.myOrder.id == 0) {
                                                                            if (res.insertId != 0) userProduct.myOrder.id = res.insertId;
                                                                            mainState.currentOrder.userProducts = [userProduct.myOrder, ...mainState.currentOrder.userProducts]
                                                                        }


                                                                    } catch (error) {
                                                                        toast.error('Server Error')

                                                                    }
                                                                    mainState.loading = false;
                                                                    setMainState({ ...mainState });

                                                                }}>
                                                                <AddShoppingCartIcon color='primary' />
                                                            </Button>
                                                        </Badge>
                                                    }
                                                </>
                                            }
                                        </ListItemAvatar>
                                    </CardActions>
                                </ListItem>
                            </List>
                        </MDBCol>
                    </MDBRow>
                    <div className="card-footer text-center">
                        {mainState.language == 'EN' ? userProduct.product.descriptionen : userProduct.product.descriptionar}
                    </div>
                </MDBCard>
            </Box>
        </>

    )

}
export default ProductCard