import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Thêm vào giỏ</button>
    </div>
  );
};

export default ProductCard;
