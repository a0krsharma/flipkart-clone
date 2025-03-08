import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    return {
      id: orderRef.id,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get all orders
export const getOrders = async () => {
  try {
    const ordersCollection = collection(db, 'orders');
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const ordersSnapshot = await getDocs(q);
    
    return ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Get orders by user ID
export const getOrdersByUser = async (userId) => {
  try {
    const ordersCollection = collection(db, 'orders');
    const q = query(
      ordersCollection, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const ordersSnapshot = await getDocs(q);
    
    return ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    
    if (orderDoc.exists()) {
      return {
        id: orderDoc.id,
        ...orderDoc.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}; 