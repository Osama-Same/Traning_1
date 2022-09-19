import React, { useState, useEffect } from 'react';
import { AddCircleOutline, Close, Delete, Edit } from '@mui/icons-material';
import { IconButton, Button, Dialog, AppBar, Toolbar, Typography } from '@mui/material';
import MyTextField from '../common/myTextField';
import AutoCompleteSelect from '../common/AutoCompleteSelect'
import productsService from "../../service/productsService"
function ProductsDialog({ open, setOpen, product, units, onUpdate }) {
  const [nameen, setNameen] = useState(product ? product.nameen : '');
  const [namear, setNamear,] = useState(product ? product.namear : '');
  const [image, setImage,] = useState(product ? product.image : '');
  const [descriptionen, setdescriptionen] = useState(product ? product.descriptionen : '');
  const [descriptionar, setdescriptionar] = useState(product ? product.descriptionar : '');
  const [barcode, setBarcode] = useState(product ? product.barcode : '')
  const [selectedUnit, setselectedUnit] = useState(null);
  const [quantity, setQuantity] = useState(product ? product.quantity : '')

  useEffect(() => {
    console.log('product', product);
    if (!product) return;
    setNameen(product.nameen);
    setNamear(product.namear);
    setImage(product.image);
    setdescriptionen(product.descriptionen);
    setdescriptionar(product.descriptionar);
    setBarcode(product.barcode);
    setQuantity(product.quantity);
    setselectedUnit(units.find(u => u.id == product.unitid))
  }, [product]);

  return (
    <div>
      {open && product && <Dialog
        fullScreen
        open={open}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            </Typography>
            <Button autoFocus color="inherit"
              onClick={async () => {
                setOpen(false);
                product.nameen = nameen;
                product.namear = namear;
                product.image = image;
                product.descriptionen = descriptionen;
                product.descriptionar = descriptionar;
                product.barcode = barcode;
                product.quantity = quantity;
                product.unitid = selectedUnit.id;
                await productsService._save(product);
                onUpdate()
              }
              }
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          <MyTextField label={'Brand Id'} disabled value={product ? product.brandid : '***'} />
          <MyTextField label={'Origin id'} disabled value={product ? product.originid : '***'} />
          <MyTextField label={'Category'} disabled value={product ? product.categoryid : '***'} />
          <MyTextField label={'quantity'} placeholder={'* quantity'} value={quantity} setValue={setQuantity} />
          <AutoCompleteSelect
            textLabel='Unit'
            options={units}
            selectedOption={selectedUnit}
            onChange={(unit) => setselectedUnit(unit)}
            labelOption='nameen'
          />
          <MyTextField label={'Barcode'} placeholder={'* Barcode'} value={barcode} setValue={setBarcode} />
          <MyTextField label={'Image'} placeholder={'* image'} value={image} setValue={setImage} />
          <MyTextField label={' descriptionen '} placeholder={'* descriptionen'} value={descriptionen} setValue={setdescriptionen} rows={4} multiline />
          <MyTextField label={' descriptionar '} placeholder={'* descriptionar'} value={descriptionar} setValue={setdescriptionar} rows={4} multiline />
        </div>
      </Dialog>}
    </div>
  )
}
export default ProductsDialog