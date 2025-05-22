"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container, Typography } from '@mui/material';

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
                <image
                    src="/images/at-chess.png"
                    alt="ATChess"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                />
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
                    I'm currently working on porting the game to a web site.
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
                    Music Recommender
                </Typography>
                <image
                    src="/images/spotify.png"
                    alt="Unnamed Spotify Recommendation System"
                    style={{   
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                />
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
                <image
                    src="/../../../public/thunder-mountain-curry.png"
                    alt="Thunder Mountain Curry"
                    style={{    
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                />
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
