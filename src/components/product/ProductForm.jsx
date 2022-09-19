import React, { useState, useEffect } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import productsService from '../../service/productsService'
const ProductForm = ({ open, setOpen, product, units, onUpdate }) => {
  const [originid, setOriginid] = useState(product ? product.originid : '');
  const [brandid, setBrandid] = useState(product ? product.brandid : '');
  const [categoryid, setCategoryid] = useState(product ? product.categoryid : '');
  const [unitid, setUnitid] = useState(product ? product.unitid : '');
  const [image, setImage] = useState(product ? product.image : '');
  const [descriptionen, setdescriptionen] = useState(product ? product.descriptionen : '');
  const [descriptionar, setdescriptionar] = useState(product ? product.descriptionar : '');
  const [barcode, setBarcode] = useState(product ? product.barcode : '')
  const [loading, setloading] = useState(false)
  const [quantity, setQuantity] = useState(product ? product.quantity : '')
  useEffect(() => {
    console.log('product', product);
    if (!product) return;
    setCategoryid(product.categoryid);
    setBrandid(product.brandid)
    setImage(product.image);
    setdescriptionen(product.descriptionen);
    setdescriptionar(product.descriptionar);
    setBarcode(product.barcode);
    setQuantity(product.quantity);
    setUnitid(product.unitid);
    setOriginid(product.originid)
  }, [product]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {open && product && (
        
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
              Product Form
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
                label="originid"
                disabled
                onChange={(e) => setOriginid(e.target.value)}
                name="originid"
                value={originid}
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
                label="brandid"
                disabled
                onChange={(e) => setBrandid(e.target.value)}
                name="brandid"
                value={brandid}
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
                label="categoryid"
                onChange={(e) => setCategoryid(e.target.value)}
                name="categoryid"
                value={categoryid}
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
                label="image"
                onChange={(e) => setImage(e.target.value)}
                name="image"
                value={image}
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
                label="Descriptionen"
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
                label="Descriptionar"
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
                label="barcode"
                onChange={(e) => setBarcode(e.target.value)}
                name="barcode"
                value={barcode}
              />
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginBottom: "5%",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="selectedUnit"
                  name='selectedUnit'
                  onChange={(e) => setUnitid(e.target.value)}
                  value={unitid}
                >
                  {units.map((e) => {
                    return <MenuItem value={e.id}>{e.nameen}</MenuItem>
                  })}
                </Select>
              </FormControl>
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
                label="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                name="quantity"
                value={quantity}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={async () => {
                setOpen(false);
                product.brandid = originid;
                product.brandid = brandid;
                product.image = image;
                product.descriptionen = descriptionen;
                product.descriptionar = descriptionar;
                product.barcode = barcode;
                product.quantity = quantity;
                product.unitid = unitid;
                product.categoryid = categoryid;
                await productsService._save(product);
                onUpdate()
              }
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default ProductForm


