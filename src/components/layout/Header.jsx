import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  InputBase, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ShoppingCart, 
  Search, 
  AccountCircle, 
  Menu as MenuIcon, 
  Home, 
  Category, 
  Dashboard, 
  ExitToApp, 
  Login,
  ContactSupport
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

// Styled search component
const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const { currentUser, logout, userRole } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {currentUser ? (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>Profile</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/orders'); }}>My Orders</MenuItem>
          {userRole === 'admin' && (
            <MenuItem onClick={() => { handleMenuClose(); navigate('/admin'); }}>Admin Dashboard</MenuItem>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>Login</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/register'); }}>Register</MenuItem>
        </>
      )}
    </Menu>
  );
  
  const mobileMenuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Category />, path: '/products' },
    { text: 'Contact Us', icon: <ContactSupport />, path: '/contact' },
    { text: 'Cart', icon: <ShoppingCart />, path: '/cart' },
    ...(currentUser ? [
      { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
      { text: 'My Orders', icon: <ShoppingCart />, path: '/orders' },
      ...(userRole === 'admin' ? [{ text: 'Admin Dashboard', icon: <Dashboard />, path: '/admin' }] : []),
      { text: 'Logout', icon: <ExitToApp />, onClick: handleLogout }
    ] : [
      { text: 'Login', icon: <Login />, path: '/login' }
    ])
  ];
  
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FlipShop
          </Typography>
        </ListItem>
        <Divider />
        {mobileMenuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else {
                navigate(item.path);
              }
              setMobileMenuOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2874f0' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            FlipShop
          </Typography>
          
          <SearchBox>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          </SearchBox>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/products">
                Products
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact Us
              </Button>
            </Box>
          )}
          
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size="large"
              aria-label="show cart items"
              color="inherit"
              component={Link}
              to="/cart"
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        {drawer}
      </Drawer>
      
      {renderMenu}
    </>
  );
};

export default Header; 