"use client";
import * as React from 'react';
import { useTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Container from '@mui/joy/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const pageRoutes = [
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  {name: 'Blog', path: '/blog'},
  { name: 'Contact', path: '/contact-me' }
];

function ResponsiveAppBar() {
  const theme = useTheme();
  const pathname = usePathname();

  const isActivePage = (path: string) => pathname === path;

  return (
    <Sheet
      component="header"
      sx={{
        position: 'static',
        backgroundColor: '#2C2C2C',
        padding: 0,
        boxShadow: 'sm',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 64,
            px: 2,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src='/kwan.png'
              width={196}
              height={220}
              alt=""
            />
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <Dropdown>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ 
                  root: { 
                    variant: 'plain', 
                    color: 'neutral',
                    size: 'lg',
                    sx: { color: 'white' }
                  } 
                }}
              >
                <MenuIcon />
              </MenuButton>
              <Menu
                placement="bottom-end"
                sx={{
                  minWidth: 180,
                }}
              >
                {pageRoutes.map((page) => (
                  <MenuItem key={page.name}>
                    <Link 
                      href={page.path} 
                      style={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        width: '100%'
                      }}
                    >
                      <Typography level="body-md">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Dropdown>
          </Box>

          {/* Mobile Logo Text */}
          <Typography
            level="h4"
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Desktop Navigation */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 0.5, 
              flexGrow: 1, 
              justifyContent: 'flex-end' 
            }}
            role="menubar"
          >
            {pageRoutes.map((page) => (
              <Link 
                key={page.name} 
                href={page.path} 
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  level="h3"
                  role="menuitem"
                  tabIndex={0}
                  sx={{
                    py: 1.5,
                    px: 2,
                    color: 'white',
                    fontFamily: theme.fontFamily.display,
                    fontSize: '16px',
                    fontWeight: 700,
                    borderRadius: 'sm',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    position: 'relative',
                    backgroundColor: 'transparent',
                    
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary[500]}`,
                      outlineOffset: '2px',
                    },
                    '&:focus': {
                      outline: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },

                    '&::after': isActivePage(page.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '3px',
                      backgroundColor: theme.palette.primary[600],
                      borderRadius: '2px',
                    } : {},
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Sheet>
  );
}

export default ResponsiveAppBar;