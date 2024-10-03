import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductItems() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    if (product_id) {
      fetch(`http://localhost:5000/api/products/${product_id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => setProduct(data))
        .catch(error => console.error('Error fetching product details:', error));
    } else {
      console.error('Invalid product ID');
    }
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>{product.product_description}</p>
      <p>{product.product_price} kr</p>
    </div>
  );
}

export default ProductItems;