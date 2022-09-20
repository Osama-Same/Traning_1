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
import FavoriteIcon from '@mui/icons-material/Favorite';
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
                            avatar={

                                <Avatar alt="Remy Sharp" src={mainState.selectedUser.logo} />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <Chip
                                        label={`$${userProduct.salesprice}${" "}${userProduct.product.unit.nameen}`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                </IconButton>
                            }
                            title={mainState.selectedUser.publishednameen}
                            subheader={mainState.selectedUser.publishednamear}
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
                                    <ListItemText primary={userProduct.product.category.publishednameen} />
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
                                                    <ListItemText primary={userProduct.product.brand.nameen} />
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
                                    <ListItemText primary={userProduct.product.origin.nameen} />
                                </ListItem>
                                <ListItem button>
                                    <CardActions disableSpacing>
                                        <ListItemAvatar>
                                            {mainState.currentOrder &&
                                                <>
                                                    {mainState && (mainState.currentOrder !== null) &&
                                                        <>
                                                            <AddShoppingCartIcon color='primary' />
                                                        </>
                                                    }
                                                </>
                                            }
                                            <FavoriteIcon color='error' />
                                        </ListItemAvatar>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </ListItem>
                            </List>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </Box>
        </>

    )

}
export default ProductCard