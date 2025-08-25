"use client";
import Image from "next/image";
import { Box, Button, Link, List, ListItem, Stack, Typography } from "@mui/joy";
import { useTheme } from '@mui/joy/styles';

export default function Home() {
  const theme = useTheme();
  
  return (
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
        <Stack 
            direction={{ xs: "column", md: "row" }}  
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={3}
            sx={{ mb: 4 }}
        >
            <Box sx={{ 
                width: '100%', 
                maxWidth: '460px',
                flexShrink: 0
            }}>
                <Image
                    src="/profile.jpg"
                    width={460}
                    height={460}
                    alt="Sravan"
                    style={{ 
                        maxWidth: '100%',
                        height: 'auto',
                        width: 'auto'
                    }}
                />
            </Box>
            
            <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
                <Typography level="h2" sx={{ mt: { xs: 2, md: 12 } }}>
                    Sravan Parakala
                </Typography>

                <Typography level="h3">
                    Full-Stack Developer and hobbyist data scientist
                </Typography>

                <Typography>
                    I am a Software Engineer with a bachelors degree from Rensselaer Polytechnic Institute. I am currently pursuing a Masters in Information Technology and Web Science and will graduate in May 2026.
                </Typography>

                <List sx={{ 
                    listStyleType: 'disc', 
                    marginLeft: { xs: 2, sm: 6 },
                    pl: { xs: 2, sm: 5 }
                }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <Link href="https://new.rcos.io/">
                        RCOS
                        </Link>
                    </ListItem>
                    
                    <ListItem sx={{ display: 'list-item' }}>
                        <Link href="https://gdg.community.dev/gdg-on-campus-rensselaer-polytechnic-institute-troy-united-states/">
                        GDGC RPI
                        </Link>
                    </ListItem>
                      
                    <ListItem sx={{ display: 'list-item' }}>
                        <Link href="https://marketing.remo.app/">
                        ReMo
                        </Link>
                    </ListItem>

                    <ListItem sx={{ display: 'list-item' }}>
                        <Link href="https://www.chess.com/club/rensselaer-chess-club">
                        RPI Chess Club
                        </Link>
                    </ListItem>
                        
                    <ListItem sx={{ display: 'list-item' }}>
                        <Link href="/artist2vec">
                        Artist2Vec
                        </Link>
                    </ListItem>
                </List>
            </Stack>
        </Stack>

        <Typography level="h1">A Little About Me</Typography>
        <Typography level="body-md" sx={{ mb: 4 }}>I grew up mostly on the east coast of the US but I spent 4 years in India. I used to solve Rubiks Cubes Competitively.
          Over the last 6 years I have been learning and playing chess and am now starting to enter tournaments. 
          
        </Typography>


        <Stack 
            direction={{ xs: "column", md: "row" }}  
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={3}
            sx={{ mb: 4 }}
        >
            <Box sx={{ 
                width: '100%', 
                maxWidth: '460px',
                flexShrink: 0
            }}>
                <Image
                    src="/Hiccup/IMG_3073.jpg"
                    width={460}
                    height={460}
                    alt="Michelle"
                    style={{ 
                        maxWidth: '100%',
                        height: 'auto',
                        width: 'auto'
                    }}
                />
            </Box>
            
            <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
                <Typography level="h2" sx={{ mt: { xs: 2, md: 12 } }}>
                    This is Hiccup
                </Typography>

                <Typography>
                    He is my chinchilla and he is now almost 4 years old
                </Typography>

    
                <List sx={{ 
                    listStyleType: 'disc', 
                    marginLeft: { xs: 2, sm: 6 },
                    pl: { xs: 2, sm: 5 }
                }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        He likes applesticks, louis armstrong and he is more social than most chillas
                    </ListItem>
                    
                    <ListItem sx={{ display: 'list-item' }}>
                        <Link href="/hiccup">
                        More on him(WIP)
                        </Link>
                    </ListItem>
                </List>
            </Stack>
        </Stack>

        {/* Contact Me Section */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography level="h1" sx={{ mb: 3 }}>Contact Me</Typography>
          <Typography level="body-md" sx={{ mb: 4 }}>
            Feel free to reach out if you'd like to collaborate on a project, discuss opportunities, or just say hello!
          </Typography>
          
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={3} 
            justifyContent="center"
            alignItems="center"
          >
            <Button 
              variant="solid" 
              size="lg"
              component="a"
              href="mailto:sravanparakala@gmail.com"
              sx={{ 
                backgroundColor: theme.palette.primary[500],
                '&:hover': {
                  backgroundColor: theme.palette.primary[600]
                }
              }}
            >
              Email Me
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
                color: theme.palette.primary[500],
                '&:hover': {
                  backgroundColor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[600]
                }
              }}
            >
              LinkedIn
            </Button>
            
            <Button 
              variant="outlined" 
              size="lg"
              component="a"
              href="https://github.com/sparakala21"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderColor: theme.palette.primary[500],
                color: theme.palette.primary[500],
                '&:hover': {
                  backgroundColor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[600]
                }
              }}
            >
              GitHub
            </Button>
          </Stack>
          
          <Typography level="body-sm" sx={{ mt: 3, color: theme.palette.text.tertiary }}>
            Currently based in Troy, NY
          </Typography>
        </Box>
        
      </Box>

    </Box>
  );
}