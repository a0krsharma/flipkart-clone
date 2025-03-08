import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Divider, 
  FormControl, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Slider, 
  TextField, 
  InputAdornment, 
  Button,
  Breadcrumbs,
  Link,
  CircularProgress
} from '@mui/material';
import { Search, FilterList, Clear } from '@mui/icons-material';
import ProductGrid from '../components/product/ProductGrid';
import { getProducts, getProductsByCategory } from '../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('q');
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        let loadedProducts;
        
        if (categoryParam) {
          loadedProducts = await getProductsByCategory(categoryParam);
          setSelectedCategories([categoryParam]);
        } else {
          loadedProducts = await getProducts();
        }
        
        setProducts(loadedProducts);
        setFilteredProducts(loadedProducts);
        
        if (searchParam) {
          setSearchQuery(searchParam);
          filterProducts(loadedProducts, searchParam, priceRange, selectedCategories);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [categoryParam, searchParam]);
  
  const filterProducts = (productsToFilter, search, price, categories) => {
    let result = [...productsToFilter];
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= price[0] && product.price <= price[1]
    );
    
    // Filter by categories
    if (categories.length > 0) {
      result = result.filter(product => 
        categories.includes(product.category)
      );
    }
    
    setFilteredProducts(result);
  };
  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterProducts(products, value, priceRange, selectedCategories);
  };
  
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    filterProducts(products, searchQuery, newValue, selectedCategories);
  };
  
  const handleCategoryChange = (event) => {
    const category = event.target.name;
    const isChecked = event.target.checked;
    
    let newSelectedCategories;
    if (isChecked) {
      newSelectedCategories = [...selectedCategories, category];
    } else {
      newSelectedCategories = selectedCategories.filter(c => c !== category);
    }
    
    setSelectedCategories(newSelectedCategories);
    filterProducts(products, searchQuery, priceRange, newSelectedCategories);
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 2000]);
    setSelectedCategories([]);
    setFilteredProducts(products);
  };
  
  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];
  
  // Get min and max price from products
  const minPrice = products.length > 0 ? Math.min(...products.map(product => product.price)) : 0;
  const maxPrice = products.length > 0 ? Math.max(...products.map(product => product.price)) : 2000;
  
  return (
    <Container sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>
      
      <Grid container spacing={4}>
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Button 
                startIcon={<Clear />} 
                size="small" 
                onClick={handleClearFilters}
                disabled={!searchQuery && priceRange[0] === 0 && priceRange[1] === 2000 && selectedCategories.length === 0}
              >
                Clear All
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Search
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
            
            <Typography variant="subtitle1" gutterBottom>
              Price Range
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body2">
                  ${priceRange[0]}
                </Typography>
                <Typography variant="body2">
                  ${priceRange[1]}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Categories
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                        name={category}
                      />
                    }
                    label={category}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>
        
        {/* Products */}
        <Grid item xs={12} md={9}>
          <ProductGrid 
            products={filteredProducts} 
            title={`Products (${filteredProducts.length})`} 
            loading={loading} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage; 