import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import usersOrdersService from "../../service/usersOrdersService"
import DialogContentText from "@mui/material/DialogContentText";
const OrderForm = ({ mainState, setMainState }) => {
    const [clientname, setClientname] = useState(mainState.currentOrder ? mainState.currentOrder.clientname : "")
    const [clienttel, setclienttel] = useState(mainState.currentOrder ? mainState.currentOrder.clienttel : "")
    const [startdate, setStartdate] = useState(mainState.currentOrder ? mainState.currentOrder.startdate : "")
    console.log(mainState.currentOrder.startdate)
    return (<div>
        <div style={{ marginTop: "100px" }}>
            <div className='container' >
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            Order Form
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
                                label="Client Name"
                                onChange={(e) => setClientname(e.target.value)}
                                name="clientname"
                                value={clientname}
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
                                label="Client Tel"
                                onChange={(e) => setclienttel(e.target.value)}
                                name="clienttel"
                                value={clienttel}
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
                                label="Date"
                                name="startdate"
                                onChange={(e) => setStartdate(mainState.currentOrder.startdate)}
                                disabled
                                value={(mainState.currentOrder) && (mainState.currentOrder.startdate) && (startdate)}

                            />
                        </Box>

                        <Button
                            onClick={() => {
                                mainState.currentOrder = { id: 0, clientname: clientname, clienttel: clienttel, startdate: startdate, userprofileid: mainState.selectedUser.id };
                                usersOrdersService._save(mainState.currentOrder)
                                mainState.stage = 'product';
                                setMainState({ ...mainState })
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )
}
export default OrderForm