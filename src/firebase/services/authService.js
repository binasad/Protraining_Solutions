import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from 'firebase/firestore';
import { auth, db } from '../config';

// User registration
export const registerUser = async (email, password, userData) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });
    
    // Store additional user data in Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone || '',
      company: userData.company || '',
      role: 'customer', // Default role
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), userDoc);
    
    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: user,
        userData: userDoc
      }
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      message: getAuthErrorMessage(error.code),
      error: error.message
    };
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};
    
    return {
      success: true,
      message: 'Login successful',
      data: {
        user: user,
        userData: userData
      }
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: getAuthErrorMessage(error.code),
      error: error.message
    };
  }
};

// User logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Logout successful'
    };
  } catch (error) {
    console.error('Error logging out:', error);
    return {
      success: false,
      message: 'Error logging out',
      error: error.message
    };
  }
};

// Password reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error) {
    console.error('Error sending password reset:', error);
    return {
      success: false,
      message: getAuthErrorMessage(error.code),
      error: error.message
    };
  }
};

// Get current user data
export const getCurrentUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      return {
        success: true,
        data: userDoc.data()
      };
    } else {
      return {
        success: false,
        message: 'User data not found'
      };
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return {
      success: false,
      message: 'Error getting user data',
      error: error.message
    };
  }
};

// Update user profile
export const updateUserProfile = async (uid, updateData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date()
    });
    
    return {
      success: true,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      message: 'Error updating profile',
      error: error.message
    };
  }
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    default:
      return 'An error occurred. Please try again';
  }
};

// Admin functions (protected)
export const isAdmin = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'admin';
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Get all users (Admin only)
export const getAllUsers = async () => {
  try {
    // This would typically be an admin-only function
    // You'd need to implement proper authentication and authorization
    const snapshot = await getDocs(collection(db, 'users'));
    const users = [];
    
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      data: users
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      message: 'Error fetching users',
      error: error.message
    };
  }
};
