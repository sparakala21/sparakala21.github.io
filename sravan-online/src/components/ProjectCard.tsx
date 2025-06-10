"use client";

import * as React from 'react';
import { Container, Typography } from '@mui/material';
import MuiButton from '@mui/material/Button';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    isExternal?: boolean;
}

export default function ProjectCard({ 
    title, 
    description, 
    buttonText, 
    buttonLink, 
    isExternal = false 
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
            
            <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{
                    mt: 2,
                    mb: 4,
                    textAlign: 'center',
                    color: 'white'
                }}
            >
                {description}
            </Typography>
            
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'row' },
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    padding: 2,
                    backgroundColor: '#f0eadc',
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                {isExternal ? (
                    <MuiButton
                        sx={{
                            color: '#2C2C2C'
                        }}
                    >
                        <a 
                            href={buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            {buttonText}
                        </a>
                    </MuiButton>
                ) : (
                    <Link href={buttonLink} passHref style={{ textDecoration: 'none' }}>
                        <MuiButton
                            sx={{
                                color: '#2C2C2C'
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h3"
                                gutterBottom
                                sx={{
                                    mt: 2,
                                    mb: 4,
                                    textAlign: 'center',
                                }}
                            >
                                {buttonText}
                            </Typography>
                        </MuiButton>
                    </Link>
                )}
            </Container>
        </Container>
    );
}