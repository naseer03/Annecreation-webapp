'use client';

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
} from '@mui/material';
import CartItemRow from './CartItemRow';

const CartTable = ({ items }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedItems = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="w-full md:w-[70%]">
      <TableContainer sx={{ borderRadius: 2,borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0, overflowX: 'auto', border: '2px solid var(--primary)', borderBottom: 0 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: '2px solid var(--primary)' }}>
              {['Design Image', 'Design Code', 'Unit Price', 'Discount', 'Total Price'].map((heading) => (
                <TableCell key={heading} sx={{ color: '#311807', fontWeight: 'bold', fontSize: 16, borderBottom: 'none' }}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  Your cart is empty.
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item) => <CartItemRow key={item.product_id} item={item} />)
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={items.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </TableContainer>
    </div>
  );
};

export default CartTable;
