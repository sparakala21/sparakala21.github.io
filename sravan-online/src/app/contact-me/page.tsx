"use client";

import * as React from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { 
    Container, 
    Typography, 
    Box, 
    Card, 
    CardContent,
    useTheme
} from '@mui/joy';
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
                sx={{
                    bgcolor: 'background.surface',
                    minHeight: "calc(100vh - 64px)",
                    py: 4,
                    px: { xs: 2, sm: 3, md: 4 },
                    position: 'relative',
                    background: 'linear-gradient(135deg, #f0ead6 0%, #e6d7c3 100%)',
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box 
                        sx={{ 
                            textAlign: 'center', 
                            mb: 6,
                            animation: 'fadeIn 0.8s ease-in-out'
                        }}
                    >
                        <Typography
                            level="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' }
                            }}
                        >
                            Get In Touch
                        </Typography>
                        <Typography
                            level="h4"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 300,
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            I'd love to hear from you. Whether you have a question, 
                            collaboration idea, or just want to say hello!
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 4,
                            justifyContent: 'center',
                            alignItems: 'stretch'
                        }}
                    >
                        {contactMethods.map((method, index) => (
                            <Box
                                key={method.title}
                                sx={{
                                    flex: '1 1 300px',
                                    maxWidth: '350px',
                                    minWidth: '280px',
                                    animation: `fadeInUp 1s ease-in-out ${0.2 + index * 0.2}s both`
                                }}
                            >
                                <Card
                                    variant="soft"
                                    sx={{
                                        height: '100%',
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer',
                                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid',
                                        borderColor: 'neutral.200',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: 'lg',
                                            '& .contact-icon': {
                                                transform: 'scale(1.1)',
                                                color: method.color
                                            }
                                        }
                                    }}
                                    onClick={() => {
                                        if (method.link.startsWith('mailto:')) {
                                            window.location.href = method.link;
                                        } else {
                                            window.open(method.link, '_blank');
                                        }
                                    }}
                                >
                                    <CardContent 
                                        sx={{ 
                                            textAlign: 'center', 
                                            py: 4,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
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
                                            level="h3"
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: 'text.primary',
                                                mb: 1
                                            }}
                                        >
                                            {method.title}
                                        </Typography>
                                        <Typography 
                                            level="body-md"
                                            sx={{ 
                                                color: 'text.secondary',
                                                mb: 2 
                                            }}
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
                                                fontWeight: 'md'
                                            }}
                                        >
                                            <Typography level="body-sm">
                                                Connect
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>

                    <Box 
                        sx={{
                            textAlign: 'center',
                            mt: 8,
                            animation: 'fadeIn 1.6s ease-in-out'
                        }}
                    >
                        <Card
                            variant="soft"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                p: 4
                            }}
                        >
                            <Typography 
                                level="h4"
                                sx={{ 
                                    color: 'text.primary', 
                                    fontWeight: 'bold',
                                    mb: 2
                                }}
                            >
                                Let's Build Something Amazing Together
                            </Typography>
                            <Typography 
                                level="body-lg"
                                sx={{ 
                                    color: 'text.secondary',
                                    maxWidth: 500,
                                    mx: 'auto'
                                }}
                            >
                                I'm always excited to discuss new opportunities, 
                                innovative projects, and creative collaborations.
                            </Typography>
                        </Card>
                    </Box>
                </Container>

                {/* CSS-in-JS animations */}
                <style jsx global>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </Box>
        </>
    );
}