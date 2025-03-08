import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Divider, 
  Radio, 
  RadioGroup, 
  FormControl, 
  FormLabel,
  Alert,
  Breadcrumbs
} from '@mui/material';
import { 
  ShoppingCart, 
  Person, 
  LocalShipping, 
  Payment, 
  CheckCircle, 
  NavigateNext 
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

const steps = ['Cart Review', 'Shipping Information', 'Payment Method', 'Order Confirmation'];

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [saveInfo, setSaveInfo] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  
  // Redirect if cart is empty
  if (cartItems.length === 0 && !orderComplete) {
    return navigate('/cart');
  }
  
  const handleNext = () => {
    if (activeStep === 0) {
      // Validate cart
      if (cartItems.length === 0) {
        setError('Your cart is empty');
        return;
      }
      setError('');
    } else if (activeStep === 1) {
      // Validate shipping info
      const { firstName, lastName, address, city, state, zipCode, country, phone } = shippingInfo;
      if (!firstName || !lastName || !address || !city || !state || !zipCode || !country) {
        setError('Please fill in all required fields');
        return;
      }
      setError('');
    } else if (activeStep === 2) {
      // Process order
      handlePlaceOrder();
      return;
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePlaceOrder = async () => {
    try {
      setError('');
      
      // Create order object
      const orderData = {
        userId: currentUser?.uid || 'guest',
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        shippingAddress: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
          phone: shippingInfo.phone
        },
        paymentMethod,
        totalAmount: totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Submit order
      const order = await createOrder(orderData);
      setOrderId(order.id);
      setOrderComplete(true);
      clearCart();
      setActiveStep(3);
    } catch (error) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', error);
    }
  };
  
  const renderCartReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      {cartItems.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
          <Box
            component="img"
            src={item.imageUrl}
            alt={item.name}
            sx={{ width: 60, height: 60, objectFit: 'contain', mr: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Qty: {item.quantity}
            </Typography>
          </Box>
          <Typography variant="subtitle1">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      ))}
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1">
          Subtotal:
        </Typography>
        <Typography variant="body1">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1">
          Shipping:
        </Typography>
        <Typography variant="body1">
          {totalPrice > 50 ? 'Free' : '$5.99'}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1">
          Tax (7%):
        </Typography>
        <Typography variant="body1">
          ${(totalPrice * 0.07).toFixed(2)}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Total:
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          ${(totalPrice + (totalPrice > 50 ? 0 : 5.99) + (totalPrice * 0.07)).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
  
  const renderShippingForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            variant="outlined"
            value={shippingInfo.firstName}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={shippingInfo.lastName}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            variant="outlined"
            value={shippingInfo.city}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="outlined"
            value={shippingInfo.state}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zipCode"
            name="zipCode"
            label="Zip / Postal Code"
            fullWidth
            variant="outlined"
            value={shippingInfo.zipCode}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            variant="outlined"
            value={shippingInfo.country}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={shippingInfo.phone}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox 
                color="primary" 
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
              />
            }
            label="Save this information for next time"
          />
        </Grid>
      </Grid>
    </Box>
  );
  
  const renderPaymentForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
            <FormControlLabel 
              value="creditCard" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1">Credit/Debit Card</Typography>
                  <Box component="img" src="https://source.unsplash.com/random/60x30/?creditcard" alt="Credit Card" sx={{ ml: 2, height: 20 }} />
                </Box>
              } 
            />
            {paymentMethod === 'creditCard' && (
              <Box sx={{ ml: 4, mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  This is a demo checkout. No actual payment will be processed.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      variant="outlined"
                      placeholder="1234 5678 9012 3456"
                      size="small"
                      defaultValue="4111 1111 1111 1111"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      variant="outlined"
                      placeholder="MM/YY"
                      size="small"
                      defaultValue="12/25"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      variant="outlined"
                      placeholder="123"
                      size="small"
                      defaultValue="123"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
          
          <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
            <FormControlLabel 
              value="paypal" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1">PayPal</Typography>
                  <Box component="img" src="https://source.unsplash.com/random/60x30/?paypal" alt="PayPal" sx={{ ml: 2, height: 20 }} />
                </Box>
              } 
            />
          </Paper>
          
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormControlLabel 
              value="cashOnDelivery" 
              control={<Radio />} 
              label="Cash on Delivery" 
            />
          </Paper>
        </RadioGroup>
      </FormControl>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        By clicking "Place Order", you agree to our Terms of Service and Privacy Policy.
      </Typography>
    </Box>
  );
  
  const renderOrderConfirmation = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Thank You For Your Order!
      </Typography>
      <Typography variant="body1" paragraph>
        Your order has been placed successfully.
      </Typography>
      <Typography variant="body1" paragraph>
        Order ID: <strong>{orderId}</strong>
      </Typography>
      <Typography variant="body1" paragraph>
        We've sent a confirmation email with all the details.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{ 
            mr: 2,
            backgroundColor: '#2874f0',
            '&:hover': {
              backgroundColor: '#1a65d6',
            }
          }}
        >
          Continue Shopping
        </Button>
        {currentUser && (
          <Button
            variant="outlined"
            component={Link}
            to="/orders"
          >
            View My Orders
          </Button>
        )}
      </Box>
    </Box>
  );
  
  return (
    <Container sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          Cart
        </Link>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            {activeStep === 0 && renderCartReview()}
            {activeStep === 1 && renderShippingForm()}
            {activeStep === 2 && renderPaymentForm()}
            {activeStep === 3 && renderOrderConfirmation()}
            
            {activeStep < 3 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ 
                    backgroundColor: activeStep === 2 ? '#fb641b' : '#2874f0',
                    '&:hover': {
                      backgroundColor: activeStep === 2 ? '#e85d19' : '#1a65d6',
                    }
                  }}
                >
                  {activeStep === 2 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Items ({cartItems.reduce((total, item) => total + item.quantity, 0)}):
                </Typography>
                <Typography variant="body1">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Shipping:
                </Typography>
                <Typography variant="body1">
                  {totalPrice > 50 ? 'Free' : '$5.99'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Tax (7%):
                </Typography>
                <Typography variant="body1">
                  ${(totalPrice * 0.07).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">
                Total:
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ${(totalPrice + (totalPrice > 50 ? 0 : 5.99) + (totalPrice * 0.07)).toFixed(2)}
              </Typography>
            </Box>
            
            {activeStep < 3 && (
              <Button
                variant="contained"
                fullWidth
                onClick={handleNext}
                sx={{ 
                  py: 1.5,
                  backgroundColor: activeStep === 2 ? '#fb641b' : '#2874f0',
                  '&:hover': {
                    backgroundColor: activeStep === 2 ? '#e85d19' : '#1a65d6',
                  }
                }}
              >
                {activeStep === 2 ? 'PLACE ORDER' : 'CONTINUE'}
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage; 