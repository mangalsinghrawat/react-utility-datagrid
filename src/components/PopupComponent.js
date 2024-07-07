import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const PopupComponent = ({ open, onClose, children,fullWidthProp }) => {
  return (
    <Dialog open={open} fullWidth={fullWidthProp} onClose={onClose}>
      <DialogContent style={{margin:0, padding:'0px 20px'}}>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupComponent;