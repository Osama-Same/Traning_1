import React, { useState } from 'react'
import { registerUser } from '../../service/userService'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogContentText from "@mui/material/DialogContentText";
export default function Register(props) {
    const [userName, setUserName] = useState('');
    const [email, setEmail,] = useState('');
    const [password, setPassword] = useState('')
    return (
        <div style={{ marginTop: "100px" }}>
            <div className='container' >
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-6'>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            Register Form
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
                            <TextField fullWidth label={"Email"} variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <TextField fullWidth label={"Password"} type={"password"} variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Box>
                        <Button variant="contained"
                            color="primary"
                            onClick={() => {
                                const user = { name: userName, email: email, password: password }
                                registerUser(user);
                            }}
                        >
                            Save
                        </Button>
                    </div>

                </div>
            </div>
        </div>)
}