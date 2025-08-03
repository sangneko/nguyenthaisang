import React, { useState, useEffect, createContext, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Header from './components/Header';
import './App.css';
import './index.css';

export const CartContext = createContext();

function App() {
  const [session, setSession] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const saveCartToDB = useCallback(async (currentCart = cartItems) => {
    if (!session) return;
    try {
      const userId = session.user.id;

      let { data: userCart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      let cartId;
      if (cartError && cartError.code === 'PGRST116') {
        const { data: newCart, error: newCartError } = await supabase
          .from('carts')
          .insert([{ user_id: userId }])
          .select('id')
          .single();
        if (newCartError) throw newCartError;
        cartId = newCart.id;
      } else if (cartError) {
        throw cartError;
      } else {
        cartId = userCart.id;
      }

      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);
      if (deleteError) throw deleteError;

      if (currentCart.length > 0) {
        const itemsToInsert = currentCart.map(item => ({
          cart_id: cartId,
          product_id: item.id,
          quantity: item.quantity,
        }));
        const { error: insertError } = await supabase.from('cart_items').insert(itemsToInsert);
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Lỗi khi lưu giỏ hàng vào DB:', error.message);
    }
  }, [session, cartItems]);

  const loadCartFromDB = useCallback(async () => {
    if (!session) return;
    try {
      const userId = session.user.id;

      let { data: userCart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      let cartId;
      if (cartError && cartError.code === 'PGRST116') {
        setCartItems([]);
        return;
      } else if (cartError) {
        throw cartError;
      } else {
        cartId = userCart.id;
      }

      const { data: dbCartItems, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          quantity,
          products (
            id,
            name,
            price,
            image_url,
            description
          )
        `)
        .eq('cart_id', cartId);

      if (itemsError) throw itemsError;

      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const mergedCart = [...localCart];

      dbCartItems.forEach(dbItem => {
        const existingItemIndex = mergedCart.findIndex(item => item.id === dbItem.products.id);
        if (existingItemIndex > -1) {
          mergedCart[existingItemIndex].quantity = dbItem.quantity;
        } else {
          mergedCart.push({
            id: dbItem.products.id,
            name: dbItem.products.name,
            price: dbItem.products.price,
            image_url: dbItem.products.image_url,
            description: dbItem.products.description,
            quantity: dbItem.quantity,
          });
        }
      });
      setCartItems(mergedCart);
      localStorage.setItem('cart', JSON.stringify(mergedCart));
      await saveCartToDB(mergedCart);

    } catch (error) {
      console.error('Lỗi khi tải giỏ hàng từ DB:', error.message);
    }
  }, [session, saveCartToDB]);


  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(localCart);

    if (session) {
      loadCartFromDB();
    }
  }, [session, loadCartFromDB]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    if (session) {
      saveCartToDB();
    }
  }, [cartItems, session, saveCartToDB]);


  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevItems];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (session) {
      try {
        const { data: userCart, error: cartError } = await supabase
          .from('carts')
          .select('id')
          .eq('user_id', session.user.id)
          .single();

        if (userCart) {
          const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', userCart.id);
          if (error) throw error;
        }
      } catch (error) {
        console.error('Lỗi khi xóa giỏ hàng trong DB:', error.message);
      }
    }
  };


  return (
    <Router>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromDB }}>
        <Header session={session} />
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={!session ? <Auth /> : <p>Bạn đã đăng nhập!</p>} />
            <Route path="/cart" element={<Cart session={session} />} />
            <Route path="/profile" element={<Profile session={session} />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
