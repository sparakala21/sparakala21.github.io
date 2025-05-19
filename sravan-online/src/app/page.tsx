"use client";

import * as React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
     <Container 
       sx={{ 
         bgcolor: '#f0ead6',
         height: "100vh",
         padding: 3,
         position: 'relative', // Add this for absolute positioning context
       }}
     >
        <Typography
          variant="h1"
          sx={{
            marginBottom: '20px',
          }}>
          Hello World
        </Typography>
        
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Resume
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Contact me
          </Button>
        </Box>
     </Container>
  );
}