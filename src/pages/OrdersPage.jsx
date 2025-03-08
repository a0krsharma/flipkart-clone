import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  styled
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';

// Styled components
const OrderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }
}));

const OrderStatusChip = styled(Chip)(({ theme, status }) => {
  let color = 'default';
  let backgroundColor = theme.palette.grey[300];
  let textColor = theme.palette.text.primary;

  switch (status) {
    case 'delivered':
      color = 'success';
      backgroundColor = theme.palette.success.light;
      textColor = theme.palette.success.dark;
      break;
    case 'shipped':
      color = 'primary';
      backgroundColor = theme.palette.primary.light;
      textColor = theme.palette.primary.dark;
      break;
    case 'processing':
      color = 'info';
      backgroundColor = theme.palette.info.light;
      textColor = theme.palette.info.dark;
      break;
    case 'cancelled':
      color = 'error';
      backgroundColor = theme.palette.error.light;
      textColor = theme.palette.error.dark;
      break;
    default:
      break;
  }

  return {
    backgroundColor,
    color: textColor,
    fontWeight: 500,
    '& .MuiChip-icon': {
      color: textColor,
    }
  };
});

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-10001',
              date: new Date(2023, 9, 15),
              status: 'delivered',
              items: [
                { name: 'iPhone 13 Pro', price: 119900, quantity: 1 }
              ],
              payment: {
                method: 'Credit Card',
                subtotal: 119900,
                shipping: 0,
                tax: 21582,
                total: 141482
              }
            },
            {
              id: 'ORD-10002',
              date: new Date(2023, 9, 10),
              status: 'shipped',
              items: [
                { name: 'Samsung Galaxy S21', price: 69999, quantity: 1 }
              ],
              payment: {
                method: 'UPI',
                subtotal: 69999,
                shipping: 0,
                tax: 12600,
                total: 82599
              }
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (event, newValue) => {
    setFilterStatus(newValue);
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and track your orders
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={filterStatus}
              onChange={handleFilterChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All Orders" value="all" />
              <Tab label="Processing" value="processing" />
              <Tab label="Shipped" value="shipped" />
              <Tab label="Delivered" value="delivered" />
              <Tab label="Cancelled" value="cancelled" />
            </Tabs>
          </Paper>
        </Grid>

        {loading ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Grid>
        ) : filteredOrders.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <ShoppingBag sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No orders found
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {filterStatus === 'all'
                  ? "You haven't placed any orders yet."
                  : `You don't have any ${filterStatus} orders.`}
              </Typography>
              <Button variant="contained" color="primary">
                Continue Shopping
              </Button>
            </Paper>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              {filteredOrders.map((order) => (
                <OrderPaper key={order.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">
                          Order #{order.id}
                        </Typography>
                        <OrderStatusChip
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          status={order.status}
                          size="small"
                        />
                      </Box>
                      <Divider />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Order Date: {order.date.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          ₹{order.payment.total.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </OrderPaper>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default OrdersPage; 