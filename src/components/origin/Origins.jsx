import React, { useState, useEffect } from 'react'
import originsService from '../../service/originsService';
import ProductsService from '../../service/productsService';
import OriginTable from './originTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Origins({ user }) {
    const [origins, setOrigins] = useState([]);
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
        const _origins = await originsService._get();
        const _products = await ProductsService._get()
        _origins.forEach(origin => {
            origin.product = _products.filter(pr => pr.originid === origin.id)
        });
        setOrigins(_origins);
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
                                <OriginTable
                                    origins={origins}
                                    setOrigins={setOrigins}
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