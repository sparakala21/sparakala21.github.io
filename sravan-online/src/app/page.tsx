"use client";

import * as React from 'react';
import {Container, Typography } from '@mui/material';
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
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom
          sx={{ 
            mt: 2, // Margin top
            mb: 4, // Margin bottom 
            align: 'center', // Center align text
          }}
        >
          I&apos;m Sravan
        </Typography>
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
        <SummaryCard
          title="About Me"
          description="I am a software engineer with a great fear of making web apps and learning new technologies."
        />
        <SummaryCard
          title="My Projects"
          description="I have some projects. Check out my GitHub for more details."
        />
        <SummaryCard
          title="Contact Me"
          description="Feel free to reach out to me via email or connect with me on LinkedIn."
        />
        <SummaryCard
          title="My Resume"
          description="You can find my resume here. I am open to new opportunities and collaborations."
        />
        </Container>
      </Container>
    </>
  );
}