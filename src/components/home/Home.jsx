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
import {
    MDBCard,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

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
                <MDBCard style={{ maxWidth: '540px' }}>
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
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="Remy Sharp" src={userProduct.product.brand.logo} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userProduct.product.brand.nameen} />
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
                                            <AddShoppingCartIcon color='primary' />
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
    else return (
        <div>No Valid Stage</div>
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
//-------------------------------------------------------------------------------
function MainToolBar({ mainState, setMainState }) {
    if (!mainState) return <div>No State</div>

    let disp = <div></div>
    if (mainState.stage == 'user') {
        disp = <div>
            Select a user
        </div>

    }
    else if (mainState.stage == 'product') {

        disp = <div>
            <div>
                <IconButton
                    onClick={() => {
                        const newState = { ...mainState };
                        newState.stage = 'user';
                        setMainState(newState);
                    }}
                >
                    {mainState.selectedUser.publishednameen}
                </IconButton>
            </div>
            Select a product
        </div>
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
    }, [])
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
        linkState(newMainState);
        if (!user)
            newMainState.stage = 'user';

        else {
            newMainState.selectedUser = newMainState.allUsers.find(u => u.id == user.userid);
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



