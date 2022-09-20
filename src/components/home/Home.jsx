import React, { useState, useEffect } from 'react'
import registerdUsersService from '../../service/registerdUsersService'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import productsService from '../../service/productsService'
import UsersProductsService from '../../service/usersProductsService'
import brandsService from '../../service/brandsService'
import originsService from '../../service/originsService'
import unitsService from '../../service/unitsService'
import categoriesService from '../../service/categoriesService'
import usersOrdersService from '../../service/usersOrdersService'
import RenderState from "./RenderState"
import MainToolBar from "./MainToolBar"

//===============================================================================
function linkState(newState) {
    const { allProducts, allBrands, allUnits, allOrigins, allCategories, allUsersProfiles, allUseresProducts, allUsersOrders } = newState;

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
        userProfile.usersOrders = allUsersOrders.filter(up => up.userprofileid == userProfile.id);
        userProfile.usersOrders.forEach(uo =>{
            uo.userOrder = allUsersOrders.find(o => o.userprofileid == userProfile.id)
        })

    })

}



const Home = ({ user }) => {
    const [mainState, setMainState] = useState({});
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        update()
    }, [user])
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
        const _allUsersOrders = await usersOrdersService._get()
        newMainState.allUsersOrders = _allUsersOrders
        newMainState.currentOrder = null;
        linkState(newMainState);
        if (!user)
            newMainState.stage = 'user';

        if (user && (user.authorization == 'user')) {
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
                    <MainToolBar mainState={mainState} setMainState={setMainState} user={user}/>

                    <div className='container-fluid' style={{ marginTop: "5%", marginBottom: "5%" }}>
                        <RenderState mainState={mainState} setMainState={setMainState} user={user} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Home



