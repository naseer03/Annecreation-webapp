'use client';

import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material';
import { useAuthStore } from '@/Store/authStore';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';
    const router = useRouter();

    const { resetPassword, isResetPasswordLoading, resetPasswordError, resetPasswordSuccess } = useAuthStore();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const inputStyle = {
        mt: 1,
        mb: 1,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--primary)',
                borderWidth: '2px',
                borderRadius: '8px',
            },
            '&:hover fieldset': {
                borderColor: 'var(--primary)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',
            },
        },
    };

    const isValidPassword = () => Boolean(formData.newPassword !== "" && formData.confirmPassword !== "" && formData.newPassword === formData.confirmPassword);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPassword()) {
            setSnackbar({
                open: true,
                message: 'New password and Confirm Password Mismatch',
                severity: 'error',
            });
            return;
        };

        resetPassword({
            email,
            token,
            new_password: formData.newPassword,
        });

    }

    useEffect(() => {
        if (!isResetPasswordLoading) {
            if (resetPasswordError) {
                setSnackbar({
                    open: true,
                    message: resetPasswordError ||
                        'Failed to update password.',
                    severity: 'error',
                });
                if (resetPasswordSuccess) {
                    setSnackbar({
                        open: true,
                        message: 'Password updated successfully!',
                        severity: 'success',
                    });
                    router.push('/Auth/Login');
                }
            }
        }
    }, [isResetPasswordLoading, resetPasswordError])

    return (
        <Box className="m-5">
            <h6 className="border-b-2 border-[var(--primary)] text-2xl p-4">Reset Password</h6>

            {snackbar.open && (
                <Box className="px-4 pt-4 flex justify-center">
                    <Alert
                        severity={snackbar.severity}
                        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                        variant="outlined"
                        sx={{ width: '50%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Box>
            )}

            <form className="w-[50%] mx-auto py-5" onSubmit={handleSubmit}>
                {/* New Password */}
                <Box>
                    <label htmlFor="newPassword" className="text-sm text-[var(--secondary)] font-medium">
                        New Password <span className="text-red-500">*</span>
                    </label>
                    <TextField
                        id="newPassword"
                        type="password"
                        placeholder="Enter New password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        size="small"
                        sx={inputStyle}
                    />
                </Box>

                {/* Confirm Password */}
                <Box>
                    <label htmlFor="confirmPassword" className="text-sm text-[var(--secondary)] font-medium">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Enter Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        size="small"
                        sx={inputStyle}
                    />
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isResetPasswordLoading}
                        sx={{
                            backgroundColor: 'var(--primary)',
                            color: '#fff',
                            borderRadius: '8px',
                            px: 4,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '14px',
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: 'var(--secondary)',
                                border: '1px solid var(--primary)',
                            },
                        }}
                    >
                        {isResetPasswordLoading ? 'Updating...' : 'Reset Password'}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default ForgotPassword