import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Chip, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility, 
  CheckCircle, 
  Cancel, 
  Pending 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getProducts, deleteProduct } from '../services/productService';
import { getOrders, updateOrderStatus } from '../services/orderService';

const AdminDashboardPage = () => {
  const { currentUser, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  useEffect(() => {
    const loadData = async () => {
      if (!currentUser || userRole !== 'admin') return;
      
      try {
        setLoading(true);
        if (activeTab === 0) {
          const productsData = await getProducts();
          setProducts(productsData);
        } else {
          const ordersData = await getOrders();
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [activeTab, currentUser, userRole]);

  if (!currentUser || userRole !== 'admin') {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1">
          You must be an admin to view this page.
        </Typography>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(productToDelete.id, productToDelete.imageUrl);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleStatusClick = (order) => {
    setOrderToUpdate(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  };
  
  const handleStatusUpdate = async () => {
    try {
      await updateOrderStatus(orderToUpdate.id, newStatus);
      setOrders(orders.map(o => 
        o.id === orderToUpdate.id ? { ...o, status: newStatus } : o
      ));
      setStatusDialogOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const getStatusChip = (status) => {
    switch (status) {
      case 'pending':
        return <Chip icon={<Pending />} label="Pending" color="warning" size="small" />;
      case 'processing':
        return <Chip icon={<Pending />} label="Processing" color="info" size="small" />;
      case 'shipped':
        return <Chip icon={<CheckCircle />} label="Shipped" color="success" size="small" />;
      case 'delivered':
        return <Chip icon={<CheckCircle />} label="Delivered" color="success" size="small" />;
      case 'cancelled':
        return <Chip icon={<Cancel />} label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };
  
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Products" />
          <Tab label="Orders" />
        </Tabs>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Products Tab */}
          {activeTab === 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Manage Products
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  href="/admin/products/add"
                  sx={{ 
                    backgroundColor: '#2874f0',
                    '&:hover': {
                      backgroundColor: '#1a65d6',
                    }
                  }}
                >
                  Add Product
                </Button>
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Box
                            component="img"
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{ width: 50, height: 50, objectFit: 'contain' }}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            href={`/product/${product.id}`}
                            title="View"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            color="primary" 
                            href={`/admin/products/edit/${product.id}`}
                            title="Edit"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteClick(product)}
                            title="Delete"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* Delete Confirmation Dialog */}
              <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
              >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          
          {/* Orders Tab */}
          {activeTab === 1 && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">
                  Manage Orders
                </Typography>
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id.slice(0, 8)}</TableCell>
                        <TableCell>{order.shippingAddress?.name || 'N/A'}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${order.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                        <TableCell>{getStatusChip(order.status)}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            href={`/admin/orders/${order.id}`}
                            title="View"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleStatusClick(order)}
                            title="Update Status"
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* Status Update Dialog */}
              <Dialog
                open={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
              >
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ mb: 2 }}>
                    Update the status for order #{orderToUpdate?.id.slice(0, 8)}
                  </DialogContentText>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={newStatus}
                      label="Status"
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleStatusUpdate} color="primary">Update</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminDashboardPage; 