"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Box, Container } from '@mui/joy';
import PDFPage from '@/components/PDFPage';
import {useTheme} from '@mui/joy'

export default function Story() {
    const theme = useTheme()
    return (
        <>
            <Box 
            sx={{ 
                backgroundColor: theme.palette.success[600], 
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center'
            }}
            >
                <Box 
                    sx={{ 
                    backgroundColor: theme.palette.neutral[100],
                    width: '960px', // Changed from maxWidth to width for exact 960px
                    minHeight: '100vh', // Added to match the height of the dark container
                    px: { xs: 2, sm: 3, md: 4 },
                    py: 4, 
                    textAlign: 'center'
                    }}
                >
                <PDFPage/>
            </Box>

            </Box>
            
        </>
    )
}