import { Container, Box, Typography, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Login to Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back! Login to access your account and manage your orders.
            </Typography>
          </Box>
          
          <LoginForm />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              bgcolor: '#f5f5f5',
              borderRadius: 2
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              New Customer?
            </Typography>
            <Typography variant="body1" paragraph>
              Create an account with us and you'll be able to:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Check out faster
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Save multiple shipping addresses
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Access your order history
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Track new orders
              </Typography>
              <Typography component="li" variant="body1">
                Save items to your wishlist
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography 
                  variant="button" 
                  sx={{ 
                    color: '#2874f0', 
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  REGISTER NOW →
                </Typography>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage; 