import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import usersOrdersService from "../../service/usersOrdersService"
import DialogContentText from "@mui/material/DialogContentText";
import { toast } from 'react-toastify';
import { GoogleMap, Marker ,LoadScript } from '@react-google-maps/api';
const NewOrderForm = ({ mainState, setMainState }) => {
    const [clientname, setClientname] = useState(mainState.currentOrder ? mainState.currentOrder.clientname : "")
    const [clienttel, setclienttel] = useState(mainState.currentOrder ? mainState.currentOrder.clienttel : "")
    const [startdate, setStartdate] = useState(mainState.currentOrder ? mainState.currentOrder.startdate : "")
 
    const containerStyle = {
        width: '700px',
        height: '400px'
    };
    return (<div>
        <div style={{ marginTop: "100px" }}>
            <div className='container' >
                <div className='row'>
                    <div className='col'>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            Order Form
                        </DialogContentText>
                        {mainState && mainState.currentOrder && mainState.currentOrder.id}
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
                            onClick={async () => {

                                if (!mainState.currentOrder) {

                                    mainState.currentOrder = {
                                        id: 0,
                                        clientname: clientname,
                                        clienttel: clienttel,
                                        latitude: parseFloat(mainState.locationObject.latitude),
                                        longitude: parseFloat(mainState.locationObject.longitude),
                                        startdate: new Date().toString(),
                                        userprofileid: mainState.selectedUser.id,
                                        userProducts: []
                                    };
                                }
                                mainState.loading = true;
                                setMainState({ ...mainState })
                                try {

                                    const res = await usersOrdersService._save(mainState.currentOrder);
                                    if (res && res.insertId && (mainState.currentOrder.id == 0)) {
                                        mainState.currentOrder.id = res.insertId;
                                        mainState.stage = 'product';
                                    }
                                    mainState.currentOrder.clientname = clientname;
                                    mainState.currentOrder.clienttel = clienttel;
                                    mainState.currentOrder.startdate = startdate;
                                    mainState.currentOrder.latitude = mainState.locationObject.latitude
                                    mainState.currentOrder.longitude = mainState.locationObject.longitude
                                    mainState.currentOrder = { ...mainState.currentOrder };
                                } catch (error) {
                                    toast.error('order id error')
                                }

                                mainState.loading = false;
                                mainState.stage = 'product'
                                setMainState({ ...mainState })

                            }}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className='col'>
                        <LoadScript
                            googleMapsApiKey="AIzaSyA1eI47U7hmDUcOcTUYgTlHtUDCxBH_DKc"
                        >
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                zoom={8}
                                center={{ lat: parseFloat(mainState.locationObject.latitude), lng: parseFloat(mainState.locationObject.longitude) }}
                            >
                                <Marker position={{ lat: mainState.locationObject.latitude, lng: mainState.locationObject.longitude }} text="My Marker" />


                            </GoogleMap>
                        </LoadScript>

                    </div>

                </div>
            </div>
        </div>

    </div>
    )
}
export default NewOrderForm