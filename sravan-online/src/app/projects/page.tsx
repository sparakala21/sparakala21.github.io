"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container, Typography } from '@mui/material';
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
                        gap: 1, // Space between cards}}
                        padding: 2, // Padding around the container
                        backgroundColor: 'f0ead6', // Background color
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
                                Click here to view the project
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
                    Thunder Mountain Curry is a local restaurant in Troy, NY. Due to the restrictions from my school, they had to move off campus.
                    As a way to help them continue to sell to RPI students, We created an app for them to take orders and recieve payments online.
                </Typography>

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
                    Wayk
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
                    Wayk is an app that has all the features of a standard maps app but with a focus on the user experience of pedestrians.
                    It has a unique feature that allows users to report obstructions in the road, such as construction, potholes, and other hazards.
                    We used the OpenStreetMaps API to get the map data and the Google Maps API to get the directions.
                    We also used generative AI to automatically validate the reports and to generate a summary of the reports for the user.
                </Typography>

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
                    Public Transit Planner
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
                    Public Transit Planner is an app created to help city planners design new routes for public transit like buses and metros.
                    it uses publicly reported traffic data to determine where congestion is and where new routes should be added.
                    It exists primarily as a proof of concept, but the idea came in a 3 hour hackathon at RPI.
                    The biggest challenges were data availability and nonstandardized data formats.
                    I worked on this project with William Chen, Mike Mac, and Sachin Mitre.
                </Typography>
            </Container>
        </>
    )
}