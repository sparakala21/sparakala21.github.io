"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container, Typography } from '@mui/material';

export default function Story() {
    return (
        <>
            <ResponsiveAppBar />
            <Container
                sx={{
                    bgcolor: '#f0ead6',
                    minHeight: "calc(100vh - 64px)", // Adjust for AppBar height
                    py: 4, // Vertical padding (top/bottom)
                    px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    Music Recommender
                </Typography>

                <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    Description
                </Typography>
                <Typography
                    variant="body1"
                    component="p"   
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    This is a music recommendation system based on the Spotify API.
                    Unfortunately as of last year, the endpoints I used to get related artists is no longer available to the public.
                    this project has since been abandoned, but I may pick it up again in the future. 
                    Thank you to my Professor Ahmed Eleish for helping me with this project.
                </Typography>
            </Container>
        </>
    )
}