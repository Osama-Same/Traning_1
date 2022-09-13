import React, { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import categoriesService from '../../service/categoriesService'
const CategoriesDialog = ({ open, setOpen, onSave, category }) => {
    const [nameen, setNameen] = useState(category ? category.nameen : '');
    const [namear, setNamear,] = useState(category ? category.namear : '');
    const [logo, setLogo,] = useState(category ? category.logo : '');
    const [descriptionen, setdescriptionen] = useState(category ? category.descriptionen : '');
    const [descriptionar, setdescriptionar,] = useState(category ? category.descriptionar : '');
    const [parentid, setparentid] = useState(category ? category.parentid : 0);
    const [publishednameen, setPublishednameen] = useState(category ? category.publishednameen : '');
    const [publishednamear, setPublishednamear] = useState(category ? category.publishednamear : '');
    const [categorytype, setCategorytype] = useState(category ? category.categorytype : '');
    useEffect(() => {
        if (!category) return;
        setparentid(category.parentid)
        setNameen(category.nameen);
        setNamear(category.namear);
        setLogo(category.logo);
        setdescriptionen(category.descriptionen);
        setdescriptionar(category.descriptionar);
        setPublishednameen(category.publishednameen);
        setPublishednamear(category.publishednamear);
        setCategorytype(category.categorytype);
    }, [category]);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {open && category && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            category Form
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
                                label="parentid"
                                onChange={(e) => setparentid(e.target.value)}
                                name="parentid"
                                value={parentid}
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
                                label="Logo"
                                onChange={(e) => setLogo(e.target.value)}
                                name="logo"
                                value={logo}
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
                                onChange={(e) => setdescriptionen(e.target.value)}
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
                                onChange={(e) => setdescriptionar(e.target.value)}
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
                                label="Description publishedname English"
                                onChange={(e) => setPublishednameen(e.target.value)}
                                name="publishednameen"
                                value={publishednameen}
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
                                label="Description publishedname Arabic"
                                onChange={(e) => setPublishednamear(e.target.value)}
                                name="publishednameen"
                                value={publishednamear}
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
                                label="categorytype"
                                onChange={(e) => setCategorytype(e.target.value)}
                                name="categorytype"
                                value={categorytype}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            onClick={async () => {
                                setOpen(false);
                                category.parentid = parentid;
                                category.nameen = nameen;
                                category.namear = namear;
                                category.logo = logo;
                                category.descriptionen = descriptionen;
                                category.descriptionar = descriptionar;
                                category.publishednameen = publishednameen;
                                category.publishednamear = publishednamear;
                                category.categorytype = categorytype;
                                await categoriesService._save(category);
                                onSave()
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
export default CategoriesDialog