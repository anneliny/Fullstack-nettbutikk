import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/ProductStyle.css';

function ProductDetails() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${product_id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [product_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (!product) {
    return <p>Product not found</p>;
    
  }

  return (
    <>
      <div className="pd-container">
      <img className="pd-img" src='https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png' alt={product.product_name} />
      <div className="pd-text">
      <h2 >{product.product_name}</h2>
      <div>{product.product_description}</div>
      <div>{product.product_price} kr</div>
      
      </div>
      </div>
      </>
  );
}

export default ProductDetails;