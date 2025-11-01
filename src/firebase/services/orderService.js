import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config';

const ORDERS_COLLECTION = 'orders';

// Generate order number
const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SSS${year}${month}${day}${random}`;
};

// Calculate order totals
const calculateTotals = (courses) => {
  const subtotal = courses.reduce((sum, course) => sum + (course.price * course.quantity), 0);
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    total: Math.round(total * 100) / 100,
    currency: 'GBP'
  };
};

// Get all orders with pagination and filtering
export const getOrders = async (filters = {}, page = 1, limitCount = 20) => {
  try {
    let q = collection(db, ORDERS_COLLECTION);
    
    // Apply filters
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.customerEmail) {
      q = query(q, where('customer.email', '==', filters.customerEmail));
    }
    
    // Apply sorting
    q = query(q, orderBy('createdAt', 'desc'));
    
    // Apply pagination
    q = query(q, limit(limitCount));
    
    const snapshot = await getDocs(q);
    const orders = [];
    
    snapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: orders,
      pagination: {
        currentPage: page,
        totalItems: orders.length,
        itemsPerPage: limitCount
      }
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      message: 'Error fetching orders',
      error: error.message
    };
  }
};

// Get order by order number
export const getOrderByOrderNumber = async (orderNumber) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('orderNumber', '==', orderNumber)
    );
    
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        success: true,
        data: {
          id: doc.id,
          ...doc.data()
        }
      };
    } else {
      return {
        success: false,
        message: 'Order not found'
      };
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      success: false,
      message: 'Error fetching order',
      error: error.message
    };
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        data: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
    } else {
      return {
        success: false,
        message: 'Order not found'
      };
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      success: false,
      message: 'Error fetching order',
      error: error.message
    };
  }
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    // Generate order number
    const orderNumber = generateOrderNumber();
    
    // Calculate totals
    const orderSummary = calculateTotals(orderData.courses);
    
    // Prepare order data
    const newOrder = {
      ...orderData,
      orderNumber,
      orderSummary,
      status: 'Pending',
      payment: {
        ...orderData.payment,
        status: 'Pending'
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
    
    return {
      success: true,
      message: 'Order created successfully',
      data: {
        id: docRef.id,
        ...newOrder
      }
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      message: 'Error creating order',
      error: error.message
    };
  }
};

// Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: Timestamp.now()
    });
    
    return {
      success: true,
      message: 'Order status updated successfully'
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      message: 'Error updating order status',
      error: error.message
    };
  }
};

// Update payment status
export const updatePaymentStatus = async (orderId, paymentStatus, transactionId = null) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const updateData = {
      'payment.status': paymentStatus,
      updatedAt: Timestamp.now()
    };
    
    if (transactionId) {
      updateData['payment.transactionId'] = transactionId;
    }
    
    if (paymentStatus === 'Completed') {
      updateData['payment.paymentDate'] = Timestamp.now();
    }
    
    await updateDoc(orderRef, updateData);
    
    return {
      success: true,
      message: 'Payment status updated successfully'
    };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return {
      success: false,
      message: 'Error updating payment status',
      error: error.message
    };
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (!orderSnap.exists()) {
      return {
        success: false,
        message: 'Order not found'
      };
    }
    
    const orderData = orderSnap.data();
    
    // Only allow cancellation of pending or confirmed orders
    if (!['Pending', 'Confirmed'].includes(orderData.status)) {
      return {
        success: false,
        message: 'Cannot cancel order in current status'
      };
    }
    
    await updateDoc(orderRef, {
      status: 'Cancelled',
      updatedAt: Timestamp.now()
    });
    
    return {
      success: true,
      message: 'Order cancelled successfully'
    };
  } catch (error) {
    console.error('Error cancelling order:', error);
    return {
      success: false,
      message: 'Error cancelling order',
      error: error.message
    };
  }
};

// Get orders by customer email
export const getOrdersByCustomerEmail = async (customerEmail) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('customer.email', '==', customerEmail),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const orders = [];
    
    snapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: orders
    };
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return {
      success: false,
      message: 'Error fetching customer orders',
      error: error.message
    };
  }
};

// Delete order (Admin only)
export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
    
    return {
      success: true,
      message: 'Order deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting order:', error);
    return {
      success: false,
      message: 'Error deleting order',
      error: error.message
    };
  }
};
