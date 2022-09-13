import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { loginUser } from '../../service/userService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogContentText from "@mui/material/DialogContentText";
export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')
    return (
        <div style={{ marginTop: "100px" }}>
            <div className='container' >
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-6'>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            Login Form
                        </DialogContentText>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField fullWidth label={"User Name"} variant="outlined" onChange={(e) => setUserName(e.target.value)} value={userName} />
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField fullWidth label={"Password"} variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    const user = { name: userName, password: password }
                                    loginUser(user);
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}