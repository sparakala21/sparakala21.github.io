"use client";

import { Container, Typography, Box, Paper } from '@mui/material';
import * as React from 'react';
import ProjectCard from '@/components/ProjectCard';
import MuiButton from '@mui/material/Button';
import Link from 'next/link';
export default function Writeup() {
    return (
        <>
            <Container
                sx={{
                    bgcolor: '#f0ead6',
                    minHeight: "calc(100vh - 64px)",
                    py: 4,
                    px: { xs: 2, sm: 3, md: 4 },
                    position: 'relative'
                }}
            >
                <Paper
                    sx={{
                        padding: { xs: 3, sm: 4, md: 5 },
                        backgroundColor: '#ffffff',
                        borderRadius: 2,
                        boxShadow: 3,
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            mb: 4,
                            textAlign: 'center',
                            color: '#2c3e50',
                            fontWeight: 'bold'
                        }}
                    >
                        Artist2vec
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{ color: '#34495e', fontWeight: 'medium', mb: 2 }}
                        >
                            Project Origins
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: '#2c3e50' }}>
                            Artist2vec was born out of a desire to gain a more meaningful understanding of genres. 
                            As more musicians seek to identify with more than one genre, I wanted to create a system that could:
                        </Typography>
                        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                            <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7, color: '#2c3e50' }}>
                                Quantify an artist's sound based on similar artists
                            </Typography>
                            <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7, color: '#2c3e50' }}>
                                Model relationships between artists to map the musical landscape
                            </Typography>
                            <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7, color: '#2c3e50' }}>
                                Use embedding techniques to help visualize that landscape
                            </Typography>
                        </Box>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: '#2c3e50' }}>
                            In the beginning, I started with the intent to predict new favorite artists based on previous listening history.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{ color: '#34495e', fontWeight: 'medium', mb: 2 }}
                        >
                            Methodology
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: '#2c3e50' }}>
                            I started by creating an artist network spanning the most popular artists in 5 genres. 
                            I then labeled the artists I had known in the network and gathered all the neighbors of my known artists, 
                            ranking them based on how likely they were connected to known artists.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{ color: '#34495e', fontWeight: 'medium', mb: 2 }}
                        >
                            Testing & Results
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: '#2c3e50' }}>
                            I back-tested the model against 7 years of data I have meticulously collected since I was 15. 
                            In my testing, I found some interesting results. Obviously the artists I am familiar with have grown over time, 
                            but as time passes, this model fits closer and closer to my taste.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{ color: '#34495e', fontWeight: 'medium', mb: 2 }}
                        >
                            Visualization & Graph Embeddings
                        </Typography>
                        <Typography 
                         sx={{ 
                            lineHeight: 1.7, 
                            
                            color: '#2c3e50' 
                            }}
                        >
                            Once I finished the core functionality, I started brainstorming ideas for how to visualize it effectively. 
                            That's when I discovered Graph Embeddings. In my case, they provide an easy way to turn each artist and their 
                            connections into a vector, using different dimensionality reduction techniques to create meaningful visual representations 
                            of the musical landscape.
                        </Typography>

                        <Link href={'/artist2vec/artist2vec2d'} passHref style={{ textDecoration: 'none' }}>
                            <MuiButton
                                sx={{
                                    color: '#2C2C2C'
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        color: 'black',
                                    }}
                                >
                                    2D Visualization
                                </Typography>
                            </MuiButton>
                        </Link>

                        <Link href={'/artist2vec/artist2vec3d'} passHref style={{ textDecoration: 'none' }}>
                            <MuiButton
                                sx={{
                                    color: '#2C2C2C'
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        color: 'black',
                                    }}
                                >
                                    3D Visualization
                                </Typography>
                            </MuiButton>
                        </Link>


                    </Box>
                </Paper>
            </Container>
        </>
    )
}