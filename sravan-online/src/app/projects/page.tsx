"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MuiButton from '@mui/material/Button';
import Link from 'next/link';
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
                        textAlign: 'center', // Fixed: was 'align'
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
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    Description
                </Typography>
                <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    ATChess is a chess variant that allows players to play chess in Active-Time instead of turn-based.
                    The game has all the same rules as chess, but players make moves based on cooldowns instead of turns.
                    Instead of checkmate, the game ends when one players king is captured. 
                    I worked on this project with James Baker, Emmanuel David, Brenden Kiely, and Marcus Moreno.
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
                        backgroundColor: '2C2C2C', // Background color
                        borderRadius: 2, // Rounded corners
                        boxShadow: 1, // Shadow for depth
                    }}
                >
                    <MuiButton
                    color ="secondary"
                    >
                        <a href="https://atchess.onrender.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit', // Fixed: inherit button's color
                            }}
                        >
                            Click here then send the url to a friend to play!
                        </a>
                    </MuiButton>
                </Container>
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
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
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    Description
                </Typography>
                <Typography
                    variant="h3"
                    component="h3"   
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    This is a music recommendation system based on the Spotify API.
                    Unfortunately as of last year, the endpoints I used to get related artists is no longer available to the public.
                    this project has since been abandoned, but I may pick it up again in the future. 
                    Thank you to my Professor Ahmed Eleish for helping me with this project.
                </Typography>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', sm: 'row' }, // Stack on small screens, row on larger
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexWrap: 'wrap', // Allow wrapping
                        gap: 1, // Space between cards
                        padding: 1, // Padding around the container
                        backgroundColor: '#2C2C2C', // Background color
                        borderRadius: 2, // Rounded corners
                        boxShadow: 1, // Shadow for depth
                        
                    }}
                >
                    <Link href={'/music-recommender'} passHref style={{ textDecoration: 'none' }}>
                        <MuiButton>
                            <Typography
                                variant="h3"
                                component="h3"
                                gutterBottom
                                sx={{
                                    mt: 2, // Margin top
                                    mb: 4, // Margin bottom 
                                    textAlign: 'center', // Fixed: was 'align'
                                }}
                            >
                                Read more
                            </Typography>
                        </MuiButton>
                    </Link>
                </Container>
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        mt: 2, // Margin top
                        mb: 4, // Margin bottom 
                        textAlign: 'center', // Fixed: was 'align'
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
                        textAlign: 'center', // Fixed: was 'align'
                    }}
                >
                    Description
                </Typography>
            </Container>
        </>
    )
}