import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize this color
    },
    secondary: {
      main: '#dc004e', // Customize this color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize the font family
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  // Add more customizations as needed
});

export default theme; 