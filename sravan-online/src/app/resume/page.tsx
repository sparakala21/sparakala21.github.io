// Story component
"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container, Typography } from '@mui/material';
import PDFPage from '@/components/PDFPage';

export default function Story() {
    return (
        <>
            <ResponsiveAppBar />
            <Container
                sx={{
                    bgcolor: '#f0ead6',
                    minHeight: "calc(100vh - 64px)",
                    py: 4,
                    px: { xs: 2, sm: 3, md: 4 },
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    sx={{
                        mt: 2,
                        mb: 4,
                        textAlign: 'center', // Fixed alignment
                    }}
                >
                    A brief overview of my journey
                </Typography>
                <PDFPage/>
            </Container>
        </>
    )
}