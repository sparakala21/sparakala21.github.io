"use client";

import * as React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
     <Container 
       sx={{ 
         bgcolor: 'eggshell', 
         height: "100vh",
         display: 'flex', // Add this to enable flexbox
         alignItems: 'center', 
         justifyContent: 'center' 
       }}
     >
        <Typography>
          Hello World
        </Typography>
     </Container>
  );
}