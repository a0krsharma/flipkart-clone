import { db, storage } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Demo products data
export const demoProducts = [
  // Electronics
  {
    id: 'demo1',
    name: 'Smartphone X Pro',
    description: 'Latest flagship smartphone with 6.7-inch AMOLED display, 108MP camera, and 5000mAh battery.',
    price: 999.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/JOtGhF3.jpg',
    stock: 50,
    rating: 4.8,
    featured: true
  },
  {
    id: 'demo2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and high-resolution audio.',
    price: 249.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/Aj3EtAJ.jpg',
    stock: 75,
    rating: 4.7,
    featured: true
  },
  {
    id: 'demo3',
    name: 'Ultra HD Smart TV 55"',
    description: '55-inch 4K Ultra HD Smart TV with HDR, built-in voice assistant, and streaming apps.',
    price: 699.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/XVZRLuv.jpg',
    stock: 30,
    rating: 4.5,
    featured: true
  },
  {
    id: 'demo4',
    name: 'Laptop Pro 15"',
    description: 'Powerful laptop with 15-inch Retina display, 16GB RAM, 512GB SSD, and dedicated graphics card.',
    price: 1299.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/KYN9nJZ.jpg',
    stock: 25,
    rating: 4.9,
    featured: false
  },
  {
    id: 'demo5',
    name: 'Smartwatch Series 5',
    description: 'Advanced smartwatch with health monitoring, GPS, water resistance, and 3-day battery life.',
    price: 299.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/Yv2Mh5h.jpg',
    stock: 60,
    rating: 4.6,
    featured: false
  },
  {
    id: 'demo6',
    name: 'Wireless Earbuds Pro',
    description: 'True wireless earbuds with active noise cancellation, water resistance, and 24-hour battery life with case.',
    price: 149.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/CtYrXXJ.jpg',
    stock: 100,
    rating: 4.4,
    featured: false
  },
  {
    id: 'demo7',
    name: 'Digital Camera 4K',
    description: 'Professional digital camera with 4K video recording, 24MP sensor, and interchangeable lenses.',
    price: 899.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/ixgnQ8L.jpg',
    stock: 20,
    rating: 4.7,
    featured: false
  },
  {
    id: 'demo8',
    name: 'Gaming Console Pro',
    description: 'Next-generation gaming console with 4K gaming, 1TB storage, and wireless controller.',
    price: 499.99,
    category: 'Electronics',
    imageUrl: 'https://i.imgur.com/TXRjHGf.jpg',
    stock: 15,
    rating: 4.9,
    featured: true
  },
  
  // Fashion - Men's Clothing
  {
    id: 'fashion1',
    name: 'Men\'s Slim Fit Casual Shirt',
    description: 'Comfortable cotton casual shirt with slim fit design, perfect for everyday wear. Available in multiple colors.',
    price: 29.99,
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    imageUrl: 'https://i.imgur.com/JY7aqbQ.jpg',
    stock: 120,
    rating: 4.3,
    featured: true
  },
  {
    id: 'fashion2',
    name: 'Men\'s Denim Jeans',
    description: 'Classic denim jeans with straight fit, made from high-quality durable material for long-lasting comfort.',
    price: 49.99,
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    imageUrl: 'https://i.imgur.com/UHXMvSk.jpg',
    stock: 85,
    rating: 4.5,
    featured: false
  },
  {
    id: 'fashion3',
    name: 'Men\'s Formal Blazer',
    description: 'Elegant formal blazer for professional settings and special occasions. Tailored fit with premium fabric.',
    price: 89.99,
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    imageUrl: 'https://i.imgur.com/Uw5MHBF.jpg',
    stock: 40,
    rating: 4.7,
    featured: true
  },
  {
    id: 'fashion4',
    name: 'Men\'s Sports Shoes',
    description: 'Lightweight and comfortable sports shoes with cushioned insole and durable outsole for athletic activities.',
    price: 59.99,
    category: 'Fashion',
    subcategory: 'Footwear',
    imageUrl: 'https://i.imgur.com/qVVpUQ1.jpg',
    stock: 65,
    rating: 4.4,
    featured: false
  },
  
  // Fashion - Women's Clothing
  {
    id: 'fashion5',
    name: 'Women\'s Floral Maxi Dress',
    description: 'Beautiful floral print maxi dress, perfect for summer outings and casual events. Made from breathable fabric.',
    price: 45.99,
    category: 'Fashion',
    subcategory: 'Women\'s Clothing',
    imageUrl: 'https://i.imgur.com/qKu1bHM.jpg',
    stock: 70,
    rating: 4.6,
    featured: true
  },
  {
    id: 'fashion6',
    name: 'Women\'s High-Waist Jeans',
    description: 'Stylish high-waist jeans with stretch fabric for comfort and perfect fit. Available in multiple washes.',
    price: 54.99,
    category: 'Fashion',
    subcategory: 'Women\'s Clothing',
    imageUrl: 'https://i.imgur.com/5XdJLmD.jpg',
    stock: 90,
    rating: 4.5,
    featured: false
  },
  {
    id: 'fashion7',
    name: 'Women\'s Leather Handbag',
    description: 'Premium leather handbag with spacious compartments and elegant design. Perfect for daily use and special occasions.',
    price: 79.99,
    category: 'Fashion',
    subcategory: 'Accessories',
    imageUrl: 'https://i.imgur.com/Ldt9UXk.jpg',
    stock: 45,
    rating: 4.8,
    featured: true
  },
  {
    id: 'fashion8',
    name: 'Women\'s Block Heel Sandals',
    description: 'Comfortable block heel sandals with ankle strap, perfect for both casual and formal occasions.',
    price: 49.99,
    category: 'Fashion',
    subcategory: 'Footwear',
    imageUrl: 'https://i.imgur.com/Rl7Qs6g.jpg',
    stock: 55,
    rating: 4.3,
    featured: false
  },
  
  // Books - Fiction
  {
    id: 'book1',
    name: 'The Silent Echo',
    description: 'A gripping thriller about a detective solving a series of mysterious disappearances in a small coastal town.',
    price: 14.99,
    category: 'Books',
    subcategory: 'Fiction',
    imageUrl: 'https://i.imgur.com/JGtLWVw.jpg',
    stock: 30,
    rating: 4.7,
    featured: true,
    author: 'Emily Richards'
  },
  {
    id: 'book2',
    name: 'Beyond the Horizon',
    description: 'An epic fantasy adventure set in a world of magic and mythical creatures, following a young hero\'s journey.',
    price: 16.99,
    category: 'Books',
    subcategory: 'Fiction',
    imageUrl: 'https://i.imgur.com/Rl9Lmcx.jpg',
    stock: 25,
    rating: 4.9,
    featured: true,
    author: 'Michael Anderson'
  },
  {
    id: 'book3',
    name: 'Whispers of the Past',
    description: 'A historical romance novel set in 19th century England, exploring love and social challenges of the era.',
    price: 12.99,
    category: 'Books',
    subcategory: 'Fiction',
    imageUrl: 'https://i.imgur.com/Rl9Lmcx.jpg',
    stock: 40,
    rating: 4.5,
    featured: false,
    author: 'Sophia Williams'
  },
  {
    id: 'book4',
    name: 'The Quantum Paradox',
    description: 'A science fiction novel exploring the implications of quantum physics and parallel universes.',
    price: 15.99,
    category: 'Books',
    subcategory: 'Fiction',
    imageUrl: 'https://i.imgur.com/JGtLWVw.jpg',
    stock: 35,
    rating: 4.6,
    featured: false,
    author: 'David Chen'
  },
  
  // Books - Non-Fiction
  {
    id: 'book5',
    name: 'Mindful Living',
    description: 'A practical guide to incorporating mindfulness practices into daily life for improved mental well-being.',
    price: 18.99,
    category: 'Books',
    subcategory: 'Non-Fiction',
    imageUrl: 'https://i.imgur.com/Rl9Lmcx.jpg',
    stock: 50,
    rating: 4.8,
    featured: true,
    author: 'Dr. Sarah Johnson'
  },
  {
    id: 'book6',
    name: 'The Art of Business',
    description: 'Essential strategies and insights for entrepreneurs and business leaders to thrive in today\'s competitive market.',
    price: 22.99,
    category: 'Books',
    subcategory: 'Non-Fiction',
    imageUrl: 'https://i.imgur.com/JGtLWVw.jpg',
    stock: 45,
    rating: 4.7,
    featured: false,
    author: 'Robert Miller'
  },
  {
    id: 'book7',
    name: 'Culinary Journeys',
    description: 'A collection of recipes and stories from around the world, exploring diverse culinary traditions and techniques.',
    price: 24.99,
    category: 'Books',
    subcategory: 'Non-Fiction',
    imageUrl: 'https://i.imgur.com/Rl9Lmcx.jpg',
    stock: 30,
    rating: 4.9,
    featured: true,
    author: 'Chef Maria Garcia'
  },
  {
    id: 'book8',
    name: 'The History of Innovation',
    description: 'An exploration of major technological innovations throughout history and their impact on society.',
    price: 19.99,
    category: 'Books',
    subcategory: 'Non-Fiction',
    imageUrl: 'https://i.imgur.com/JGtLWVw.jpg',
    stock: 25,
    rating: 4.6,
    featured: false,
    author: 'Prof. James Thompson'
  }
];

// Get all products
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // If no products in database, return demo products
    return productsList.length > 0 ? productsList : demoProducts;
  } catch (error) {
    console.error('Error getting products:', error);
    // Return demo products in case of error
    return demoProducts;
  }
};

// Get featured products
export const getFeaturedProducts = async (limit = 4) => {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(
      productsCollection,
      where('featured', '==', true),
      limit(limit)
    );
    const productsSnapshot = await getDocs(q);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // If no featured products in database, return demo featured products
    return productsList.length > 0 
      ? productsList 
      : demoProducts.filter(p => p.featured).slice(0, limit);
  } catch (error) {
    console.error('Error getting featured products:', error);
    // Return demo featured products in case of error
    return demoProducts.filter(p => p.featured).slice(0, limit);
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    // Check if it's a demo product
    const demoProduct = demoProducts.find(p => p.id === id);
    if (demoProduct) return demoProduct;
    
    // Otherwise, get from Firestore
    const productDoc = await getDoc(doc(db, 'products', id));
    if (productDoc.exists()) {
      return {
        id: productDoc.id,
        ...productDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
};

// Add a new product
export const addProduct = async (product, imageFile) => {
  try {
    let imageUrl = '';
    
    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    
    // Add product to Firestore
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      imageUrl: imageUrl || product.imageUrl,
      createdAt: new Date().toISOString()
    });
    
    return {
      id: docRef.id,
      ...product,
      imageUrl: imageUrl || product.imageUrl
    };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id, updates, imageFile) => {
  try {
    let imageUrl = updates.imageUrl;
    
    // Upload new image if provided
    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
      
      // Delete old image if it's not a demo product and has a storage URL
      if (!id.startsWith('demo') && updates.imageUrl && updates.imageUrl.includes('firebasestorage')) {
        try {
          const oldImageRef = ref(storage, updates.imageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
    }
    
    // Update product in Firestore
    await updateDoc(doc(db, 'products', id), {
      ...updates,
      imageUrl,
      updatedAt: new Date().toISOString()
    });
    
    return {
      id,
      ...updates,
      imageUrl
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id, imageUrl) => {
  try {
    // Delete product from Firestore
    await deleteDoc(doc(db, 'products', id));
    
    // Delete image from Storage if it's not a demo product and has a storage URL
    if (!id.startsWith('demo') && imageUrl && imageUrl.includes('firebasestorage')) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('category', '==', category));
    const productsSnapshot = await getDocs(q);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // If no products in database, filter demo products by category
    return productsList.length > 0 
      ? productsList 
      : demoProducts.filter(p => p.category === category);
  } catch (error) {
    console.error('Error getting products by category:', error);
    // Return filtered demo products in case of error
    return demoProducts.filter(p => p.category === category);
  }
}; 