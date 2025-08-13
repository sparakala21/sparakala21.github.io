"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container } from '@mui/joy';
import PDFPage from '@/components/PDFPage';

export default function Story() {
    return (
        <>
            <ResponsiveAppBar />
            <Container
                maxWidth="xl"
                sx={{
                    bgcolor: '#f0ead6',
                    minHeight: "calc(100vh - 64px)",
                    py: 0, // Remove padding since PDFPage handles its own layout
                    px: 0, // Remove padding to let PDF use full width
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <PDFPage/>
            </Container>
        </>
    )
}