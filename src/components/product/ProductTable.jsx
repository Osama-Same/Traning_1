import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from '@mui/material';
import ProductForm from "./ProductForm"
import { Delete, Edit } from '@mui/icons-material';
import ConfirmDeleteDialog from '../common/ConfirmDeleteDialog'
import ProductsService from '../../service/productsService';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ProductUsersList from "./productUsersList"
import usersProductsService from "../../service/usersProductsService"
import Checkbox from '@mui/material/Checkbox';
const baseImagesURL = 'http://www.tochangehybrid.com/groceriesImages/products/'

export default function ProductTable({ products, units, onUpdate, allUsers, allUsersProducts, user }) {
    const myProducts = allUsersProducts.filter(p => p.userid == user.id);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    //console.log("selectedProduct", selectedProduct)
    //console.log("user", user)

    return (<div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">id</TableCell>
                    {(user && (user.authorization === 'user')) &&
                        <TableCell align="center">check</TableCell>
                    }
                    <TableCell align="center">Product Description</TableCell>
                    <TableCell align="center">Brand</TableCell>
                    <TableCell align="center">Origin</TableCell>
                    <TableCell align="center">quantity</TableCell>
                    <TableCell align="center">unit</TableCell>
                    <TableCell align="center">barcode</TableCell>
                    <TableCell align="center">descriptionen</TableCell>
                    <TableCell align="center">descriptionar</TableCell>
                    <TableCell align="center">image</TableCell>
                    {(user && (user.authorization === 'admin')) &&
                        <TableCell align="center">Actions</TableCell>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((product) =>
                    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{product.id}</TableCell>
                        {(user && (user.authorization === 'user')) &&
                            <TableCell align="center">
                                <Checkbox
                                    checked={myProducts.find(up => (up.productid == product.id)) ? true : false}
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    onClick={async (e) => {
                                        if (e.target.checked) {
                                            let data = {
                                                id: 0,
                                                userid: user.id,
                                                productid: product.id,
                                                quantity: 0,
                                                costprice: 0,
                                                salesprice: 0
                                            }

                                            await usersProductsService._save(data)
                                            onUpdate()
                                        }

                                        else {
                                            const userProduct = myProducts.find(up => (up.productid == product.id))
                                            if (!userProduct) return;
                                            await usersProductsService._delete(userProduct.id)
                                            onUpdate()
                                        }

                                    }}
                                />
                            </TableCell>
                        }
                        <TableCell align="center"> {(product.category) && product.category.publishednamear}</TableCell>
                        <TableCell align="center"> {(product.brand) && product.brand.nameen}</TableCell>
                        <TableCell align="center"> {(product.origin) && product.origin.nameen}</TableCell>
                        <TableCell align="center"> {product.quantity}</TableCell>
                        <TableCell align="center"> {(product.unit) && product.unit.nameen}</TableCell>
                        <TableCell align="center"> {product.barcode}</TableCell>
                        <TableCell align="center"> {product.descriptionen}</TableCell>
                        <TableCell align="center"> {product.descriptionar}</TableCell>
                        <TableCell align="center"> <img src={`${baseImagesURL}${product.id}.jpg`} alt='url' width={80} height={50} /></TableCell>
                        {(user && (user.authorization === 'admin')) &&
                            <TableCell align="center">
                                <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setopenConfirmDelDlg(true)
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                                <IconButton color="primary"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setOpen(true);
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton color="primary"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setOpenList(true);
                                    }}
                                >
                                    <AccessibilityIcon />
                                </IconButton>
                            </TableCell>
                        }


                    </TableRow>)}
            </TableBody>

        </Table>
        <ConfirmDeleteDialog open={openConfirmDelDlg} setopen={setopenConfirmDelDlg} text={`Product ${selectedProduct && selectedProduct.barcode}  will be deleted permenantly, are you sure?`} onConfirm={async () => {
            if (!selectedProduct) return;
            await ProductsService._delete(selectedProduct.id);
            onUpdate();
        }} />
        <ProductForm
            units={units}
            open={open}
            setOpen={setOpen}
            product={selectedProduct}
            onUpdate={async () => { onUpdate() }} />

        <ProductUsersList openList={openList} setOpenList={setOpenList} product={selectedProduct}
            allUsers={allUsers} allUsersProducts={allUsersProducts} onUpdate={async () => { onUpdate() }} />

    </div>)
}