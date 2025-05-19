import * as React from 'react';
import { Container, Typography } from '@mui/material';


export default function Home() {
  return (
     <Container sx={{ bgcolor: 'tomato', height: "100vh",alignItems: 'center', justifyContent: 'center' }}>
        <Typography>
          Hello World
        </Typography>
     </Container>
  );
}
