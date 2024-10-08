import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/ProductStyle.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/produkter/${product.product_id}`} className="link-no-underline">
        <img src='https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png' alt={product.name} />
        <h3>{product.product_name}</h3>
        <p>{product.product_price} kr</p>
      </Link>
    </div>
  );
}

export default ProductCard;