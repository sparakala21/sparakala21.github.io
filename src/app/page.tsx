"use client";
import Image from "next/image";
import { Box, Button, Link, List, ListItem, Stack, Typography, Divider, Chip } from "@mui/joy";
import { useTheme } from '@mui/joy/styles';

export default function Home() {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.success[500]} 0%, ${theme.palette.success[700]} 100%)`,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: theme.palette.neutral[50],
          width: '960px',
          minHeight: '100vh',
          px: { xs: 3, sm: 4, md: 6 },
          py: 6, 
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(0,0,0,0.1)'
        }}
      >
        {/* Hero Section */}
        <Stack 
          direction={{ xs: "column", md: "row" }}  
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={4}
          sx={{ mb: 8 }}
        >
          <Box sx={{ 
            width: '100%', 
            maxWidth: '400px',
            flexShrink: 0
          }}>
            <Image
              src="/profile.jpg"
              width={400}
              height={400}
              alt="Sravan Parakala - Full-Stack Developer"
              priority
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
          
          <Stack direction="column" spacing={3} sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              level="h1" 
              sx={{ 
                mt: { xs: 3, md: 8 },
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              Sravan Parakala
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 8 }} />

        {/* About Me Section */}
        <Box sx={{ mb: 8 }}>
          <Typography level="h2" sx={{ mb: 4, fontWeight: 600 }}>
            A Little About Me
          </Typography>
          
          <Stack spacing={3} sx={{ maxWidth: '700px', mx: 'auto', textAlign: 'left' }}>
            <Typography level="body-lg" sx={{ lineHeight: 1.6 }}>
              I'm currently pursuing my Master's in Information Technology and Web Science (ITWS) 
              with a focus on software engineering. I'm passionate about meeting new people and 
              engaging in meaningful conversations about technology and innovation.
            </Typography>
            
            <Typography level="body-lg" sx={{ lineHeight: 1.6 }}>
              Data science fascinates me, and I love applying it to personal projects that solve 
              real-world problems. Check out my Artist2Vec project below to see how I've combined 
              machine learning with music recommendation systems.
            </Typography>
            
            <Typography level="body-lg" sx={{ lineHeight: 1.6 }}>
              Community building is something I deeply value. I'm an active member of both the 
              Phoenixville Chess Club and RPI Chess Club, and I've been instrumental in growing 
              the developer community at RPI through GDGC@RPI initiatives.
            </Typography>

            <Box sx={{ 
              mt: 3,
              p: 3, 
              borderRadius: '8px', 
              backgroundColor: theme.palette.primary[50],
              border: `1px solid ${theme.palette.primary[200]}`
            }}>
              <Link 
                href="/artist2vec"
                sx={{ 
                  fontSize: 'lg', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                🎵 Artist2Vec Project
              </Link>
              <Typography level="body-sm" sx={{ mt: 1 }}>
                Machine learning project for music recommendation using artist embeddings
              </Typography>
            </Box>

            <Box sx={{ 
              p: 3, 
              borderRadius: '8px', 
              backgroundColor: theme.palette.warning[50],
              border: `1px solid ${theme.palette.warning[200]}`
            }}>
              <Typography level="body-md" sx={{ fontWeight: 600, mb: 1 }}>
                ♟️ Chess & Personal Growth
              </Typography>
              <Typography level="body-sm">
                I'm working on becoming a more mindful chess player and person. 
                Follow my journey on my blog where I share insights about strategic thinking 
                and personal development.
              </Typography>
              <Link 
                href="https://www.chess.com/club/rensselaer-chess-club"
                sx={{ 
                  fontSize: 'sm', 
                  mt: 1,
                  display: 'inline-block',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                RPI Chess Club →
              </Link>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Hiccup Section */}
        <Stack 
          direction={{ xs: "column", md: "row" }}  
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={4}
          sx={{ mb: 8 }}
        >
          <Box sx={{ 
            width: '100%', 
            maxWidth: '400px',
            flexShrink: 0
          }}>
            <Image
              src="/Hiccup/IMG_3073.jpg"
              width={400}
              height={400}
              alt="Hiccup the chinchilla"
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
          
          <Stack direction="column" spacing={3} sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              level="h2" 
              sx={{ 
                mt: { xs: 3, md: 8 },
                fontWeight: 600
              }}
            >
              Meet Hiccup 🐭
            </Typography>

            <Typography level="body-lg" sx={{ lineHeight: 1.6 }}>
              This is my chinchilla Hiccup, who's now almost 4 years old and has quite the personality!
            </Typography>

            <Box sx={{ 
              p: 3, 
              borderRadius: '8px', 
              backgroundColor: theme.palette.neutral[100]
            }}>
              <Typography level="body-md" sx={{ mb: 2, fontWeight: 600 }}>
                Fun Facts About Hiccup:
              </Typography>
              <List sx={{ textAlign: 'left', pl: 2 }}>
                <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                  <Typography level="body-sm">
                    Loves apple sticks and has impeccable taste in jazz (Louis Armstrong is his favorite)
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                  <Typography level="body-sm">
                    More social than most chinchillas – he actually enjoys meeting new people
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                  <Typography level="body-sm">
                    <Link href="/hiccup" sx={{ fontSize: 'sm' }}>
                      Learn more about his adventures (Work in Progress) →
                    </Link>
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ my: 8 }} />

        {/* Contact Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography level="h2" sx={{ mb: 3, fontWeight: 600 }}>
            Let's Connect
          </Typography>
          <Typography level="body-lg" sx={{ mb: 6, lineHeight: 1.6, maxWidth: '600px', mx: 'auto' }}>
            I'm always open to discussing new opportunities, collaborating on interesting projects, 
            or simply having a conversation about technology and innovation. Don't hesitate to reach out!
          </Typography>
          
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={3} 
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Button 
              variant="solid" 
              size="lg"
              component="a"
              href="mailto:sravanparakala@gmail.com"
              sx={{ 
                backgroundColor: theme.palette.primary[600],
                px: 4,
                py: 1.5,
                fontSize: 'md',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.primary[700],
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              📧 Email Me
            </Button>
            
            <Button 
              variant="outlined" 
              size="lg"
              component="a"
              href="https://linkedin.com/in/sravan-parakala"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderColor: theme.palette.primary[500],
                color: theme.palette.primary[600],
                px: 4,
                py: 1.5,
                fontSize: 'md',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[600],
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              💼 LinkedIn
            </Button>
            
            <Button 
              variant="outlined" 
              size="lg"
              component="a"
              href="https://github.com/sparakala21"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderColor: theme.palette.neutral[400],
                color: theme.palette.neutral[700],
                px: 4,
                py: 1.5,
                fontSize: 'md',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.neutral[50],
                  borderColor: theme.palette.neutral[600],
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              🚀 GitHub
            </Button>
          </Stack>
          
          <Typography level="body-sm" sx={{ color: theme.palette.text.tertiary, fontStyle: 'italic' }}>
            📍 Currently based in Troy, NY
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}