import React, { useEffect, useState } from "react";
import UsersProductsService from '../../service/usersProductsService'
import productsService from "../../service/productsService"
import brandsService from "../../service/brandsService"
import originsService from "../../service/originsService"
import categoriesService from "../../service/categoriesService"
import unitsService from "../../service/unitsService"
import AutoCompleteSelect from '../common/AutoCompleteSelect'
import CategoriesTreeView from '../categories/CategoriesTreeView';
import CircularProgress from '@mui/material/CircularProgress';
import StoreTable from "./StoreTable"
import Box from '@mui/material/Box';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function UsersStore({ user }) {

    const [userProducts, setUserProducts] = useState([])
    const [brands, setBrands] = useState([]);
    const [categories, setcategories] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [dispUserProducts, setdispUserProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showLeftDiv, setshowLeftDiv] = useState(true);
    const [dispProducts, setdispProducts] = useState([]);

    const [selectedBrand, setselectedBrand] = useState(null)
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedProductCategory, setselectedProductCategory] = useState(null)

    useEffect(() => {
        setLoading(true)
        update();
    }, [user]);

    async function update() {
        setLoading(true);
        if (!user) return;
        const _alluserProducts = await UsersProductsService._get();
        const _userProducts = _alluserProducts.filter(up => up.userid == user.id);
        let _allProducts = await productsService._get();
        const _allBrands = await brandsService._get();
        const _allOrigins = await originsService._get();
        const _allCategories = await categoriesService._get();
        const _allUnits = await unitsService._get();

        _userProducts.forEach(up => {
            const product = _allProducts.find(p => p.id == up.productid);
            if (product) {
                up.product = product;
                product.brand = _allBrands.find(br => br.id == product.brandid);
                product.origin = _allOrigins.find(or => or.id == product.originid);
                product.category = _allCategories.find(cat => cat.id == product.categoryid);
                if (!product.category.userProducts) product.category.userProducts = [];
                product.category.userProducts.push(up);
                product.unit = _allUnits.find(un => un.id == product.unitid)
            }
        })
        setUserProducts(_userProducts);
        setBrands(_allBrands);
        setOrigin(_allOrigins);
        setcategories(_allCategories)
        setdispUserProducts(_userProducts);
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
                </Box> :
                <>
                    {user && (user.authorization === 'user') &&
                        <div
                            className="container-fluid"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                            <div className='row'>
                                {showLeftDiv &&
                                    <>
                                        <div></div>
                                        <div className='col-4'>
                                            <AutoCompleteSelect
                                                textLabel='Brand'
                                                options={brands}
                                                selectedOption={selectedBrand}
                                                onChange={(brand) => setselectedBrand(brand)}
                                                labelOption='nameen'
                                                labelImage='logo'
                                            /><br></br>
                                            <AutoCompleteSelect
                                                textLabel='Origin'
                                                options={origin}
                                                selectedOption={selectedOrigin}
                                                onChange={(origin) => setSelectedOrigin(origin)}
                                                labelOption='nameen'
                                                labelImage='flag'
                                            /><br></br>

                                            <CategoriesTreeView
                                                className='m-2'
                                                allowEdit={false}
                                                categories={categories}
                                                onSelect={(category) => {
                                                    if (category && category.products) {
                                                        setdispProducts(category.products);
                                                    }
                                                    if (category && category.categorytype != 0)
                                                        setselectedProductCategory(category)
                                                    else
                                                        setselectedProductCategory(null)
                                                }}
                                            />
                                        </div>
                                    </>}
                                <div className="col">
                                    <>
                                        <IconButton onClick={() => setshowLeftDiv(!showLeftDiv)}>
                                            {showLeftDiv ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                                        </IconButton>
                                        <StoreTable userProducts={userProducts} onUpdate={async () => { await update() }} />
                                    </>
                                </div>

                            </div>
                        </div>
                    }
                </>}
        </div>
    )
}