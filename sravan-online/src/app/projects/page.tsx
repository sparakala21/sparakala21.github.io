"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function Story() {
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
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    ATChess
                </Typography>

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
                    Description
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    ATChess is a chess variant that allows players to play chess in Active-Time instead of turn-based.
                    The game has all the same rules as chess, but players make moves based on cooldowns instead of turns.
                    Instead of checkmate, the game ends when one players king is captured.
                </Typography>
                                <Button
                    disableRipple // This removes the ripple effect
                    color="secondary"
                    sx={{ 
                      my: 2, 
                      color: 'white', 
                      display: 'block',
                      transition: 'transform 0.1s, background-color 0.1s',
                      '&:active': {
                        transform: 'translateY(2px)', // Small movement on click
                        backgroundColor: 'rgba(255, 255, 255, 0.1)' // Subtle background change
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)' // Very subtle hover state
                      }
                    }}
                  >
                    <a href="https://atchess.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            color: 'secondary',
                        }}
                    >Click here to check it out!</a>
                </Button>
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    Music Recommender
                </Typography>

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
                    Description
                </Typography>
                <Typography
                    variant="body1"
                    component="p"   
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    This is a music recommendation system based on the Spotify API.
                    It then uses graph theory to find the best artists to recommend to you.
                    The system uses a graph to represent the relationships between artists and users.
                    The graph is built using the Spotify API to get the top artists for each user.
                    The graph is then used to find the best artists to recommend to you.
                    Unfortunately as of last year, the endpoints I used to get related artists is no longer available to the public.
                    this project has since been abandones, but I may pick it up again in the future.
                </Typography>
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        align: 'center', // Center align text
                    }}
                >
                    Thunder Mountain Curry
                </Typography>
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
                    Description
                </Typography>
            </Container>
        </>
    )

}
