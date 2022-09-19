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
import OriginForm from './OriginForm'
import originsService from '../../service/originsService';
const baseImagesURL = 'http://www.tochangehybrid.com/groceriesImages/origins/';
export default function OriginTable({ origins, setOrigins }) {
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [open, setOpen] = useState(false);
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);

    return (<div>
        <TableContainer >
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setSelectedOrigin({ id: 0, nameen: "", namear: "", flag: "" });
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
                        <TableCell align="center">flag</TableCell>
                        <TableCell align="center">number</TableCell>
                        <TableCell align="center">Update</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {origins.map((origin) =>
                        <TableRow key={origin.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell align="center">{origin.id}</TableCell>
                            <TableCell align="center">{origin.nameen}</TableCell>
                            <TableCell align="center">{origin.namear}</TableCell>
                            <TableCell align="center"><img src={`${baseImagesURL}${origin.id}.jpg`} alt={origin.flag} width={50} height={40} /></TableCell>
                            <TableCell align="center">{origin.product && origin.product.length}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setSelectedOrigin(origin);
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
                                    disabled={origin.product && (origin.product.length > 0)}
                                    onClick={async () => {
                                        setSelectedOrigin(origin);
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
                text={`prodect ${selectedOrigin && selectedOrigin.nameen}  will be deleted permenantly, are you sure?`}
                onConfirm={async () => {
                    if (!selectedOrigin) return;
                    await originsService._delete(selectedOrigin.id);
                    const _origins = await originsService._get();
                    setOrigins(_origins);

                }} />
            <OriginForm open={open}
                setOpen={setOpen}
                origin={selectedOrigin}
                onUpdate={async () => {
                    const _origins = await originsService._get();
                    setOrigins(_origins);
                }} />
        </TableContainer>
    </div>)
}