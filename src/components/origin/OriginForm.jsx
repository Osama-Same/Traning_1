import React, { useState, useEffect } from 'react'
import originsService from '../../service/originsService';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function OriginForm({ open, setOpen, origin, onUpdate }) {
    const [nameen, setNameen] = useState(origin ? origin.nameen : "")
    const [namear, setNamear] = useState(origin ? origin.namear : "")
    const [flag, setFlag] = useState(origin ? origin.flag : "")
    useEffect(() => {
        if (!origin) return
        setNameen(origin.nameen)
        setNamear(origin.namear)
        setFlag(origin.flag)
    }, [origin])
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = async () => {
 
        origin.nameen = nameen
        origin.namear = namear
        origin.flag = flag
        setOpen(false);
        await originsService._save(origin)
        onUpdate()
    }
    return (
        <div>
            {open && origin && (
                <div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                            <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                                origin Form
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
                                    label="Name English"
                                    onChange={(e) => setNameen(e.target.value)}
                                    name="nameen"
                                    value={nameen}
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
                                    label="Name Arabic"
                                    onChange={(e) => setNamear(e.target.value)}
                                    name="namear"
                                    value={namear}
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
                                    label="Flag"
                                    onChange={(e) => setFlag(e.target.value)}
                                    name="flag"
                                    value={flag}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                onClick={async () => {
                                    await handleSave();
                                    await handleClose();
                                }}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </div>
    )
}

export default OriginForm