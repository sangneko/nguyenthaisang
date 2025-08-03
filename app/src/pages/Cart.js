import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Cart = ({ session }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, loadCartFromDB } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      loadCartFromDB();
    }
  }, [session, loadCartFromDB]); // Thêm loadCartFromDB vào dependency array để tránh warning

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!session) {
      alert('Vui lòng đăng nhập để thanh toán.');
      navigate('/auth');
      return;
    }
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống.');
      return;
    }

    setLoading(true);
    try {
      const userId = session.user.id;
      const totalAmount = parseFloat(calculateTotal());

      // Tạo đơn hàng mới
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ user_id: userId, total_amount: totalAmount, status: 'pending' }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;

      // Thêm các mục giỏ hàng vào order_items
      const orderItemsToInsert = cartItems.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_order: parseFloat(item.price), // Lưu giá tại thời điểm đặt hàng
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (orderItemsError) throw orderItemsError;

      // Xóa giỏ hàng sau khi tạo đơn hàng thành công
      await clearCart();
      alert('Đơn hàng của bạn đã được tạo thành công! Tổng cộng: $' + totalAmount);
      navigate('/profile');
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error.message);
      alert('Thanh toán thất bại: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url || 'https://via.placeholder.com/50'} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Giá: ${parseFloat(item.price).toFixed(2)}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">Xóa</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Tổng cộng: ${calculateTotal()}</h3>
            <button onClick={handleCheckout} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
            </button>
            <button onClick={clearCart} className="clear-cart-button">Xóa hết giỏ hàng</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
