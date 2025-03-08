import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Pagination, CircularProgress, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title, loading, showPagination = true, showSorting = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [sortedProducts, setSortedProducts] = useState([]);
  const productsPerPage = 8;
  
  useEffect(() => {
    if (products) {
      let sorted = [...products];
      
      switch (sortBy) {
        case 'priceLow':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'priceHigh':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
        default:
          sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
      
      setSortedProducts(sorted);
    }
  }, [products, sortBy]);
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };
  
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!products || products.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          No products found
        </Typography>
      </Box>
    );
  }
  
  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2">
            {title || 'Products'}
          </Typography>
          
          {showSorting && (
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
        
        <Grid container spacing={3}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        
        {showPagination && sortedProducts.length > productsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(sortedProducts.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductGrid; 