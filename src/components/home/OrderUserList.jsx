import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
function OrderUserList({ mainState, setMainState, userOrder }) {

  
    return (
        <div>
            <div
                className="container"
                style={{ marginTop: "5%", marginBottom: "5%" }}
            >
                <div ></div>
                {mainState && (
                    <TableContainer >
                        <Table stickyHeader  sx={{ minWidth: 650 }} aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">id</TableCell>
                                    <TableCell align="center">clientname</TableCell>
                                    <TableCell align="center">clienttel</TableCell>
                                    <TableCell align="center">userprofileid</TableCell>
                                    <TableCell align="center">startdate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userOrder.map((userOrder) => {
                                    return <TableRow key={userOrder.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="center">{userOrder.id}</TableCell>
                                        <TableCell align="center">{userOrder.clientname}</TableCell>
                                        <TableCell align="center">{userOrder.clienttel}</TableCell>
                                        <TableCell align="center">{userOrder.userprofileid}</TableCell>
                                        <TableCell align="center">{userOrder.startdate}</TableCell>
                                    </TableRow>
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    )
}
export default OrderUserList