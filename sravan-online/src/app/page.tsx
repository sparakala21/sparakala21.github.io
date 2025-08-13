"use client";

import * as React from 'react';
import { Box, Container, Typography } from '@mui/joy';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import SummaryCard from '@/components/SummaryCard';

export default function Home() {
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
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'row' }, // Stack on small screens, row on larger
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap', // Allow wrapping
            gap: 1, // Space between cards
            padding: 2, // Padding around the container
            backgroundColor: '#ffffff', // Background color
            borderRadius: 'md', // Joy UI uses named values: xs, sm, md, lg, xl
            boxShadow: 'sm', // Joy UI uses named values: xs, sm, md, lg, xl
          }}
        >

        </Container>
      </Container>
    </>
  );
}