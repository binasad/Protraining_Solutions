import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  isOnline: boolean;
  image: string;
  badge?: string;
}

interface CartItem extends Course {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  updateQuantity: (courseId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getVAT: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course: Course) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === course.id);
      
      if (existingItem) {
        // If course already exists, increase quantity
        return prevItems.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If course doesn't exist, add it with quantity 1
        return [...prevItems, { ...course, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (courseId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSubtotal = () => {
    return getTotalPrice();
  };

  const getVAT = () => {
    return Math.round(getSubtotal() * 0.20); // 20% VAT
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getSubtotal,
    getVAT,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
