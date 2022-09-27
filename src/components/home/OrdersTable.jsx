import React from 'react'
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import usersOrdersService from "../../service/usersOrdersService"
import ArticleIcon from '@mui/icons-material/Article';
const OrdersTable = ({ mainState, setMainState, userOrder }) => {

    console.log("userOrder", userOrder.status)
    return (
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
                                <TableCell align="center">OrderProduct</TableCell>
                                <TableCell align="center">status</TableCell>
                                <TableCell align="center">enddate</TableCell>
                                <TableCell align="center">End Order</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {userOrder && userOrder.map((uo) =>

                                <TableRow key={uo.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="center">{uo.id}</TableCell>
                                    <TableCell align="center">{uo.clientname}</TableCell>
                                    <TableCell align="center">{uo.clienttel}</TableCell>
                                    <TableCell align="center">{uo.userprofileid}</TableCell>
                                    <TableCell align="center">{uo.startdate}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            disabled={uo.status === 1}
                                            color="primary"
                                            onClick={() => {
                                                mainState.currentOrder = uo;
                                                mainState.currentOrder.userProducts.forEach(upo => {
                                                    const userProduct = mainState.userProfile.userProducts.find(up => up.id == upo.userproductid);
                                                    if (userProduct) userProduct.myOrder = upo;
                                                });
                                                setMainState({ ...mainState });

                                            }}
                                        >
                                            Order
                                        </Button>
                                    </TableCell>
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
                                            onClick={() => {
                                                if (uo.status === 0) {
                                                    mainState.loading = true;
                                                    setMainState({ ...mainState })
                                                    uo.status = 1
                                                    uo.enddate = new Date().toString()
                                                    usersOrdersService._save(uo)
                                                    mainState.loading = false;
                                                    setMainState({ ...mainState })
                                                } else {
                                                    mainState.loading = true;
                                                    setMainState({ ...mainState })
                                                    uo.status = 0
                                                    uo.enddate = ""
                                                    usersOrdersService._save(uo)
                                                    mainState.loading = false;
                                                    setMainState({ ...mainState })
                                                }
                                            }}>
                                            <ArticleIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button color='error' variant="contained" onClick={() => {
                                            mainState.loading = true;
                                            setMainState({ ...mainState })
                                            usersOrdersService._delete(uo.id)
                                            mainState.loading = false;
                                            setMainState({ ...mainState })
                                        }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>


                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default OrdersTable