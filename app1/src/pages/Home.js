import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../App'; // Sử dụng Context để quản lý giỏ hàng

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default Home;
