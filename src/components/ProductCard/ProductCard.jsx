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

import useCartStore from '@/Store/cartStore';
import useWishlistStore from '@/Store/wishlistStore';
import { API_URL, useAuthStore } from '@/Store/authStore';
import LoginForm from '@/app/Auth/Login/LoginForm';
import { useRouter } from 'next/navigation';

const ProductCard = ({ item }) => {
  const data = { ...item };
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [addonError, setAddonError] = useState(false);

  const router = useRouter();
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
    setAddonError(false); // reset error on any change
    setSelectedAddons((prev) =>
      checked
        ? [...prev, addon]
        : prev.filter((a) => a.option_value_id !== addon.option_value_id)
    );
  };

  const addItemToCart = (afterLogin = false) => {
    if (!accessToken && !afterLogin) {
      setPendingAction('cart');
      setModalOpen(true);
      return;
    }

    const hasOptions = Array.isArray(item.options) && item.options.length > 0;
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
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        }}
        className="bg-white rounded-lg my-10 px-6 py-8"
      >
        <h1 className="text-center text-4xl font-semibold text-[var(--secondary)] mb-10">
          {data.model || 'N/A'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Image */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false);
              setPosition({ x: 50, y: 50 });
            }}
            className="w-[30%] flex justify-center overflow-hidden rounded-md relative cursor-zoom-in"
          >
            <Image
              src={`${API_URL}/${item.image}`}
              alt={data.design || 'Design Image'}
              width={300}
              height={300}
              style={{
                transform: hover
                  ? `scale(4) translate(${50 - position.x}%, ${50 - position.y}%)`
                  : 'scale(1)',
                transition: 'transform 0.2s ease-out',
              }}
            />
          </div>

          {/* Right: Info */}
          <div className="flex w-[60%] flex-col gap-3 justify-between">
            <div className="flex justify-between">
              <div>
                <p className="text-lg mb-4 flex items-center gap-3">
                  <span className="gradient-text">{data.sku || 'SKU N/A'}</span>
                  <button
                    onClick={() => handleShare(item?.sku || 'Design')}
                    className="text-[var(--primary)] cursor-pointer hover:text-[#996E19] transition"
                    title="Share"
                  >
                    <FaShareAlt />
                  </button>
                </p>
                <ul className="space-y-3 text-md text-[var(--secondary)]">
                  <li><span className="font-bold">Design Code:</span> {data.model}</li>
                  <li><span className="font-bold">Stitches:</span> {item.upc}</li>
                  <li><span className="font-bold">Area / Width / Height:</span> {item?.ean || 'N/A'}</li>
                  <li><span className="font-bold">Color / Needles:</span> {item.jan}</li>
                </ul>
              </div>

              {/* Add-ons */}
              <div>
                {item.options?.length > 0 ? (
                  <>
                    <ul className="space-y-3">
                      {item.options.map((option) =>
                        option.values.map((value) => (
                          <li key={value.option_value_id} className="flex items-center gap-3">
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
                              className="flex-1 text-[var(--secondary)] text-sm sm:text-base"
                            >
                              {value.name}
                            </label>
                            <p className="text-[var(--secondary)] text-sm sm:text-base whitespace-nowrap">
                              {value.price || 'Included'}
                            </p>
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
            <div className="flex justify-between mt-2 flex-wrap">
              <div className="w-1/2">
                <button
                  onClick={() => addItemToWishlist()}
                  className="cursor-pointer font-semibold hover:bg-[var(--primary)] hover:text-white flex items-center justify-center gap-2 border-2 border-[var(--primary)] text-[var(--secondary)] px-4 py-2 rounded-md transition"
                >
                  <FaRegHeart />
                  {alreadyInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              <div className="w-1/2">
                <button
                  onClick={() => addItemToCart()}
                  className="ml-7 cursor-pointer flex items-center justify-center gap-2 bg-[var(--primary)] font-semibold hover:bg-white text-[var(--secondary)] hover:text-[var(--secondary)] border-2 border-[var(--primary)] px-5 py-2 rounded-md transition"
                >
                  <MdOutlineShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Card
          sx={{
            width: '100%',
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

export default ProductCard;
