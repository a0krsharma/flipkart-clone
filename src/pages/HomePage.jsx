import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Skeleton,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab
} from '@mui/material';
import { ArrowForward, LocalShipping, Security, AssignmentReturn, Payment } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import ProductCard from '../components/product/ProductCard';
import { getFeaturedProducts, getProductsByCategory } from '../services/productService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [fashionProducts, setFashionProducts] = useState([]);
  const [bookProducts, setBookProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryTab, setCategoryTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Load featured products
        const featured = await getFeaturedProducts(8);
        setFeaturedProducts(featured);
        
        // Load fashion products
        const fashion = await getProductsByCategory('Fashion');
        setFashionProducts(fashion);
        
        // Load book products
        const books = await getProductsByCategory('Books');
        setBookProducts(books);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const handleCategoryTabChange = (event, newValue) => {
    setCategoryTab(newValue);
  };
  
  const banners = [
    {
      id: 1,
      title: 'New Arrivals',
      description: 'Check out our latest products with amazing deals',
      image: 'https://i.imgur.com/Uw5MHBF.jpg',
      buttonText: 'Shop Now',
      link: '/products'
    },
    {
      id: 2,
      title: 'Fashion Sale',
      description: 'Up to 50% off on selected fashion items',
      image: 'https://i.imgur.com/qKu1bHM.jpg',
      buttonText: 'View Offers',
      link: '/products?category=Fashion'
    },
    {
      id: 3,
      title: 'Book Festival',
      description: 'Discover bestselling books at special prices',
      image: 'https://i.imgur.com/JGtLWVw.jpg',
      buttonText: 'Explore',
      link: '/products?category=Books'
    }
  ];
  
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      image: 'https://i.imgur.com/JOtGhF3.jpg',
      link: '/products?category=Electronics'
    },
    {
      id: 2,
      name: 'Fashion',
      image: 'https://i.imgur.com/JY7aqbQ.jpg',
      link: '/products?category=Fashion'
    },
    {
      id: 3,
      name: 'Books',
      image: 'https://i.imgur.com/Rl9Lmcx.jpg',
      link: '/products?category=Books'
    },
    {
      id: 4,
      name: 'All Products',
      image: 'https://i.imgur.com/TXRjHGf.jpg',
      link: '/products'
    }
  ];
  
  return (
    <Box>
      {/* Hero Banner Carousel */}
      <Carousel
        animation="slide"
        interval={5000}
        navButtonsAlwaysVisible={!isMobile}
        indicators={true}
        height={isMobile ? 300 : 400}
      >
        {banners.map((banner) => (
          <Paper
            key={banner.id}
            sx={{
              position: 'relative',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Container>
              <Box sx={{ color: 'white', maxWidth: 500, p: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                  {banner.title}
                </Typography>
                <Typography variant="h6" paragraph>
                  {banner.description}
                </Typography>
                <Button
                  component={Link}
                  to={banner.link}
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 2,
                    backgroundColor: '#fb641b',
                    '&:hover': {
                      backgroundColor: '#e85d19',
                    }
                  }}
                >
                  {banner.buttonText}
                </Button>
              </Box>
            </Container>
          </Paper>
        ))}
      </Carousel>
      
      {/* Categories Section */}
      <Container sx={{ mt: 6, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2">
            Shop by Category
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            endIcon={<ArrowForward />}
            sx={{ color: '#2874f0' }}
          >
            View All
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={6} sm={3}>
              <Card 
                component={Link} 
                to={category.link}
                sx={{ 
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height={150}
                  image={category.image}
                  alt={category.name}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Featured Products Section */}
      <Box sx={{ bgcolor: '#f1f3f6', py: 6 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2">
              Featured Products
            </Typography>
            <Button 
              component={Link} 
              to="/products" 
              endIcon={<ArrowForward />}
              sx={{ color: '#2874f0' }}
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {loading ? (
              // Skeleton loading
              Array.from(new Array(4)).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                  </Paper>
                </Grid>
              ))
            ) : (
              // Actual products
              featuredProducts.slice(0, 4).map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
      
      {/* Category Tabs Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Browse by Category
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={categoryTab} 
            onChange={handleCategoryTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Electronics" />
            <Tab label="Fashion" />
            <Tab label="Books" />
          </Tabs>
        </Box>
        
        {/* Electronics Tab */}
        {categoryTab === 0 && (
          <Grid container spacing={3}>
            {loading ? (
              Array.from(new Array(4)).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                  </Paper>
                </Grid>
              ))
            ) : (
              featuredProducts
                .filter(p => p.category === 'Electronics')
                .slice(0, 4)
                .map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))
            )}
            <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/products?category=Electronics" 
                variant="outlined" 
                endIcon={<ArrowForward />}
                sx={{ color: '#2874f0', borderColor: '#2874f0' }}
              >
                View All Electronics
              </Button>
            </Grid>
          </Grid>
        )}
        
        {/* Fashion Tab */}
        {categoryTab === 1 && (
          <Grid container spacing={3}>
            {loading ? (
              Array.from(new Array(4)).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                  </Paper>
                </Grid>
              ))
            ) : (
              fashionProducts.slice(0, 4).map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
            <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/products?category=Fashion" 
                variant="outlined" 
                endIcon={<ArrowForward />}
                sx={{ color: '#2874f0', borderColor: '#2874f0' }}
              >
                View All Fashion
              </Button>
            </Grid>
          </Grid>
        )}
        
        {/* Books Tab */}
        {categoryTab === 2 && (
          <Grid container spacing={3}>
            {loading ? (
              Array.from(new Array(4)).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                  </Paper>
                </Grid>
              ))
            ) : (
              bookProducts.slice(0, 4).map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
            <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/products?category=Books" 
                variant="outlined" 
                endIcon={<ArrowForward />}
                sx={{ color: '#2874f0', borderColor: '#2874f0' }}
              >
                View All Books
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
      
      {/* Promotional Banner */}
      <Box
        sx={{
          py: 6,
          backgroundImage: 'linear-gradient(to right, #2874f0, #5d8ff0)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Special Offer
          </Typography>
          <Typography variant="h6" gutterBottom>
            Get 10% off on your first purchase
          </Typography>
          <Typography variant="body1" paragraph>
            Use code WELCOME10 at checkout
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            sx={{ 
              mt: 2,
              bgcolor: 'white',
              color: '#2874f0',
              '&:hover': {
                bgcolor: '#f5f5f5',
              }
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <LocalShipping sx={{ fontSize: 50, color: '#2874f0', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Free Shipping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                On orders over $50
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <AssignmentReturn sx={{ fontSize: 50, color: '#2874f0', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Easy Returns
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30-day return policy
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Security sx={{ fontSize: 50, color: '#2874f0', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Secure Shopping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                100% secure payment
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Payment sx={{ fontSize: 50, color: '#2874f0', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Multiple Payment Options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Credit/Debit cards, PayPal
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* New Arrivals Section */}
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2">
            New Arrivals
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            endIcon={<ArrowForward />}
            sx={{ color: '#2874f0' }}
          >
            View All
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {loading ? (
            // Skeleton loading
            Array.from(new Array(4)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                </Paper>
              </Grid>
            ))
          ) : (
            // Actual products
            featuredProducts.slice(4, 8).map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage; 