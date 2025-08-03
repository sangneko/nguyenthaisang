import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        alert('Đăng nhập thành công!');
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">{isRegistering ? 'Đăng ký' : 'Đăng nhập'}</h1>
        <p className="description">
          {isRegistering ? 'Tạo tài khoản mới' : 'Đăng nhập để quản lý giỏ hàng và đơn hàng của bạn'}
        </p>
        <form onSubmit={handleAuth}>
          <input
            className="inputField"
            type="email"
            placeholder="Địa chỉ email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputField"
            type="password"
            placeholder="Mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button block" disabled={loading}>
            {loading ? 'Đang xử lý...' : (isRegistering ? 'Đăng ký' : 'Đăng nhập')}
          </button>
        </form>
        <button
          className="button block link"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
