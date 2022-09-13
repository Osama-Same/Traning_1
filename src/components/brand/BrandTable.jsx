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
import BrandForm from "./BrandForm"

import brandsService from '../../service/brandsService';
export default function BrandTable({ brands, setBrands }) {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [open, setOpen] = useState(false);
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    return (
        <div>
            <TableContainer >
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSelectedBrand({ id: 0, nameen: "", namear: "", descriptionen: "", descriptionar: "", logo: "" });
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
                            <TableCell align="center">descriptionen</TableCell>
                            <TableCell align="center">descriptionar</TableCell>
                            <TableCell align="center">logo</TableCell>
                            <TableCell align="center">Number</TableCell>
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.map((brand) =>
                            <TableRow key={brand.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell align="center">{brand.id}</TableCell>
                                <TableCell align="center">{brand.nameen}</TableCell>
                                <TableCell align="center">{brand.namear}</TableCell>
                                <TableCell align="center">{brand.descriptionen}</TableCell>
                                <TableCell align="center">{brand.descriptionar}</TableCell>
                                <TableCell align="center"><img src={brand.logo} alt={brand.logo} width={50} height={40} /></TableCell>
                                <TableCell align="center">{brand.product && brand.product.length}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedBrand(brand);
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
                                         disabled={brand.product && (brand.product.length > 0)}
                                        onClick={async () => {
                                            setSelectedBrand(brand);
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
                    text={`prodect ${selectedBrand && selectedBrand.nameen}  will be deleted permenantly, are you sure?`}
                    onConfirm={async () => {
                        if (!selectedBrand) return;
                        await brandsService._delete(selectedBrand.id);
                        const _brands = await brandsService._get();
                        setBrands(_brands);
                    }} />
                <BrandForm open={open}
                    setOpen={setOpen}
                    brand={selectedBrand}
                    onUpdate={async () => {
                        const _brands = await brandsService._get();
                        setBrands(_brands);
                    }} />
            </TableContainer>
        </div>
    )
}