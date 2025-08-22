"use client";
import Image from "next/image";
import { Box, Button, Link, Stack, Typography } from "@mui/joy";
import { useTheme } from '@mui/joy/styles';

export default function Home() {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        maxWidth: '960px', 
        margin: '0 auto', 
        textAlign: 'center',
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      
    </Box>
  );
}