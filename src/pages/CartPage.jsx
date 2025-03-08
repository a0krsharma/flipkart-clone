import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Divider, 
  Paper, 
  Breadcrumbs 
} from '@mui/material';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  
  return (
    <Container sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            startIcon={<ArrowBack />}
            sx={{ 
              mt: 2,
              backgroundColor: '#2874f0',
              '&:hover': {
                backgroundColor: '#1a65d6',
              }
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Box>
            
            <Paper elevation={1} sx={{ p: { xs: 2, md: 3 } }}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Paper>
            
            <Box sx={{ mt: 3 }}>
              <Button
                component={Link}
                to="/products"
                startIcon={<ArrowBack />}
                sx={{ color: '#2874f0' }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <CartSummary />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage; 