"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import ProjectCard from '@/components/ProjectCard'; // Import the new component
import { Container } from '@mui/material';

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
                <ProjectCard 
                    title="ATChess"
                    description="ATChess is a chess variant that allows players to play chess in Active-Time instead of turn-based. The game has all the same rules as chess, but players make moves based on cooldowns instead of turns. Instead of checkmate, the game ends when one players king is captured. I worked on this project with James Baker, Emmanuel David, Brenden Kiely, and Marcus Moreno."
                    buttonText="Play!"
                    buttonLink="https://atchess.onrender.com"
                    isExternal={true}
                />

                <ProjectCard 
                    title="Artist2Vec"
                    description="This is a music recommendation system based on the Spotify API. Unfortunately as of last year, the endpoints I used to get related artists is no longer available to the public. this project has since been abandoned, but I may pick it up again in the future. Thank you to my Professor Ahmed Eleish for helping me with this project."
                    buttonText="View Project"
                    buttonLink="/artist2vec"
                    isExternal={false}
                />

                <ProjectCard 
                    title="Thunder Mountain Curry"
                    description="Thunder Mountain Curry is a local restaurant in Troy, NY. Due to the restrictions from my school, they had to move off campus. As a way to help them continue to sell to RPI students, We created an app for them to take orders and recieve payments online."
                    buttonText="View Project"
                    buttonLink="/thunder-mountain-curry"
                    isExternal={false}
                />

                <ProjectCard 
                    title="Wayk"
                    description="Wayk is an app that has all the features of a standard maps app but with a focus on the user experience of pedestrians. It has a unique feature that allows users to report obstructions in the road, such as construction, potholes, and other hazards. We used the OpenStreetMaps API to get the map data and the Google Maps API to get the directions. We also used generative AI to automatically validate the reports and to generate a summary of the reports for the user."
                    buttonText="View Project"
                    buttonLink="https://github.com/WaykRPI/Wayk"
                    isExternal={true}
                />

                {/* <ProjectCard 
                    title="Public Transit Planner"
                    description="Public Transit Planner is an app created to help city planners design new routes for public transit like buses and metros. it uses publicly reported traffic data to determine where congestion is and where new routes should be added. It exists primarily as a proof of concept, but the idea came in a 3 hour hackathon at RPI. The biggest challenges were data availability and nonstandardized data formats. I worked on this project with William Chen, Mike Mac, and Sachin Mitre."
                    buttonText="View Project"
                    buttonLink="/public-transit-planner"
                    isExternal={false}
                /> */}
            </Container>
        </>
    )
}