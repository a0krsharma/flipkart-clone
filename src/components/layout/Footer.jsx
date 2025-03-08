import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#172337',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              ABOUT
            </Typography>
            <Typography 
              variant="body2" 
              component={RouterLink} 
              to="/contact" 
              sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              About Us
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Careers
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              FlipShop Stories
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Press
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              HELP
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Payments
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Shipping
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Cancellation & Returns
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              FAQ
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              POLICY
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Return Policy
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Terms Of Use
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Security
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ display: 'block', mb: 1, color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Privacy
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              CONTACT US
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, color: '#878787' }} />
              <Typography variant="body2" sx={{ color: '#878787' }}>
                a0krsharma@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, color: '#878787' }} />
              <Typography variant="body2" sx={{ color: '#878787' }}>
                +91 7070253050
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: '#878787' }} />
              <Typography variant="body2" sx={{ color: '#878787' }}>
                Chandi, Bihar 803108
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Facebook sx={{ color: '#878787' }} />
              <Twitter sx={{ color: '#878787' }} />
              <Instagram sx={{ color: '#878787' }} />
              <LinkedIn sx={{ color: '#878787' }} />
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ color: '#878787' }}>
            &copy; {new Date().getFullYear()} FlipShop. All Rights Reserved.
          </Typography>
          <Box>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ color: '#878787', mr: 2, textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Sitemap
            </Typography>
            <Typography variant="body2" component={RouterLink} to="#" sx={{ color: '#878787', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Accessibility
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 