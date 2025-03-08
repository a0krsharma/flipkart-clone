import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { Home, Search } from '@mui/icons-material';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: '120px', fontWeight: 'bold', color: '#2874f0' }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<Home />}
            sx={{ 
              backgroundColor: '#2874f0',
              '&:hover': {
                backgroundColor: '#1a65d6',
              }
            }}
          >
            Back to Home
          </Button>
          
          <Button
            variant="outlined"
            component={Link}
            to="/products"
            startIcon={<Search />}
          >
            Browse Products
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage; 