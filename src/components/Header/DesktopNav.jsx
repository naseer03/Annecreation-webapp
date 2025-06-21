'use client'

import React, { useEffect, useState } from 'react'
import {
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
} from '@mui/material'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { usecategoryStore } from '@/Store/categoryStore'

const DesktopNav = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const pathname = usePathname()
  const { category, fetchCategories } = usecategoryStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  // Define the nav list inside the component so we can use `category`
  const navigationlist = [
    { id: 1, name: 'Home', link: '/' },
    {
      id: 3,
      name: 'Categories',
      link: '/Category',
      subcategories: category.map((item) => item.name),
    },
    { id: 2, name: 'About Us', link: '/About' },
    { id: 4, name: 'Contact Us', link: '/Contactus' },
    { id: 5, name: 'Help', link: '/Help' },
  ]

  return (
    <>
      {navigationlist.map((item) => {
        const hasSubcategories = !!item.subcategories
        const isActive = pathname === item.link

        return (
          <Box
            key={item.id}
            sx={{ position: 'relative', display: 'inline-block', backgroundColor: '#fff' }}
            onMouseEnter={hasSubcategories ? handleMouseEnter : undefined}
            onMouseLeave={hasSubcategories ? handleMouseLeave : undefined}
          >
            <Box
              className={`font-medium text-md flex items-center gap-1 lg:px-3 py-2 cursor-pointer ${
                isActive ? 'border-b-2 border-[var(--primary)]' : ''
              }`}
            >
              <a href={item.link} className="text-md text-[var(--secondary)] font-semibold">
                {item.name}
              </a>
              {hasSubcategories && (
                <span>
                  {open ? <FaChevronUp className="text-md" /> : <FaChevronDown className="text-md" />}
                </span>
              )}
            </Box>

            {hasSubcategories && item.subcategories.length > 0 && (
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
                MenuListProps={{
                  onMouseLeave: handleMouseLeave,
                  sx: { pointerEvents: 'auto' },
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                keepMounted
                PaperProps={{
                  sx: {
                    mt: 1,
                    px: 2,
                    py: 2,
                    boxShadow: 4,
                    backgroundColor: '#fff',
                    overflowY: 'auto',
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem
                  disableRipple
                  disableGutters
                  sx={{
                    p: 0,
                    backgroundColor: 'white',
                    '&:hover': { backgroundColor: 'white' },
                  }}
                >
                  <TableContainer sx={{ backgroundColor: 'white' }}>
                    <Table sx={{ border: 'none' }} size="small">
                      <TableBody>
                        {[...new Set(item.subcategories)]
                          .reduce((rows, sub, i) => {
                            const rowIndex = Math.floor(i / 5)
                            if (!rows[rowIndex]) rows[rowIndex] = []
                            rows[rowIndex].push(sub)
                            return rows
                          }, [])
                          .map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {row.map((sub, subIndex) => (
                                <TableCell
                                  key={subIndex}
                                  sx={{
                                    border: 'none',
                                    px: 2,
                                    py: 1.5,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  <a
  href={`/design?category=${encodeURIComponent(sub)}`}
 
  className="text-sm text-[var(--secondary)] hover:underline hover:text-[var(--primary)]"
>
  {sub}
</a>

                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MenuItem>
              </Menu>
            )}
          </Box>
        )
      })}
    </>
  )
}

export default DesktopNav
