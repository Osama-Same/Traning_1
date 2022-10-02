import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StoreForm from "./StoreForm"
import ConfirmDeleteDialog from "../common/ConfirmDeleteDialog"
import UsersProductsService from "../../service/usersProductsService"

const StoreTable = ({ userProducts, onUpdate }) => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    const [open, setOpen] = useState(false);
    console.log('store', userProducts);
    return (
        <div>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">Product Description</TableCell>
                            <TableCell align="center">quantity</TableCell>
                            <TableCell align="center">costprice</TableCell>
                            <TableCell align="center">salesprice</TableCell>
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {userProducts &&
                            userProducts.map((userProduct) => (
                                <TableRow key={origin.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="center">{userProduct.id}</TableCell>
                                    <TableCell align="center">
                                        {(userProduct.product) && (userProduct.product.category) && userProduct.product.category.publishednamear}
                                        {(userProduct.product) && (userProduct.product.brand) && (userProduct.product.brand.nameen != 'none') && userProduct.product.brand.nameen}
                                        {(userProduct.product) && userProduct.product.descriptionar}
                                    </TableCell>
                                    <TableCell align="center">{userProduct.quantity}</TableCell>
                                    <TableCell align="center">{userProduct.costprice}</TableCell>
                                    <TableCell align="center">{userProduct.salesprice}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setSelectedStore(userProduct);
                                                setOpen(true);
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            disabled={origin.product && (origin.product.length > 0)}
                                            onClick={async () => {
                                                setSelectedStore(userProduct);
                                                setopenConfirmDelDlg(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <ConfirmDeleteDialog
                    open={openConfirmDelDlg}
                    setopen={setopenConfirmDelDlg}
                    text={`usersStore ${selectedStore && selectedStore.nameen
                        }  will be deleted permenantly, are you sure?`}
                    onConfirm={async () => {
                        if (!selectedStore) return;
                        await UsersProductsService._delete(selectedStore.id);
                        onUpdate()
                    }} />
                <StoreForm 
                  open={open}
                  setOpen={setOpen}
                  store={selectedStore}/>
            </TableContainer>

        </div>)
}

export default StoreTable