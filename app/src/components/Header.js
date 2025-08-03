import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Header = ({ session }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      window.location.reload(); // Tải lại trang để reset trạng thái ứng dụng
    } catch (error) {
      console.error('Lỗi đăng xuất:', error.message);
      alert('Đăng xuất thất bại.');
    }
  };

  return (
    <header className="header-nav">
      <nav>
        <Link to="/" className="logo">E-Commerce</Link>
        <div className="nav-links">
          <Link to="/">Sản phẩm</Link>
          <Link to="/cart">Giỏ hàng</Link>
          {session ? (
            <>
              <Link to="/profile">Tài khoản</Link>
              <button onClick={handleLogout} className="button-link">Đăng xuất</button>
            </>
          ) : (
            <Link to="/auth">Đăng nhập</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
