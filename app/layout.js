'use client';

import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Container } from '@mui/material';
import theme from './theme';
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Pantry Management App",
  description: "Keep track of your pantry items",
};

const drawerWidth = 240;

// Separate component for AppBar to handle dynamic styles
const StyledAppBar = () => (
  <AppBar
    position="fixed"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        {metadata.title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <StyledAppBar />
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  {['Home', 'Pantry', 'Add Item', 'Image Upload', 'Recipes'].map((text, index) => (
                    <ListItem button key={text} component={Link} href={index === 0 ? '/' : `/${text.toLowerCase().replace(' ', '-')}`}>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                  {metadata.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {metadata.description}
                </Typography>
                {children}
              </Container>
            </Box>
          </Box>
          <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Pantry App
              </Typography>
            </Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
