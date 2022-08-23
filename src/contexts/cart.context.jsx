import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((prev, curr) => prev + curr.quantity, 0));
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    const cartItemIndex = cartItems.findIndex(cartItem => cartItem.id === productToAdd.id);
    let newCartItems = null;
    if (cartItemIndex !== -1) {
      newCartItems = [
        ...cartItems.slice(0, cartItemIndex),
        {
          ...cartItems[cartItemIndex],
          quantity: cartItems[cartItemIndex].quantity + 1
        },
        ...cartItems.slice(cartItemIndex + 1, cartItems.length)
      ];
    } else {
      newCartItems = [
        ...cartItems,
        {
          ...productToAdd,
          quantity: 1
        }
      ];
    };
    setCartItems(newCartItems);
  };
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};