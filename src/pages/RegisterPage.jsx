import { Container, Box, Typography, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Create an Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join FlipShop to enjoy a personalized shopping experience and exclusive offers.
            </Typography>
          </Box>
          
          <RegisterForm />
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
              Benefits of Registration
            </Typography>
            <Typography variant="body1" paragraph>
              As a registered FlipShop customer, you'll enjoy:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Faster checkout process
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Order tracking and history
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Personalized recommendations
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Special offers and discounts
              </Typography>
              <Typography component="li" variant="body1">
                Wishlist to save favorite items
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Already have an account?
              </Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
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
                  LOGIN NOW →
                </Typography>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage; 