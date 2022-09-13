import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent';

function ConfirmDeleteDialog({ open, setopen, text, onConfirm }) {
  return (

    <Dialog
      open={open}
    >
      <DialogContent>
        {text}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>NO</Button>
        <Button
          color='error'
          onClick={() => {
            onConfirm();
            setopen(false);

          }}
          autoFocus
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;