import React, { useState, useEffect } from 'react'
import registerdUsersService from '../../service/registerdUsersService'
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import productsService from '../../service/productsService'
import UsersProductsService from '../../service/usersProductsService'
import brandsService from '../../service/brandsService'
import originsService from '../../service/originsService'
import unitsService from '../../service/unitsService'
import categoriesService from '../../service/categoriesService'
import usersOrdersService from '../../service/usersOrdersService'
import { CardActionArea, IconButton, CardActions } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import {
    MDBCard,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

import TextField from "@mui/material/TextField";


//===============================================================================
function linkState(newState) {
    const { allProducts, allBrands, allUnits, allOrigins, allCategories, allUsersProfiles, allUseresProducts } = newState;
    allProducts.forEach(product => {
        product.brand = allBrands.find(br => br.id == product.brandid);
        product.origin = allOrigins.find(or => or.id == product.originid);
        product.category = allCategories.find(cat => cat.id == product.categoryid);
        product.unit = allUnits.find(un => un.id == product.unitid)
    })
    allUsersProfiles.forEach(userProfile => {
        userProfile.userProducts = allUseresProducts.filter(up => up.userid == userProfile.userid);
        userProfile.userProducts.forEach(up => {
            up.product = allProducts.find(p => p.id == up.productid);
        })
    })
}


//-------------------------------------------------------------------------------

function UserCard({ mainState, setMainState, user }) {

    if (!user) return <div>No User Profile</div>
    return (
        <>
            <Box
                sx={{
                    width: 400,
                    maxWidth: "100%",
                    marginBottom: "5%",
                }}
            >
                <Card >
                    <CardActionArea
                        onClick={() => {
                            const newState = { ...mainState };
                            newState.stage = 'product';
                            newState.selectedUser = user;
                            setMainState(newState)
                        }}
                    >
                        <div className="card text-center">
                            <div className="card-header">
                                {user.publishednameen}
                            </div>
                            <div className="card-body">
                                <CardMedia
                                    component="img"
                                    width="100"
                                    height="200"
                                    image={user.logo}
                                    alt="green iguana"
                                />
                            </div>
                            <div className="card-footer text-muted">
                                {user.publishednamear}
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </Box>
        </>
    )

}
//-------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------
function ItemCard({ mainState, setMainState, item }) {

    let disp = <div></div>
    if (mainState.stage == 'user') {
        disp = <UserCard mainState={mainState} setMainState={setMainState} user={item} />
    }
    else if (mainState.stage == 'product') {

        disp = <ProductCard mainState={mainState} setMainState={setMainState} userProduct={item} />

    }

    return (
        <div>
            {disp}
        </div>
    )

}
//-------------------------------------------------------------------------------
function RenderState({ mainState, setMainState }) {
    console.log('mainState', mainState);
    if (!mainState) return <div>No State</div>

    let renderArr = [];
    if (mainState.stage == 'user') {
        renderArr = mainState.allUsersProfiles;
    }
    else if (mainState.stage == 'product') {
        renderArr = mainState.selectedUser.userProducts;
    }
    else if (mainState.stage == 'order') return (
        <OrderForm mainState={mainState} setMainState={setMainState} />
    )

    return (
        <div className='row'>

            {renderArr.map(item => (
                <div className='col-md-4'>
                    <ItemCard key={item.id} mainState={mainState} setMainState={setMainState} item={item} />
                </div>
            ))}

        </div>
    )

}
// ------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const OrderForm = ({ mainState, setMainState }) => {
    const [clientname, setClientname] = useState(mainState.currentOrder ? mainState.currentOrder.clientname : "")
    const [clienttel, setclienttel] = useState(mainState.currentOrder ? mainState.currentOrder.clienttel : "")
    const [startdate, setStartdate] = useState(mainState.currentOrder ? mainState.currentOrder.startdate : "")
    console.log(mainState.currentOrder.startdate)
    return (<div>
        <div style={{ marginTop: "100px" }}>
            <div className='container' >
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-6'>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Client Name"
                                onChange={(e) => setClientname(e.target.value)}
                                name="clientname"
                                value={clientname}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Client Tel"
                                onChange={(e) => setclienttel(e.target.value)}
                                name="clienttel"
                                value={clienttel}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Date"
                                name="startdate"
                                onChange={(e) => setStartdate(mainState.currentOrder.startdate)}
                                disabled
                                value={(mainState.currentOrder) && (mainState.currentOrder.startdate) && (startdate)}

                            />
                        </Box>

                        <Button
                            onClick={ () => {
                                mainState.currentOrder = { id: 0, clientname: clientname, clienttel: clienttel, startdate: startdate , userprofileid : mainState.selectedUser.id};
                                usersOrdersService._save(mainState.currentOrder)
                                mainState.stage = 'product';
                                setMainState({ ...mainState })
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )
}
//------------------------------------------------------------------------------
const NavbarProduct = ({ mainState, setMainState }) => {


    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
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

                <div className="d-flex input-group w-auto">
                    {mainState.currentOrder &&
                        <>
                            {mainState && (mainState.currentOrder !== null) &&
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

                    <Button color="inherit">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                mainState.currentOrder = { id: 0, clientname: '', clienttel: '', userid: mainState.selectedUser.id, startdate: new Date().toString() }
                                mainState.stage = 'order';
                                setMainState({ ...mainState });
                            }}
                        >
                            Order
                        </Button>
                    </Button>
                </div>
            </div>

        </div >
    )

}

//-------------------------------------------------------------------------------
function MainToolBar({ mainState, setMainState }) {
    if (!mainState) return <div>No State</div>
    let disp = <div></div>

    if (!mainState.selectedUser) {
        disp = <div>
            Select a user
        </div>

    }
    else if (mainState.selectedUser) {
        disp = <div>
            <NavbarProduct mainState={mainState} setMainState={setMainState} /></div>
    }

    return (
        <div>
            {disp}
        </div>
    )

}
//-------------------------------------------------------------------------------

const Home = ({ user }) => {
    const [mainState, setMainState] = useState({});
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        update()
    }, [user])
    console.log('user from home',user);
    const update = async () => {
        setLoading(true);
        const _allUsersProfiles = await registerdUsersService._get();
        const newMainState = {};
        newMainState.allUsersProfiles = _allUsersProfiles;
        const _allUsersProducts = await UsersProductsService._get();
        newMainState.allUseresProducts = _allUsersProducts;
        const _allProducts = await productsService._get();
        newMainState.allProducts = _allProducts;
        const _allBrands = await brandsService._get();
        newMainState.allBrands = _allBrands;
        const _allOrigins = await originsService._get();
        newMainState.allOrigins = _allOrigins;
        const _allCategories = await categoriesService._get();
        newMainState.allCategories = _allCategories;
        const _allUnits = await unitsService._get();
        newMainState.allUnits = _allUnits;
        const _allUsersOrders = usersOrdersService._get()
        newMainState.allUsersOrders = _allUsersOrders
        newMainState.currentOrder = null;
        linkState(newMainState);
        if (!user)
            newMainState.stage = 'user';

        if (user&&(user.authorization =='user')){
            // console.log('newMainState.selectedUser',newMainState.selectedUser);
            newMainState.selectedUser = _allUsersProfiles.find(u => u.userid == user.id);
            newMainState.stage = 'product';
        }

        setMainState(newMainState);
        setLoading(false);
    }

    return (
        <div>
            {loading ?
                <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CircularProgress /> Loading...
                </Box>
                :
                <div>
                    <MainToolBar mainState={mainState} setMainState={setMainState} />

                    <div className='container-fluid' style={{ marginTop: "5%", marginBottom: "5%" }}>
                        <RenderState mainState={mainState} setMainState={setMainState} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Home



