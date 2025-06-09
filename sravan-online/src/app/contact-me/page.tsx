"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { 
    Container, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Grid,
    Fade,
    useTheme
} from '@mui/material';
import { 
    Email as EmailIcon, 
    LinkedIn as LinkedInIcon, 
    GitHub as GitHubIcon,
} from '@mui/icons-material';

export default function Contact() {
    const theme = useTheme();
    
    const contactMethods = [
        {
            title: "Email",
            description: "Drop me a line anytime",
            icon: <EmailIcon sx={{ fontSize: 40 }} />,
            link: "mailto:sravanparakala@gmail.com",
            color: "#EA4335"
        },
        {
            title: "LinkedIn",
            description: "Let's connect professionally",
            icon: <LinkedInIcon sx={{ fontSize: 40 }} />,
            link: "https://www.linkedin.com/in/sravan-parakala/",
            color: "#0077B5"
        },
        {
            title: "GitHub",
            description: "Check out my projects",
            icon: <GitHubIcon sx={{ fontSize: 40 }} />,
            link: "https://github.com/sparakala21",
            color: "#333"
        }
    ];

    return (
        <>
            <ResponsiveAppBar />
            <Box
            >
                <Container
                    sx={{
                        bgcolor: '#f0ead6',
                        minHeight: "calc(100vh - 64px)",
                        py: 4, 
                        px: { xs: 2, sm: 3, md: 4 },
                        position: 'relative',
                    }}
                >
                    <Fade in timeout={800}>
                        <Box textAlign="center" mb={6}>
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    mb: 2
                                }}
                            >
                                Get In Touch
                            </Typography>
                            <Typography
                                variant="h5"
                                component="p"
                                sx={{
                                    color: 'rgba(0, 0, 0, 0.9)',
                                    fontWeight: 300,
                                    maxWidth: 600,
                                    mx: 'auto'
                                }}
                            >
                                I'd love to hear from you. Whether you have a question, 
                                collaboration idea, or just want to say hello!
                            </Typography>
                        </Box>
                    </Fade>

                    <Grid container spacing={4} justifyContent="center">
                        {contactMethods.map((method, index) => (
                            <Grid item xs={12} sm={6} md={4} key={method.title}>
                                <Fade in timeout={1000 + index * 200}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            transition: 'all 0.3s ease-in-out',
                                            cursor: 'pointer',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                                '& .contact-icon': {
                                                    transform: 'scale(1.1)',
                                                    color: method.color
                                                }
                                            }
                                        }}
                                        onClick={() => window.open(method.link, '_blank')}
                                    >
                                        <CardContent 
                                            sx={{ 
                                                textAlign: 'center', 
                                                py: 4,
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Box
                                                className="contact-icon"
                                                sx={{
                                                    mb: 2,
                                                    transition: 'all 0.3s ease-in-out',
                                                    color: 'text.secondary'
                                                }}
                                            >
                                                {method.icon}
                                            </Box>
                                            <Typography 
                                                variant="h5" 
                                                component="h3" 
                                                gutterBottom
                                                sx={{ fontWeight: 'bold', color: 'text.primary' }}
                                            >
                                                {method.title}
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                color="text.secondary"
                                                sx={{ mb: 2 }}
                                            >
                                                {method.description}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 1,
                                                    color: method.color,
                                                    fontWeight: 'medium'
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    Connect
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>

                    <Fade in timeout={1600}>
                        <Box 
                            textAlign="center" 
                            mt={8}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                p: 4,
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                gutterBottom
                                sx={{ color: 'white', fontWeight: 'bold' }}
                            >
                                Let's Build Something Amazing Together
                            </Typography>
                            <Typography 
                                variant="body1"
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    maxWidth: 500,
                                    mx: 'auto'
                                }}
                            >
                                I'm always excited to discuss new opportunities, 
                                innovative projects, and creative collaborations.
                            </Typography>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </>
    );
}