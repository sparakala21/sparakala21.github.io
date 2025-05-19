import * as React from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

export default function Home() {
  return (
     <Container>
      <h1>Welcome to Sravan Online</h1>
      <p>This is a sample application.</p>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
     </Container>
  );
}
