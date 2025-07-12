'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

import { useAuthStore, API_URL } from '@/Store/authStore';
import useWishlistStore from '@/Store/wishlistStore';

import LoginModal from './ActionModal';
import ProductPreviewModal from './productdetails';

const CARD_WIDTH = 220;
const IMAGE_HEIGHT = 220;

const ArrivalCard = ({ item }) => {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const accessToken = useAuthStore((state) => state.accessToken);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const error = useWishlistStore((state) => state.error);
  const wishlistItems = useWishlistStore((state) => state.wishlist);
  const setError = useWishlistStore.setState;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const isLiked = wishlistItems?.some(
      (p) => p.product_id === item.product_id
    );
    setLiked(isLiked);
  }, [wishlistItems, item.product_id]);

  useEffect(() => {
    if (!accessToken || !pendingAction) return;

    if (pendingAction === 'wishlist') {
      handleAddToWishlist();
    }

    setPendingAction(null);
    setModalOpen(false);
  }, [accessToken, pendingAction]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      setError({ error: null });
    }
  }, [error]);

  const handleAddToWishlist = async () => {
    if (!accessToken) {
      setPendingAction('wishlist');
      setModalOpen(true);
      return;
    }

    setLoading(true);
    await addToWishlist(item);
    setLiked(true);
    enqueueSnackbar('Added to wishlist!', { variant: 'success' });
    setLoading(false);
  };

  const handleViewClick = () => {
    setPreviewOpen(true);
  };

  return (
    <>
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          width: `${CARD_WIDTH}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 2,
          borderRadius: 2,
          cursor: 'pointer',
          overflow: 'hidden',
          m: 1,
        }}
      >
        <Link
          href={{
            pathname: `/product/${item.product_id}`,
            query: { manufacturer: item.manufacturer_id },
          }}
          passHref
        >
          {/* Image wrapper */}
        <Box
          sx={{
            position: 'relative',
            width: `${CARD_WIDTH}px`,
            height: `${IMAGE_HEIGHT}px`,
              backgroundColor: 'black'
          }}
        >

          {item.image ? (
            <Image
              src={`${API_URL}/${item.image}`}
              alt={item.design || 'Product image'}
                layout='fill'
                objectFit='contain'
            />
          ) : (
            <Box
              sx={{
                width: `${CARD_WIDTH}px`,
                height: `${IMAGE_HEIGHT}px`,
                backgroundColor: '#eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                color: '#999',
              }}
            >
              No Image Available
            </Box>
          )}

          {/* Hover Actions */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.4)',
              opacity: hover ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 2,
            }}
          >
            {/* Icon Buttons */}
            <Box className="flex m-2 flex-col items-end gap-2">
              <IconButton
                onClick={handleAddToWishlist}
                disabled={loading}
                sx={{
                  backgroundColor: 'var(--primary)',
                  '&:hover': {
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--primary)',
                  },
                }}
              >
                {liked ? (
                  <FaHeart size={18} color="white" />
                ) : (
                  <FaRegHeart size={18} />
                )}
              </IconButton>

              <IconButton
                onClick={handleViewClick}
                sx={{
                  backgroundColor: 'var(--primary)',
                  '&:hover': {
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--primary)',
                  },
                }}
              >
                <FaEye size={18} />
              </IconButton>
            </Box>

            <Button
              fullWidth
              onClick={(e) => e.stopPropagation()}
              sx={{
                bgcolor: 'var(--primary)',
                color: 'var(--secondary)',
                fontWeight: 600,
                fontSize: 16,
                py: 1,
                borderRadius: 0,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#e6a521',
                },
              }}
            >
              View Details
            </Button>
          </Box>
        </Box>

        {/* Product Info */}
        <CardContent sx={{ px: 1.5, py: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              fontSize={16}
              sx={{ flex: 1, minWidth: 0 }}
            >
              {item.model}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ flexShrink: 0 }}
            >
              {item.design}
            </Typography>

            <Typography
              variant="subtitle2"
              fontWeight={700}
              fontSize={16}
              color="text.primary"
              noWrap
              sx={{ flexShrink: 0 }}
            >
                {item.price && <span className="gradient-text">₹{item.price}</span> }
            </Typography>
          </Box>
        </CardContent>

        </Link>
      </Card>

      {/* Modals */}
      <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ProductPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        product={item}
      />
    </>
  );
};

// ✅ PropTypes validation
ArrivalCard.propTypes = {
  item: PropTypes.shape({
    product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    model: PropTypes.string,
    design: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    manufacturer_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ArrivalCard;
