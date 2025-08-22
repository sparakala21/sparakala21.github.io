"use client";
import * as React from 'react';
import { Box, Typography, IconButton, Menu, MenuButton, MenuItem, Dropdown, Sheet } from '@mui/joy';
import { useTheme } from '@mui/joy/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';

const pageRoutes = [
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  {name: 'Blog', path: '/blog'},
  { name: 'Contact', path: '/contact-me' }
];

function NavBar() {
  const theme = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActivePage = (path: string) => pathname === path;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Sheet
      component="nav"
      role="navigation"
      aria-label="Main navigation"
      sx={{
        position: 'static',
        backgroundColor: theme.palette.neutral[50], // magnolia white
        padding: 2,
        height: '128px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: theme.palette.neutral[300], // light magnolia border
      }}
    >
      <Box
        sx={{
          maxWidth: 'xl',
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Logo - Responsive sizing */}
        <Link href="/" aria-label="ReMo homepage">
          <Box sx={{ position: 'relative' }}>
            {/* Desktop Logo */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Image
                src="/kwan.png"
                width={300}
                height={110}
                alt="Kwan"
                priority
              />
            </Box>
            {/* Mobile Logo */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Image
                src="/kwan.png"
                width={200}
                height={73}
                alt="Kwan"
                priority
              />
            </Box>
          </Box>
        </Link>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Dropdown
            open={mobileMenuOpen}
            onOpenChange={(event, isOpen) => {
              setMobileMenuOpen(isOpen);
            }}
          >
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ 
                root: { 
                  variant: 'plain', 
                  color: 'neutral', 
                  size: 'lg',
                  'aria-label': mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu',
                  'aria-expanded': mobileMenuOpen,
                  'aria-controls': 'mobile-navigation-menu'
                } 
              }}
              sx={{ 
                color: theme.palette.primary[500], // steel blue
                '&:hover': {
                  backgroundColor: theme.palette.primary[50], // light steel blue
                }
              }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </MenuButton>
            <Menu 
              id="mobile-navigation-menu"
              placement="bottom-end"
              sx={{
                minWidth: 280,
                '--List-padding': '8px',
                '--ListItem-paddingY': '12px',
                '--ListItem-paddingX': '16px',
                boxShadow: 'lg',
                borderRadius: 'md',
                zIndex: 1300,
                backgroundColor: theme.palette.neutral[50], // magnolia background
              }}
            >
              {pageRoutes.map((page) => (
                <MenuItem 
                  key={page.name}
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    borderRadius: 'sm',
                    margin: '2px 4px',
                    backgroundColor: 'transparent',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: theme.palette.neutral[100], // light magnolia hover
                    }
                  }}
                >
                  <Link 
                    href={page.path} 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit', 
                      width: '100%',
                      display: 'block',
                      position: 'relative'
                    }}
                  >
                    <Typography 
                      level="body-md"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.success[600], // dark purple text
                        position: 'relative',
                        
                        '&::after': isActivePage(page.path) ? {
                          content: '""',
                          position: 'absolute',
                          bottom: '-2px',
                          left: 0,
                          width: '100%',
                          height: '3px',
                          backgroundColor: theme.palette.secondary[500], // apple green accent
                          borderRadius: '2px',
                        } : {},
                      }}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </Box>

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
                  color: theme.palette.success[500], // dark purple text
                  fontFamily: theme.fontFamily.display,
                  fontSize: '16px',
                  fontWeight: 700,
                  borderRadius: 'sm',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: 'transparent',
                  
                  '&:hover': {
                    color: theme.palette.primary[600], // steel blue on hover
                    backgroundColor: theme.palette.neutral[100], // light magnolia background
                  },
                  
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.secondary[500]}`, // apple green focus
                    outlineOffset: '2px',
                  },
                  '&:focus': {
                    outline: 'none',
                  },

                  '&::after': isActivePage(page.path) ? {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '3px',
                    backgroundColor: theme.palette.secondary[500], // apple green accent
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
    </Sheet>
  );
}

export default NavBar;