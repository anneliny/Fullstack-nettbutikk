
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../Css/ProductStyle.css'

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect (() => {
    fetch('http://localhost:5000/api/products')
    .then (response => response.json())
    .then((data) => setProducts(data))
    .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;