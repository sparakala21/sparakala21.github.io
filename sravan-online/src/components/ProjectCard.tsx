"use client";

import * as React from 'react';
import { Container, Typography, Box, Button, Card, CardContent } from '@mui/joy';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@mui/joy'

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
    const theme = useTheme();
    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: theme.palette.success[600],
                borderRadius: 'md',
                boxShadow: 'sm',
                mb: 4, // Margin bottom for spacing between cards
                border: '1px solid',
                borderColor: 'neutral.700',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                }}
            >
                <Typography
                    level="h1"
                    component="h1"
                    sx={{
                        mt: 1,
                        mb: 2,
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
                        level="body-lg"
                        component="p"
                        sx={{
                            textAlign: 'left',
                            color: 'white',
                            flex: 1,
                            lineHeight: 1.6,
                        }}
                    >
                        {description}
                    </Typography>
                    
                    {/* Image beside description */}
                    {imageURL && (
                        <Box
                            sx={{
                                flexShrink: 0,
                                borderRadius: 'sm',
                                overflow: 'hidden',
                            }}
                        >
                            <Image 
                                src={imageURL}
                                width={200}
                                height={150}
                                alt={imageAlt || title}
                                style={{ 
                                    borderRadius: '8px',
                                    objectFit: 'cover'
                                }} 
                            />
                        </Box>
                    )}
                </Box>
                
                {isExternal ? (
                    <Button
                        component="a"
                        href={buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="soft"
                        color="neutral"
                        size="lg"
                        sx={{
                            backgroundColor: 'rgba(240, 234, 220, 0.1)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(240, 234, 220, 0.2)',
                            },
                            borderRadius: 'sm',
                            fontWeight: 600,
                        }}
                    >
                        {buttonText}
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        href={buttonLink}
                        variant="soft"
                        color="neutral"
                        size="lg"
                        sx={{
                            backgroundColor: 'rgba(240, 234, 220, 0.1)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(240, 234, 220, 0.2)',
                            },
                            borderRadius: 'sm',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >
                        {buttonText}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}