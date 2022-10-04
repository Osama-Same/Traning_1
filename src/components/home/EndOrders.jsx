import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import ArticleIcon from '@mui/icons-material/Article';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const getTotalPrice = ({ order }) => {
    let totalPrice = 0;
    const arr = order.userProducts;
    if (!arr) return totalPrice;
    arr.forEach(productOrder => {
        totalPrice += productOrder.quantity * productOrder.unitprice;
    });
    return totalPrice;
}
const ViewOrder = ({ open, setOpen, order }) => {
    console.log("order", order)

    const handleClose = () => {
        setOpen(false);
    };
    const [maxWidth, setMaxWidth] = useState('lg');
    return <div>
        {open && order && order.userProducts && (
            <Dialog fullWidth={"lg"} open={open} onClose={handleClose} maxWidth={maxWidth} >
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: "2%", color: "black", textAlign: "left" }}>
                        Name : {order.clientname}
                    </DialogContentText>
                    <DialogContentText sx={{ marginBottom: "2%", color: "black", textAlign: "left" }}>
                        Phone : {order.clienttel}
                    </DialogContentText>
                    <DialogContentText sx={{ marginBottom: "2%", color: "black", textAlign: "left" }}>
                        Date Started : {order.startdate}
                    </DialogContentText>
                    <DialogContentText sx={{ marginBottom: "5%", color: "black", textAlign: "left" }}>
                        Date End : {order.enddate}
                    </DialogContentText>

                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <caption style={{ textAlign: "right" }}>Total : {getTotalPrice({ order })} </caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">id</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">brand</TableCell>
                                    <TableCell align="center">origin</TableCell>
                                    <TableCell align="center">Product</TableCell>
                                    <TableCell align="center">quantity</TableCell>
                                    <TableCell align="center">unitprice</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.userProducts && order.userProducts.map((productOrder) => {
                                    return (
                                        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell align="center">
                                                {productOrder.id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder && productOrder.myUserProduct && productOrder.myUserProduct.product && productOrder.myUserProduct.product.category && productOrder.myUserProduct.product.category.nameen}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder && productOrder.myUserProduct && productOrder.myUserProduct.product && productOrder.myUserProduct.product.category && productOrder.myUserProduct.product.brand.nameen}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder && productOrder.myUserProduct && productOrder.myUserProduct.product && productOrder.myUserProduct.product.category && productOrder.myUserProduct.product.origin.nameen}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder && productOrder.myUserProduct && productOrder.myUserProduct.product && productOrder.myUserProduct.product.descriptionen}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder && productOrder.quantity}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder && productOrder.unitprice}
                                            </TableCell>
                                            <TableCell align="center">
                                                {productOrder.quantity * productOrder.unitprice}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>
        )}
    </div>
}

const EndOrders = ({ mainState, setMainState }) => {
    const [open, setOpen] = useState(false)
    const [selectedEndOrder, setSelectedEndOrder] = useState(null)

    console.log("mainState.endOrders", mainState.endOrders)
    return (
        <div>
            <div className="container" style={{ marginTop: "5%", marginBottom: "5%" }}>
                <div>
                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">id</TableCell>
                                    <TableCell align="center">clientname</TableCell>
                                    <TableCell align="center">clienttel</TableCell>
                                    <TableCell align="center">userprofileid</TableCell>
                                    <TableCell align="center">startdate</TableCell>
                                    <TableCell align="center">status</TableCell>
                                    <TableCell align="center">enddate</TableCell>
                                    <TableCell align="center">view Order</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mainState.endOrders && mainState.endOrders.map((uo) =>
                                    < TableRow key={uo.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="center">{uo.id}</TableCell>
                                        <TableCell align="center">{uo.clientname}</TableCell>
                                        <TableCell align="center">{uo.clienttel}</TableCell>
                                        <TableCell align="center">{uo.userprofileid}</TableCell>
                                        <TableCell align="center">{uo.startdate}</TableCell>
                                        <TableCell align="center">
                                            {uo.status}
                                        </TableCell>
                                        <TableCell align="center">
                                            {uo.enddate}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                title='viwe order'
                                                onClick={() => {
                                                    setSelectedEndOrder(uo)
                                                    setOpen(true)
                                                }
                                                }>
                                                <ArticleIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ViewOrder
                        open={open}
                        setOpen={setOpen}
                        order={selectedEndOrder}
                        mainState={mainState}
                    />
                </div>

            </div >
        </div>
    )
}

export default EndOrders

