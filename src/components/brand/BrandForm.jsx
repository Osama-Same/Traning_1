import React, { useState, useEffect } from 'react'
import originsService from '../../service/brandsService';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function BrandForm({ open, setOpen, brand, onUpdate }) {
    const [nameen, setNameen] = useState(brand ? brand.nameen : "")
    const [namear, setNamear] = useState(brand ? brand.namear : "")
    const [descriptionen, setDescriptionen] = useState(brand ? brand.descriptionen : "")
    const [descriptionar, setDescriptionar] = useState(brand ? brand.descriptionar : "")
    const [logo, setLogo] = useState(brand ? brand.logo : "")

    useEffect(() => {
        if (!brand) return
        setNameen(brand.nameen)
        setNamear(brand.namear)
        setDescriptionen(brand.descriptionen)
        setDescriptionar(brand.descriptionar)
        setLogo(brand.logo)
    }, [brand])
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = async () => {

        brand.nameen = nameen
        brand.namear = namear
        brand.descriptionen = descriptionen
        brand.descriptionar = descriptionar
        brand.logo = logo
        setOpen(false);
        await originsService._save(brand)
        onUpdate()
    }
    return (
        <div>
            {open && brand && (
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
                                label="Description English"
                                onChange={(e) => setDescriptionen(e.target.value)}
                                name="descriptionen"
                                value={descriptionen}
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
                                label="Description Arabic"
                                onChange={(e) => setDescriptionar(e.target.value)}
                                name="descriptionar"
                                value={descriptionar}
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
                                label="Logo"
                                onChange={(e) => setLogo(e.target.value)}
                                name="logo"
                                value={logo}
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
            )}
        </div>
    )
}

export default BrandForm