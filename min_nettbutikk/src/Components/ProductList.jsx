import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../Css/ProductStyle.css';

function ProductList() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        if (category) {
          setFilteredProducts(data.filter(product => product.product_category === category));
        } else {
          setFilteredProducts(data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [category]);

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <ProductCard key={product.product_id} product={product} />
        ))
      ) : (
        <p>Ingen produkter tilgjengelig i denne kategorien</p>
      )}
    </div>
  );
}

export default ProductList;
