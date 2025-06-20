"use client";

import * as React from 'react';
import {Box, Container, Typography } from '@mui/material';
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
            borderRadius: 2, // Rounded corners
            boxShadow: 1, // Shadow for depth
          }}
        >

        <Box
            sx={{
              backgroundImage: 'url(pictures/background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: 839,
            }}
          />
        <SummaryCard
          title="About Me"
          description="Right now I am working on a better version of my Artist2Vec visualization project that I call artist2vec3d. Add it to the end of the URL to see what I have so far."
        />
        </Container>
      </Container>
    </>
  );
}