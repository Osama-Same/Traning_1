import React, { useState, useEffect } from 'react'
import ProductsService from '../../service/productsService';
import brandsService from "../../service/brandsService"
import originsService from "../../service/originsService"
import categoriesService from "../../service/categoriesService"
import ProductTable from './ProductTable';
import AutoCompleteSelect from '../common/AutoCompleteSelect'
import CategoriesTreeView from '../categories/CategoriesTreeView';
import unitsService from '../../service/unitsService'
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import { Button } from '@mui/material';
import ProductsDialog from './ProductsDialog';
import usersProductsService from "../../service/usersProductsService"
import registerdUsersService from "../../service/registerdUsersService"

export default function Products({ user }) {
    console.log(user)
    const [selectedProductCategory, setselectedProductCategory] = useState(null)
    const [subcategories, setsubcategories] = useState(null)
    const [selectedBrand, setselectedBrand] = useState(null)
    const [products, setProducts] = useState([]);
    const [dispProducts, setdispProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [categories, setcategories] = useState([]);

    const [openn, setOpenn] = useState(false);
    const [brands, setBrands] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [units, setUnits] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allUsersProducts, setAllUsersProducts] = useState([]);

    useEffect(() => {
        update();
    }, []);
    const update = async () => {
        setLoading(true);
        const _products = await ProductsService._get();
        const _brands = await brandsService._get();
        const _origins = await originsService._get();
        const _categories = await categoriesService._get();
        const _units = await unitsService._get();

        const _allUsers = await registerdUsersService._get();
        const _allUsersProducts = await usersProductsService._get()

        _products.forEach(product => {
            product.brand = _brands.find(br => br.id == product.brandid);
            product.origin = _origins.find(or => or.id == product.originid);
            product.category = _categories.find(cat => cat.id == product.categoryid);
            product.unit = _units.find(un => un.id == product.unitid);
        })
        _categories.forEach(category => {
            category.products = _products.filter(p => p.categoryid == category.id)
            category.subcategories = _products.filter(p => p.categoryid == category.parentid)
        })

        setSelectedProduct(null);
        setProducts(_products);
        setBrands(_brands);
        setselectedBrand(null);
        setSelectedOrigin(null);
        setOrigin(_origins);
        setUnits(_units);
        setcategories(_categories);
        setdispProducts(_products);
        setsubcategories(_products)
        setAllUsers(_allUsers)
        setAllUsersProducts(_allUsersProducts)
        setLoading(false);
    }
    return (<div>

        {user &&
            <>
                {(user && (user.authorization === 'admin')) &&
                    <>
                        <div
                            className="container-fluid"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                            <div className='row'>
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
                                    />
                                    <br />
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
                                <div className='col'>
                                    <TableContainer >
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant="contained"
                                                disabled={(!selectedBrand || !selectedOrigin || !selectedProductCategory)}
                                                onClick={() => {
                                                    setSelectedProduct({ id: 0, brandid: selectedBrand.id, originid: selectedOrigin.id, categoryid: selectedProductCategory.id, nameen: '', namear: '', descriptionen: '', descriptionar: '', image: '' });
                                                    setOpenn(true);
                                                }}
                                            >
                                                <AddIcon color="white" />
                                            </Button>
                                        </Stack>
                                        <ProductTable
                                            user={user}
                                            products={dispProducts}
                                            units={units}
                                            allUsers={allUsers}
                                            allUsersProducts={allUsersProducts}
                                            onUpdate={async () => { await update() }} />

                                        <ProductsDialog
                                            open={openn}
                                            setOpen={setOpenn}
                                            product={selectedProduct}
                                            units={units}
                                            onUpdate={async () => { await update() }} />

                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {(user && (user.authorization === "user")) &&
                    <>
                        <div
                            className="container-fluid"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                            <div className='row'>
                                <div className='col-3'>
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
                                    />
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
                                <div className='col'>
                                    <ProductTable
                                        user={user}
                                        products={dispProducts}
                                        units={units}
                                        allUsers={allUsers}
                                        allUsersProducts={allUsersProducts}
                                        onUpdate={async () => { await update() }} />
                                </div>

                            </div>
                        </div>
                    </>}

            </>}
    </div>)
}