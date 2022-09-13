import React, { useState } from 'react'
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDeleteDialog from '../common/ConfirmDeleteDialog'
import unitsService from '../../service/unitsService'
import UnitTable from './UnitsForm'


const UnitsTable = ({ units, setUnits }) => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <TableContainer >
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSelectedUnit({ id: 0, nameen: '', namear: '' });
                            setOpen(true);
                        }}
                    >
                        <AddIcon color="white" />
                    </Button>
                </Stack>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">nameen</TableCell>
                            <TableCell align="center">namear</TableCell>
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {units.map((unit) =>
                            <TableRow key={unit.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell align="center">{unit.id}</TableCell>
                                <TableCell align="center">{unit.nameen}</TableCell>
                                <TableCell align="center">{unit.namear}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedUnit(unit);
                                            setOpen(true);
                                        }}
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        // disabled={row.posts && (row.posts.length > 0)}
                                        onClick={async () => {
                                            setSelectedUnit(unit);
                                            setopenConfirmDelDlg(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ConfirmDeleteDialog
                    open={openConfirmDelDlg}
                    setopen={setopenConfirmDelDlg}
                    text={`units ${selectedUnit&&selectedUnit.nameen}  will be deleted permenantly, are you sure?`} 
                    onConfirm={async () => {
                        if (!selectedUnit) return;
                        await unitsService._delete(selectedUnit.id);
                        const __units = await unitsService._get();
                        setUnits(__units);
                    }} />
                <UnitTable
                    open={open}
                    setOpen={setOpen}
                    unit={selectedUnit}
                    onUpdate={async () => {
                        const _units = await unitsService._get();
                        setUnits(_units);
                    }} />
            </TableContainer>
        </div>
    )
}

export default UnitsTable