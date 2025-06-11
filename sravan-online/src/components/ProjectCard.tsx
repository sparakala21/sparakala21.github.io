"use client";

import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MuiButton from '@mui/material/Button';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    isExternal?: boolean;
    imageURL?: string; // Optional image URL prop
    imageAlt?: string; // Optional alt text for the image
}

export default function ProjectCard({ 
    title, 
    description, 
    buttonText, 
    buttonLink, 
    isExternal = false,
    imageURL,
    imageAlt
}: ProjectCardProps) {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                backgroundColor: '#2C2C2C',
                borderRadius: 2,
                boxShadow: 1,
                mb: 4, // Margin bottom for spacing between cards
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                    mt: 2,
                    mb: 4,
                    textAlign: 'center',
                    color: 'white'
                }}
            >
                {title}
            </Typography>
            
            {/* Description and Image Container */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, side-by-side on larger screens
                }}
            >
                <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    sx={{
                        mt: 2,
                        mb: 4,
                        textAlign: 'left',
                        color: 'white',
                        flex: 1, // Take remaining space
                    }}
                >
                    {description}
                </Typography>
                
                {/* Image beside description */}
                {imageURL && (
                    <img 
                        src={imageURL} 
                        alt={imageAlt || title} 
                        style={{ 
                            width: '200px', 
                            height: 'auto', 
                            borderRadius: '8px',
                            flexShrink: 0 // Prevent image from shrinking
                        }} 
                    />
                )}
            </Box>
            
            {isExternal ? (
                <MuiButton
                    component="a"
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: '#f0eadc'
                    }}
                >
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            color: 'white',
                        }}
                    >
                        {buttonText}
                    </Typography>
                </MuiButton>
            ) : (
                <Link href={buttonLink} passHref style={{ textDecoration: 'none' }}>
                    <MuiButton
                        sx={{
                            color: '#f0eadc'
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{
                                color: 'white',
                            }}
                        >
                            {buttonText}
                        </Typography>
                    </MuiButton>
                </Link>
            )}
        </Container>
    );
}