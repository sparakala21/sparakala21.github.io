"use client";

import * as React from 'react';
import {Container, Typography } from '@mui/material';
import ResponsiveAppBar from '@/components/ResponsiveAppBar'; // Importing the AppBar component

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <Container 
        sx={{ 
          bgcolor: '#f0ead6',
          minHeight: "calc(100vh - 64px)", // Adjust for AppBar height
          padding: 3,
          position: 'relative',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            marginBottom: '20px',
            paddingTop: 2, // Add some space at the top
          }}>
          Hello World
        </Typography>
      </Container>
    </>
  );
}