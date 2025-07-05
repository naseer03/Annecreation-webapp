'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import {
  Dialog,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import PropTypes from 'prop-types';
import useCartStore from '@/Store/cartStore';
import useWishlistStore from '@/Store/wishlistStore';
import { API_URL, useAuthStore } from '@/Store/authStore';
import LoginForm from '@/app/Auth/Login/LoginForm';
import FullImageView from './FullImageView';

const ProductCard = ({ item }) => {
  const data = { ...item };
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [addonError, setAddonError] = useState(false);
  const [open, setOpen] = useState(false);
 
  const containerRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const accessToken = useAuthStore((state) => state.accessToken);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist || []);

  const alreadyInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((w) => w.product_id === data.id || w.product_id === data.product_id);

  useEffect(() => {
    if (accessToken && pendingAction) {
      if (pendingAction === 'cart') {
        addItemToCart(true);
      } else if (pendingAction === 'wishlist') {
        addItemToWishlist(true);
      }
      setPendingAction(null);
      setModalOpen(false);
    }
  }, [accessToken]);

  const handleShare = (text) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this design',
          text,
          url: window.location.href,
        })
        .catch((err) => console.error('Share failed:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar('Link copied to clipboard!', { variant: 'success' });
    }
  };

  const handleMouseMove = (e) => {
    if (!hover) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setPosition({ x, y });
  };

  const handleAddonChange = (addon, checked) => {
    setAddonError(false);
    setSelectedAddons((prev) =>
      checked
        ? [...prev, addon]
        : prev.filter((a) => a.option_value_id !== addon.option_value_id)
    );
  };

  const addItemToCart = (afterLogin = false) => {
    const hasOptions = Array.isArray(item.options) && item.options.length > 0;

    if (!accessToken && !afterLogin) {
      setPendingAction('cart');
      setModalOpen(true);
      return;
    }

    if (hasOptions && selectedAddons.length === 0) {
      setAddonError(true);
      return;
    }

    const options = selectedAddons
      .filter((addon) => addon.option_id && addon.option_value_id)
      .map((addon) => ({
        option_id: addon.option_id,
        option_value_id: addon.option_value_id,
      }));

    const itemWithAddons = {
      product_id: data.product_id || data.id,
      quantity: 1,
      options,
    };

    addToCart(itemWithAddons);
    enqueueSnackbar('Item added to cart!', { variant: 'success' });
  };

  const addItemToWishlist = (afterLogin = false) => {
    if (!accessToken && !afterLogin) {
      setPendingAction('wishlist');
      setModalOpen(true);
      return;
    }

    if (!item?.id && !item?.product_id) {
      enqueueSnackbar('Product ID missing', { variant: 'error' });
      return;
    }

    addToWishlist(item);
    enqueueSnackbar('Added to wishlist!', { variant: 'success' });
  };

  return (
    <>
      <div
        className="bg-white rounded-lg my-10 px-4 py-6 shadow-xl"
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--secondary)] mb-8">
          {data.model || 'N/A'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image */}
          <div
            ref={containerRef}
             onClick={() => setOpen(true)}
            className="w-full lg:w-1/3 flex justify-center overflow-hidden rounded-md relative cursor-pointer"
          >
            <Image
              src={`${API_URL}/${item.image}`}
              alt={data.design || 'Design Image'}
              width={300}
              height={200}
              className="object-cover transition-transform duration-200 ease-out"
              style={{
                userSelect: 'none',
                WebkitUserDrag: 'none'
              }}
            />
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-2/3 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Product Info */}
              <div className="flex-1">
                <p className="text-lg mb-3 flex items-center gap-3">
                  <span className="gradient-text">{data.sku || 'SKU N/A'}</span>
                  <button
                    onClick={() => handleShare(item?.sku || 'Design')}
                    className="text-[var(--primary)] hover:text-[#996E19] transition"
                    title="Share"
                  >
                    <FaShareAlt />
                  </button>
                </p>
                <ul className="space-y-2 text-sm md:text-md text-[var(--secondary)]">
                  <li><strong>Design Code:</strong> {data.model}</li>
                  <li><strong>Stitches:</strong> {item.upc}</li>
                  <li><strong>Area / Width / Height:</strong> {item?.ean || 'N/A'}</li>
                  <li><strong>Color / Needles:</strong> {item.jan}</li>
                </ul>
              </div>

              {/* Add-ons */}
              <div className="flex-1">
                {item.options?.length > 0 ? (
                  <>
                    <ul className="space-y-2">
                      {item.options.map((option) =>
                        option.values.map((value) => (
                          <li key={value.option_value_id} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              id={`addon-${value.option_value_id}`}
                              name="addons"
                              onChange={(e) =>
                                handleAddonChange(
                                  { ...value, option_id: option.option_id },
                                  e.target.checked
                                )
                              }
                            />
                            <label
                              htmlFor={`addon-${value.option_value_id}`}
                              className="flex-1"
                            >
                              {value.name}
                            </label>
                            <span className="text-nowrap">{value.price || 'Included'}</span>
                          </li>
                        ))
                      )}
                    </ul>
                    {addonError && (
                      <p className="text-red-500 text-sm mt-2">
                        Please select at least one Machine.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-400 italic">No add-ons available</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-around gap-4 mt-2">
              <div className='w-1/2'>
              <button
                onClick={() => addItemToWishlist()}
                className=" cursor-pointer font-semibold hover:bg-[var(--primary)] hover:text-white flex items-center justify-center gap-2 border-2 border-[var(--primary)] text-[var(--secondary)] px-4 py-2 rounded-md transition"
              >
                <FaRegHeart />
                {alreadyInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
</div>
 <div className='w-1/2'>
              <button
                onClick={() => addItemToCart()}
                className=" cursor-pointer  font-semibold bg-[var(--primary)] text-white hover:bg-white hover:text-[var(--secondary)] border-2 border-[var(--primary)] flex items-center justify-center gap-2 px-4 py-2 rounded-md transition"
              >
                <MdOutlineShoppingCart />
                Add to Cart
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <FullImageView
        open={open}
        onClose={() => setOpen(false)}
        src={`${API_URL}/${item.image}`}
        alt={data.design || 'Design Image'}
      />}

      {/* Login Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Card
          sx={{
            width: '100%',
            maxWidth: 420,
            boxShadow: '0px 0px 10px 0px #00000040',
            borderRadius: '12px',
          }}
        >
          <CardContent sx={{ px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 3 } }}>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                mb: 1,
                fontSize: { xs: '22px', sm: '24px' },
                fontWeight: 600,
                color: 'var(--secondary)',
              }}
            >
              Login
            </Typography>

            <Typography
              sx={{
                textAlign: 'center',
                mb: 3,
                fontSize: { xs: '14px', sm: '16px' },
                color: 'var(--secondary)',
              }}
            >
              Have an account? Log in with your email address
            </Typography>

            <LoginForm onSuccess={() => setModalOpen(false)} />
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};
ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    model: PropTypes.string,
    sku: PropTypes.string,
    image: PropTypes.string,
    design: PropTypes.string,
    upc: PropTypes.string,
    ean: PropTypes.string,
    jan: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        option_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        values: PropTypes.arrayOf(
          PropTypes.shape({
            option_value_id: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
            ]).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          })
        ).isRequired,
      })
    ),
  }).isRequired,
};

export default ProductCard;
