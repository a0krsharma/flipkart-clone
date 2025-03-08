import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  Paper, 
  TextField, 
  InputAdornment, 
  IconButton 
} from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartSummary = () => {
  const { cartItems, totalPrice } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const shippingFee = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.07; // 7% tax
  const finalTotal = totalPrice + shippingFee + tax - discount;
  
  const handleCouponApply = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discountAmount = totalPrice * 0.1; // 10% discount
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
    }
  };
  
  const handleCheckout = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/cart', message: 'Please login to continue with checkout' } });
    }
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
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
            {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">
            Tax:
          </Typography>
          <Typography variant="body1">
            ${tax.toFixed(2)}
          </Typography>
        </Box>
        
        {discount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" color="success.main">
              Discount:
            </Typography>
            <Typography variant="body1" color="success.main">
              -${discount.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalOffer fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  size="small" 
                  onClick={handleCouponApply}
                  disabled={!couponCode}
                >
                  Apply
                </Button>
              </InputAdornment>
            )
          }}
        />
        <Typography variant="caption" color="text.secondary">
          Try code "WELCOME10" for 10% off
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          Total:
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          ${finalTotal.toFixed(2)}
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        sx={{ 
          py: 1.5,
          backgroundColor: '#fb641b',
          '&:hover': {
            backgroundColor: '#e85d19',
          }
        }}
      >
        PROCEED TO CHECKOUT
      </Button>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          • Free shipping on orders over $50
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          • 30-day easy returns
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Secure checkout
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartSummary; 