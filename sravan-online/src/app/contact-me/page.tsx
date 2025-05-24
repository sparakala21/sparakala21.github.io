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
                        align: 'center', // Center align text
                    }}
                >
                    Contact Me
                </Typography>
                <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    Ways to contact me
                </Typography>
                <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    <a href="mailto:sravanparakala@gmail.com">
                    Personal Email
                    </a>
                    LinkedIn <a href="https://www.linkedin.com/in/sravan-parakala/">here</a>
                    GitHub <a href="github.com/sparakala21">here</a>
                </Typography>
            </Container>
        </>
    )

}
