'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, IconButton } from '@mui/material';
import { LuX } from 'react-icons/lu';
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
            <LuX size={24} />
          </IconButton>
        </Box>
        <ProductCard item={product} />
      </Box>
    </Modal>
  );
};

// ✅ PropTypes validation
ProductPreviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    model: PropTypes.string,
    design: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    manufacturer_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ProductPreviewModal;
