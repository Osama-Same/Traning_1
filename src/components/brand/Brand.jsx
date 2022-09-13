import React, { useState, useEffect } from 'react'
import brandsService from '../../service/brandsService';
import BrandTable from './BrandTable';
import ProductsService from '../../service/productsService';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Brands({ user }) {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        update();
        setTimeout(() => {
            setLoading(false)
        }, 8000)
    }, []);
    const update = async () => {
        const _brands = await brandsService._get();
        const _products = await ProductsService._get()
        
        _brands.forEach(brand => {
            brand.product = _products.filter(pr => pr.brandid === brand.id)
        });
        setBrands(_brands);
        setProducts(_products)

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
                    {user && <div
                        className="container"
                        style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                        {user && (user.authorization === 'admin') &&
                            <>
                                <BrandTable
                                    brands={brands}
                                    setBrands={setBrands}
                                    products={products} />
                            </>}
                        {(user && (user.authorization !== '')) &&
                            <div>
                                Unregistered Admin
                            </div>}

                    </div>}

                </div>}

        </div>
    )
}