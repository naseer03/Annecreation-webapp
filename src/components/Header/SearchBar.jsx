'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FiSearch } from 'react-icons/fi';
import { useSearchStore } from '@/Store/SearchStore'; // Adjust path as needed
import { useRouter } from 'next/navigation'; // For App Router
import Link from 'next/link';

const SearchWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: 4,
  padding: '4px 8px',
  width: '100%',
  maxWidth: 300,
  position: 'relative',
}));

const SuggestionsList = styled(Paper)(() => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 10,
  maxHeight: 200,
  overflowY: 'auto',
}));

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { matchingProducts, fetchMatchingProducts, loading } = useSearchStore();
  const router = useRouter();

  // Ref to track if suggestion was clicked to prevent premature hide
  const suggestionClicked = useRef(false);

  // Fetch suggestions when user types
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchMatchingProducts(searchTerm);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetchMatchingProducts]);

  const handleSelect = (item) => {
    setSearchTerm(item.model);
    setShowSuggestions(false);
    router.push(`/product/${item.product_id}`);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 300 }}>
      <SearchWrapper>
        <FiSearch style={{ marginRight: 8 }} />
        <InputBase
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onBlur={() => {
            // Delay hiding suggestions, but only if no suggestion was clicked
            setTimeout(() => {
              if (!suggestionClicked.current) {
                setShowSuggestions(false);
              }
              suggestionClicked.current = false; // reset after
            }, 150);
          }}
          sx={{
            paddingInlineEnd: '28px'
          }}
          inputProps={{ 'aria-label': 'search product' }}
        />
        {loading &&
          <div style={
            {
              position: 'absolute',
              right: '8px',
              display: 'inline-flex',
              alignItems: 'center'
            }
          }>
            <CircularProgress size={18} style={{ marginLeft: 8 }} />
          </div>
        }
      </SearchWrapper>

      {showSuggestions && matchingProducts.length > 0 && (
        <SuggestionsList>
          <List>
            {matchingProducts.map((product) => (
              <ListItem
                key={product.product_id}
                button="true"
                component={Link}
                href={`/product/${product.product_id}`}
                style={{ cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center' }}
              >
                <div style={{position: 'relative', width: '120px', height: '60px'}}>
                  {product.image && (
                    <Image
                      src={`${API_URL}/${product.image}`}
                      alt={product.name || 'Product image'}
                      layout='fill'
                      objectFit='cover'
                    />
                  )}
                </div>
                <ListItemText primary={product.model} />
              </ListItem>
            ))}
          </List>
        </SuggestionsList>
      )}

      {showSuggestions && !loading && matchingProducts.length === 0 && (
        <SuggestionsList>
          <List>
            <ListItem>
              <ListItemText primary="No results found" />
            </ListItem>
          </List>
        </SuggestionsList>
      )}
    </div>
  );
};

export default SearchBar;
