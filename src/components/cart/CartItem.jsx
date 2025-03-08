import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  Button, 
  Divider, 
  Paper 
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { id, name, price, imageUrl, quantity, stock } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= stock) {
      setItemQuantity(value);
      updateQuantity(id, value);
    }
  };
  
  const handleIncreaseQuantity = () => {
    if (itemQuantity < stock) {
      const newQuantity = itemQuantity + 1;
      setItemQuantity(newQuantity);
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleDecreaseQuantity = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(id);
  };
  
  return (
    <Paper elevation={0} sx={{ mb: 2, p: 2, border: '1px solid #f0f0f0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component={Link}
          to={`/product/${id}`}
          sx={{
            width: 100,
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            textDecoration: 'none'
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            component={Link}
            to={`/product/${id}`}
            sx={{ textDecoration: 'none', color: 'text.primary' }}
          >
            {name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <IconButton 
              size="small" 
              onClick={handleDecreaseQuantity} 
              disabled={itemQuantity <= 1}
              sx={{ border: '1px solid #ddd' }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              value={itemQuantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: stock, style: { textAlign: 'center' } }}
              sx={{ width: 40, mx: 1 }}
              size="small"
            />
            <IconButton 
              size="small" 
              onClick={handleIncreaseQuantity} 
              disabled={itemQuantity >= stock}
              sx={{ border: '1px solid #ddd' }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary">
              ${(price * itemQuantity).toFixed(2)}
            </Typography>
            <Button
              startIcon={<Delete />}
              onClick={handleRemove}
              color="error"
              size="small"
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CartItem; 