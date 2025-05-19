"use client";

import * as React from 'react';
import { Button, Container, Typography, Box  } from '@mui/material';

export default function Home() {
  return (
     <Container 
       sx={{ 
         bgcolor: 'eggshell', 
         height: "100vh",
         display: 'flex',
         flexDirection: 'row', // Change to column layout
         alignItems: 'flex-start', // Align items to the left
         pt: 4, // Add some padding at the top
       }}
     >
        <Typography
          variant="h1"
          sx={{

            justifyContent: 'left',
            marginBottom: '20px',}}>
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
            Press to press button
          </Button>
        </Box>
     </Container>
  );
}