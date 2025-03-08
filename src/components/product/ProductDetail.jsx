import { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Rating, 
  Divider, 
  TextField, 
  Chip, 
  Paper,
  Tabs,
  Tab,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  FavoriteBorder, 
  LocalShipping, 
  AssignmentReturn, 
  Security, 
  Add, 
  Remove,
  Book,
  Person,
  Category
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const ProductDetail = ({ product, loading }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!product) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Product not found
        </Typography>
      </Box>
    );
  }
  
  const { 
    name, 
    description, 
    price, 
    imageUrl, 
    rating, 
    stock, 
    category, 
    subcategory, 
    author 
  } = product;
  
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= stock) {
      setQuantity(value);
    }
  };
  
  const handleIncreaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setOpenSnackbar(true);
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Box
              component="img"
              src={imageUrl}
              alt={name}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'contain',
                mb: 2
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Box
                component="img"
                src={imageUrl}
                alt={`${name} thumbnail 1`}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                  border: '2px solid #2874f0',
                  borderRadius: 1,
                  cursor: 'pointer'
                }}
              />
              <Box
                component="img"
                src={imageUrl}
                alt={`${name} thumbnail 2`}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  cursor: 'pointer'
                }}
              />
              <Box
                component="img"
                src={imageUrl}
                alt={`${name} thumbnail 3`}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  cursor: 'pointer'
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {name}
              </Typography>
              <IconButton onClick={handleFavoriteToggle} color={isFavorite ? 'error' : 'default'}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            
            {category && (
              <Chip 
                label={category} 
                color={
                  category === 'Fashion' ? 'warning' : 
                  category === 'Books' ? 'success' : 'primary'
                }
                sx={{ mb: 2 }}
              />
            )}
            
            {subcategory && (
              <Chip 
                label={subcategory} 
                variant="outlined"
                sx={{ ml: 1, mb: 2 }}
              />
            )}
            
            {author && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1" color="text.secondary">
                  Author: <strong>{author}</strong>
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({rating} rating)
              </Typography>
            </Box>
            
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
              ${price.toFixed(2)}
            </Typography>
            
            <Typography variant="body1" color={stock > 0 ? 'success.main' : 'error.main'} sx={{ mb: 3 }}>
              {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <IconButton 
                size="small" 
                onClick={handleDecreaseQuantity} 
                disabled={quantity <= 1}
                sx={{ border: '1px solid #ddd' }}
              >
                <Remove fontSize="small" />
              </IconButton>
              <TextField
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: stock, style: { textAlign: 'center' } }}
                sx={{ width: 60, mx: 1 }}
                size="small"
              />
              <IconButton 
                size="small" 
                onClick={handleIncreaseQuantity} 
                disabled={quantity >= stock}
                sx={{ border: '1px solid #ddd' }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={stock <= 0}
                fullWidth
                sx={{ 
                  py: 1.5,
                  backgroundColor: '#ff9f00',
                  '&:hover': {
                    backgroundColor: '#f39700',
                  }
                }}
              >
                ADD TO CART
              </Button>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ 
                  py: 1.5,
                  backgroundColor: '#fb641b',
                  '&:hover': {
                    backgroundColor: '#e85d19',
                  }
                }}
              >
                BUY NOW
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Delivery Options
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalShipping sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Free delivery available
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AssignmentReturn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  30-day return policy
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Security sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Secure payment
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6 }}>
        <Paper elevation={1}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <Typography variant="body1">
                {description}
              </Typography>
            )}
            
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Product Specifications
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <List>
                      <ListItem divider>
                        <ListItemText 
                          primary="Category" 
                          secondary={category || 'N/A'} 
                        />
                      </ListItem>
                      
                      {subcategory && (
                        <ListItem divider>
                          <ListItemText 
                            primary="Subcategory" 
                            secondary={subcategory} 
                          />
                        </ListItem>
                      )}
                      
                      {author && (
                        <ListItem divider>
                          <ListItemText 
                            primary="Author" 
                            secondary={author} 
                          />
                        </ListItem>
                      )}
                      
                      <ListItem divider>
                        <ListItemText 
                          primary="Brand" 
                          secondary="FlipShop" 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <List>
                      <ListItem divider>
                        <ListItemText 
                          primary="Model" 
                          secondary={name} 
                        />
                      </ListItem>
                      
                      <ListItem divider>
                        <ListItemText 
                          primary="Warranty" 
                          secondary="1 Year Manufacturer Warranty" 
                        />
                      </ListItem>
                      
                      <ListItem divider>
                        <ListItemText 
                          primary="In The Box" 
                          secondary={`${name}, User Manual, Warranty Card`} 
                        />
                      </ListItem>
                      
                      {category === 'Fashion' && (
                        <ListItem divider>
                          <ListItemText 
                            primary="Care Instructions" 
                            secondary="Machine wash or dry clean as per tag instructions" 
                          />
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Customer Reviews
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>
                    {rating}
                  </Typography>
                  <Box>
                    <Rating value={rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      Based on customer reviews
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No reviews yet. Be the first to review this product!
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {name} added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail; 