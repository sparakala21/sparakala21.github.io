"use client";
import { Container, Typography, Box, Sheet, Button } from '@mui/joy';
import * as React from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/joy';

export default function Writeup() {
    const theme = useTheme();
    return (
        <>
             <Box 
            sx={{ 
                backgroundColor: theme.palette.success[600], 
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center'
            }}
            >
                <Box 
                    sx={{ 
                    backgroundColor: theme.palette.neutral[100],
                    width: '960px', // Changed from maxWidth to width for exact 960px
                    minHeight: '100vh', // Added to match the height of the dark container
                    px: { xs: 2, sm: 3, md: 4 },
                    py: 4, 
                    textAlign: 'center'
                    }}
                >
                    <Typography
                        level="h1"
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
                            level="h2"
                            sx={{ 
                                color: '#34495e', 
                                fontWeight: 'md', 
                                mb: 2 
                            }}
                        >
                            Project Origins
                        </Typography>
                        <Typography 
                            level="body-md" 
                            sx={{ 
                                lineHeight: 1.7, 
                                color: '#2c3e50',
                                mb: 2
                            }}
                        >
                            Artist2vec was born out of a desire to gain a more meaningful understanding of genres. 
                            As more musicians seek to identify with more than one genre, I wanted to create a system that could:
                        </Typography>
                        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                            <Typography 
                                component="li" 
                                level="body-md" 
                                sx={{ 
                                    mb: 1, 
                                    lineHeight: 1.7, 
                                    color: '#2c3e50' 
                                }}
                            >
                                Quantify an artist's sound based on similar artists
                            </Typography>
                            <Typography 
                                component="li" 
                                level="body-md" 
                                sx={{ 
                                    mb: 1, 
                                    lineHeight: 1.7, 
                                    color: '#2c3e50' 
                                }}
                            >
                                Model relationships between artists to map the musical landscape
                            </Typography>
                            <Typography 
                                component="li" 
                                level="body-md" 
                                sx={{ 
                                    mb: 1, 
                                    lineHeight: 1.7, 
                                    color: '#2c3e50' 
                                }}
                            >
                                Use embedding techniques to help visualize that landscape
                            </Typography>
                        </Box>
                        <Typography 
                            level="body-md" 
                            sx={{ 
                                lineHeight: 1.7, 
                                color: '#2c3e50' 
                            }}
                        >
                            In the beginning, I started with the intent to predict new favorite artists based on previous listening history.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            level="h2"
                            sx={{ 
                                color: '#34495e', 
                                fontWeight: 'md', 
                                mb: 2 
                            }}
                        >
                            Methodology
                        </Typography>
                        <Typography 
                            level="body-md" 
                            sx={{ 
                                lineHeight: 1.7, 
                                color: '#2c3e50' 
                            }}
                        >
                            I started by creating an artist network spanning the most popular artists in 5 genres. 
                            I then labeled the artists I had known in the network and gathered all the neighbors of my known artists, 
                            ranking them based on how likely they were connected to known artists.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            level="h2"
                            sx={{ 
                                color: '#34495e', 
                                fontWeight: 'md', 
                                mb: 2 
                            }}
                        >
                            Testing & Results
                        </Typography>
                        <Typography 
                            level="body-md" 
                            sx={{ 
                                lineHeight: 1.7, 
                                color: '#2c3e50' 
                            }}
                        >
                            I back-tested the model against 7 years of data I have meticulously collected since I was 15. 
                            In my testing, I found some interesting results. Obviously the artists I am familiar with have grown over time, 
                            but as time passes, this model fits closer and closer to my taste.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            level="h2"
                            sx={{ 
                                color: '#34495e', 
                                fontWeight: 'md', 
                                mb: 2 
                            }}
                        >
                            Visualization & Graph Embeddings
                        </Typography>
                        <Typography 
                            level="body-md"
                            sx={{ 
                                lineHeight: 1.7, 
                                color: '#2c3e50',
                                mb: 3
                            }}
                        >
                            Once I finished the core functionality, I started brainstorming ideas for how to visualize it effectively. 
                            That's when I discovered Graph Embeddings. In my case, they provide an easy way to turn each artist and their 
                            connections into a vector, using different dimensionality reduction techniques to create meaningful visual representations 
                            of the musical landscape.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Link href={'/artist2vec2d'} passHref style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    size="lg"
                                    sx={{
                                        color: '#2c3e50',
                                        borderColor: '#2c3e50',
                                        '&:hover': {
                                            backgroundColor: '#f8f9fa',
                                            borderColor: '#2c3e50'
                                        }
                                    }}
                                >
                                    2D Visualization
                                </Button>
                            </Link>

                            <Link href={'/artist2vec3d'} passHref style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    size="lg"
                                    sx={{
                                        color: '#2c3e50',
                                        borderColor: '#2c3e50',
                                        '&:hover': {
                                            backgroundColor: '#f8f9fa',
                                            borderColor: '#2c3e50'
                                        }
                                    }}
                                >
                                    3D Visualization
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                
            </Box>
            </Box>
        </>
    );
}