import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Breadcrumbs, 
  Typography, 
  Box, 
  CircularProgress, 
  Grid, 
  Divider 
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import ProductDetail from '../components/product/ProductDetail';
import ProductGrid from '../components/product/ProductGrid';
import { getProductById, getFeaturedProducts } from '../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        
        // Load related products
        if (productData) {
          setRelatedLoading(true);
          const featured = await getFeaturedProducts(4);
          // Filter out the current product
          const related = featured.filter(p => p.id !== id);
          setRelatedProducts(related);
          setRelatedLoading(false);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);
  
  return (
    <Container sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : product ? (
        <>
          <Breadcrumbs 
            separator={<NavigateNext fontSize="small" />} 
            sx={{ mb: 3 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
            <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
              Products
            </Link>
            <Link 
              to={`/products?category=${product.category}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {product.category}
            </Link>
            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
          
          <ProductDetail product={product} loading={false} />
          
          <Divider sx={{ my: 6 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Related Products
            </Typography>
            <ProductGrid 
              products={relatedProducts} 
              loading={relatedLoading} 
              showPagination={false}
              showSorting={false}
            />
          </Box>
        </>
      ) : (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary">
            Product not found
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link to="/products" style={{ textDecoration: 'none', color: '#2874f0' }}>
              <Typography variant="body1">
                Browse all products
              </Typography>
            </Link>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetailPage; 