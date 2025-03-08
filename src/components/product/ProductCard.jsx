import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Rating, 
  Box, 
  Chip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl, rating, stock, featured, category, subcategory, author } = product;
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setOpenSnackbar(true);
  };
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
  return (
    <>
      <Card 
        component={Link} 
        to={`/product/${id}`}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          },
          textDecoration: 'none',
          position: 'relative'
        }}
      >
        {featured && (
          <Chip 
            label="Featured" 
            color="primary" 
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 10, 
              zIndex: 1,
              backgroundColor: '#ff9f00'
            }} 
          />
        )}
        
        {category && (
          <Chip 
            label={category} 
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 50, 
              zIndex: 1,
              backgroundColor: category === 'Fashion' ? '#ff5722' : 
                              category === 'Books' ? '#4caf50' : '#2196f3',
              color: 'white'
            }} 
          />
        )}
        
        <IconButton
          onClick={handleFavoriteToggle}
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={name}
          sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
        />
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap sx={{ color: 'text.primary' }}>
            {name}
          </Typography>
          
          {author && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              by {author}
            </Typography>
          )}
          
          {subcategory && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {subcategory}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              ({rating})
            </Typography>
          </Box>
          
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ${price.toFixed(2)}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
          </Typography>
        </CardContent>
        
        <CardActions>
          <Button 
            variant="contained" 
            startIcon={<ShoppingCart />}
            fullWidth
            onClick={handleAddToCart}
            disabled={stock <= 0}
            sx={{ 
              backgroundColor: '#ff9f00',
              '&:hover': {
                backgroundColor: '#f39700',
              }
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard; 