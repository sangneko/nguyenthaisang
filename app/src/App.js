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

// Tạo Context cho giỏ hàng
export const CartContext = createContext();

function App() {
  const [session, setSession] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng cục bộ

  // Hook để lấy session ban đầu và lắng nghe thay đổi trạng thái xác thực
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

  // --- Logic quản lý giỏ hàng ---

  // Lưu giỏ hàng vào DB
  const saveCartToDB = useCallback(async (currentCart = cartItems) => {
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
      if (cartError && cartError.code === 'PGRST116') { // No rows found, create new cart
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
  }, [session, cartItems]); // Thêm cartItems vào dependency array

  // Load giỏ hàng từ DB (khi đăng nhập hoặc refresh)
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
      if (cartError && cartError.code === 'PGRST116') { // No cart found for user
        // If no cart in DB, and local cart is empty, do nothing.
        // If local cart has items, these will be saved to DB when saveCartToDB is called.
        setCartItems([]); // Ensure cart is empty if no DB cart and no local items
        return;
      } else if (cartError) {
        throw cartError;
      } else {
        cartId = userCart.id;
      }

      // Lấy các mặt hàng trong giỏ hàng từ DB
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

      // Hợp nhất giỏ hàng từ DB và giỏ hàng cục bộ (localStorage)
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const mergedCart = [...localCart]; // Bắt đầu với các item từ localStorage

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
      localStorage.setItem('cart', JSON.stringify(mergedCart)); // Cập nhật localStorage
      await saveCartToDB(mergedCart); // Đảm bảo đồng bộ sau khi hợp nhất

    } catch (error) {
      console.error('Lỗi khi tải giỏ hàng từ DB:', error.message);
    }
  }, [session, saveCartToDB]);


  // Effect để tải giỏ hàng từ localStorage khi khởi tạo ứng dụng
  // và để lưu giỏ hàng vào localStorage/DB khi cartItems hoặc session thay đổi
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(localCart);

    if (session) {
      loadCartFromDB(); // Tải từ DB nếu đã đăng nhập
    }
  }, [session, loadCartFromDB]); // Dependency array: chạy lại khi session hoặc loadCartFromDB thay đổi

  // Effect để lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    if (session) {
      saveCartToDB(); // Lưu vào DB khi có session
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
            {/* Thêm các route khác nếu cần (ví dụ: trang chi tiết sản phẩm) */}
          </Routes>
        </div>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
