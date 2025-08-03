import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      getProfile();
      getOrders();
    } else {
      navigate('/auth');
    }
  }, [session, navigate]);

  async function getProfile() {
    try {
      setLoading(true);
      const { user } = session;
      setEmail(user.email);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getOrders() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price_at_order,
            products (
              name,
              image_url
            )
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data);
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng:', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Đang tải thông tin...</p>;

  return (
    <div className="profile-container">
      <h2>Thông tin tài khoản</h2>
      <p>Email: <strong>{email}</strong></p>

      <h3>Lịch sử đơn hàng</h3>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h4>Đơn hàng #{order.id.substring(0, 8)}</h4>
              <p>Ngày đặt: {new Date(order.created_at).toLocaleString()}</p>
              <p>Tổng tiền: <strong>${parseFloat(order.total_amount).toFixed(2)}</strong></p>
              <p>Trạng thái: <strong>{order.status}</strong></p>
              <h5>Sản phẩm:</h5>
              <ul>
                {order.order_items.map((item, index) => (
                  <li key={index}>
                    <img src={item.products.image_url || 'https://via.placeholder.com/30'} alt={item.products.name} className="order-item-image"/>
                    {item.products.name} x {item.quantity} (${parseFloat(item.price_at_order).toFixed(2)})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
