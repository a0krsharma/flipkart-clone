import { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would send this data to a server
    setOpenSnackbar(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Contact Us
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph>
              Have questions about our products or services? We're here to help!
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: '#2874f0' }} />
                <Box>
                  <Typography variant="subtitle1">
                    Email
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    a0krsharma@gmail.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 2, color: '#2874f0' }} />
                <Box>
                  <Typography variant="subtitle1">
                    Phone
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    +91 7070253050
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 2, color: '#2874f0' }} />
                <Box>
                  <Typography variant="subtitle1">
                    Address
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Chandi, Bihar 803108
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="body2" color="text.secondary">
              Business Hours: Monday - Friday, 9:00 AM - 6:00 PM
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send Us a Message
            </Typography>
            <Typography variant="body1" paragraph>
              Fill out the form below and we'll get back to you as soon as possible.
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{ 
                      mt: 2,
                      backgroundColor: '#2874f0',
                      '&:hover': {
                        backgroundColor: '#1a65d6',
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Find Us
        </Typography>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14399.37835508978!2d85.88746694429426!3d25.614301541548837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed0f73a5555555%3A0xfb7c0c3a2c4c2c2c!2sChandi%2C%20Bihar%20803108!5e0!3m2!1sen!2sin!4v1647677981735!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Paper>
      </Box>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage; 