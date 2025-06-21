'use client';
import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { LuX } from 'react-icons/lu'; // ✅ React Icon for Close
import ProductCard from '../ProductCard/ProductCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1000,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,

};

const ProductPreviewModal = ({ open, onClose, product }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <LuX size={24} /> {/* ✅ React Icon used here */}
          </IconButton>
        </Box>
        <ProductCard item={product} />
      </Box>
    </Modal>
  );
};

export default ProductPreviewModal;
