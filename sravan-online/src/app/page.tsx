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
      </Container>
    </>
  );
}