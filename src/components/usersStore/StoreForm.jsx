import React, { useState, useEffect } from 'react'
import UsersProductsService from '../../service/usersProductsService';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StoreForm = ({ open, setOpen, store, onUpdate }) => {
    const [userid, setUserid] = useState(store ? store.userid : "");
    const [brand, setBrand] = useState(store ? store.brand : '')
    const [products, setProducts] = useState(store ? store.products : '')
    const [category, setCategory] = useState(store ? store.category : '')
    const [productid, setProductid] = useState(store ? store.productid : "");
    const [quantity, setQuantity] = useState(store ? store.quantity : "");
    const [costprice, setCostprice] = useState(store ? store.costprice : "");
    const [salesprice, setSalesprice] = useState(store ? store.salesprice : "");

    useEffect(() => {
        if (!store) return;
        setUserid(store.userid);
        setProductid(store.productid);
        setQuantity(store.quantity);
        setCostprice(store.costprice);
        setSalesprice(store.salesprice);
        setBrand(store.brand)
        setProducts(store.products)
        setCategory(store.category)
    }, [store]);
    const handleClose = () => {
        setOpen(false);
    };
    return (<div>
        {open && origin && (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            Store Form
                        </DialogContentText>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField
                                fullWidth
                                label={'userid'}
                                disabled
                                value={store ? store.userid : '***'}
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
                                label={'Brand Id'}
                                disabled
                                value={store ? store.brand : '***'}
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
                                label={'productid'}
                                disabled
                                value={store ? store.productid : '***'}
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
                                label="quantity"
                                onChange={(e) => setQuantity(e.target.value)}
                                name="quantity"
                                value={quantity}
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
                                label="costprice"
                                onChange={(e) => setCostprice(e.target.value)}
                                name="costprice"
                                value={costprice}
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
                                label="salesprice"
                                onChange={(e) => setSalesprice(e.target.value)}
                                name="salesprice"
                                value={salesprice}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            onClick={async () => {
                                setOpen(false);
                                store.productid = productid;
                                store.userid = userid;
                                store.quantity = quantity;
                                store.costprice = costprice;
                                store.salesprice = salesprice;
                                store.brand = brand;
                                store.products = products;
                                store.category = category;
                                await UsersProductsService._save(store);
                                onUpdate();
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )}
    </div>)
}


export default StoreForm