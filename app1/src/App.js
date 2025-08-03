import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Header from './components/Header';
import './App.css'; // File CSS cơ bản
import './index.css'; // File CSS cơ bản

// Tạo Context cho giỏ hàng
export const CartContext = createContext();

function App() {
  const [session, setSession] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng cục bộ

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Tải giỏ hàng từ localStorage khi khởi tạo ứng dụng
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(localCart);
  }, []);

  // --- Logic quản lý giỏ hàng ---

  // Lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    if (session) {
      saveCartToDB(); // Lưu giỏ hàng vào DB khi có session
    }
  }, [cartItems]); //eslint-disable-line react-hooks/exhaustive-deps


  // Load giỏ hàng từ DB (khi đăng nhập hoặc refresh)
  const loadCartFromDB = async () => {
    if (!session) return;
    try {
      const { data: userCart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      let cartId;
      if (cartError && cartError.code === 'PGRST116') { // No rows found
        // Nếu chưa có giỏ hàng, tạo mới
        const { data: newCart, error: newCartError } = await supabase
          .from('carts')
          .insert([{ user_id: session.user.id }])
          .select('id')
          .single();
        if (newCartError) throw newCartError;
        cartId = newCart.id;
      } else if (cartError) {
        throw cartError;
      } else {
        cartId = userCart.id;
      }

      // Lấy các mặt hàng trong giỏ hàng
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

      // Hợp nhất giỏ hàng từ DB và giỏ hàng cục bộ
      const mergedCart = [...cartItems]; // Giỏ hàng từ localStorage
      dbCartItems.forEach(dbItem => {
        const existingItemIndex = mergedCart.findIndex(item => item.id === dbItem.products.id);
        if (existingItemIndex > -1) {
          // Cập nhật số lượng nếu sản phẩm đã có
          mergedCart[existingItemIndex].quantity = dbItem.quantity;
        } else {
          // Thêm sản phẩm mới từ DB vào giỏ hàng cục bộ
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
      await saveCartToDB(mergedCart); // Đảm bảo đồng bộ sau khi hợp nhất

    } catch (error) {
      console.error('Lỗi khi tải giỏ hàng từ DB:', error.message);
    }
  };


  // Lưu giỏ hàng vào DB
  const saveCartToDB = async (currentCart = cartItems) => {
    if (!session) return;
    try {
      const userId = session.user.id;

      // Lấy hoặc tạo cart_id cho user
      let { data: userCart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      let cartId;
      if (cartError && cartError.code === 'PGRST116') { // No rows found
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

      // Xóa tất cả các item cũ của giỏ hàng này
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);
      if (deleteError) throw deleteError;

      // Thêm các item mới từ giỏ hàng cục bộ
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
  };


  const addToCart = async (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      // Sản phẩm đã có trong giỏ, tăng số lượng
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Sản phẩm chưa có, thêm mới
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const clearCart = async () => {
    setCartItems([]);
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
