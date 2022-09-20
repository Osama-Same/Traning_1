import React, { useState, useEffect } from 'react'
import unitsService from '../../service/unitsService'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UnitsForm = ({ open, setOpen, unit, onUpdate }) => {
    const [nameen, setNameen] = useState(unit ? unit.nameen : '');
    const [namear, setNamear] = useState(unit ? unit.namear : '');
    useEffect(() => {
        if (!unit) return;
        setNameen(unit.nameen);
        setNamear(unit.namear);
    }, [unit]);
 
    const handleClose = () => {
        setOpen(false);
    };
    return (<div>
        {open && unit && (
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                        unit Form
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                 
                    <Button
                        onClick={async () => {
                            setOpen(false);
                            unit.nameen = nameen;
                            unit.namear = namear;
                            await unitsService._save(unit);
                            onUpdate();
                        }
                        }
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </div>)
}

export default UnitsForm