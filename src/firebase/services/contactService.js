import { 
  collection, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config';

const CONTACTS_COLLECTION = 'contacts';
const QUOTES_COLLECTION = 'quotes';

// Submit contact form
export const submitContactForm = async (contactData) => {
  try {
    const contactSubmission = {
      ...contactData,
      type: 'contact',
      submittedAt: Timestamp.now(),
      status: 'new'
    };
    
    const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), contactSubmission);
    
    // In a real app, you'd also send an email here
    // For now, we'll just store it in Firestore
    
    return {
      success: true,
      message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
      data: {
        id: docRef.id,
        ...contactSubmission
      }
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Error submitting contact form. Please try again later.',
      error: error.message
    };
  }
};

// Submit quote request
export const submitQuoteRequest = async (quoteData) => {
  try {
    const quoteRequest = {
      ...quoteData,
      type: 'quote',
      submittedAt: Timestamp.now(),
      status: 'pending',
      estimatedResponseTime: '48 hours'
    };
    
    const docRef = await addDoc(collection(db, QUOTES_COLLECTION), quoteRequest);
    
    // In a real app, you'd also send an email here
    // For now, we'll just store it in Firestore
    
    return {
      success: true,
      message: 'Quote request submitted successfully. We will provide you with a detailed quote within 48 hours.',
      data: {
        id: docRef.id,
        ...quoteRequest
      }
    };
  } catch (error) {
    console.error('Error submitting quote request:', error);
    return {
      success: false,
      message: 'Error submitting quote request. Please try again later.',
      error: error.message
    };
  }
};

// Get contact submissions (Admin only)
export const getContactSubmissions = async () => {
  try {
    // This would typically be an admin-only function
    // You'd need to implement proper authentication and authorization
    const snapshot = await getDocs(collection(db, CONTACTS_COLLECTION));
    const contacts = [];
    
    snapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: contacts
    };
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return {
      success: false,
      message: 'Error fetching contact submissions',
      error: error.message
    };
  }
};

// Get quote requests (Admin only)
export const getQuoteRequests = async () => {
  try {
    // This would typically be an admin-only function
    // You'd need to implement proper authentication and authorization
    const snapshot = await getDocs(collection(db, QUOTES_COLLECTION));
    const quotes = [];
    
    snapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: quotes
    };
  } catch (error) {
    console.error('Error fetching quote requests:', error);
    return {
      success: false,
      message: 'Error fetching quote requests',
      error: error.message
    };
  }
};
