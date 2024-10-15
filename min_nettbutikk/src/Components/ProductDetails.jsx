import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/ProductStyle.css';

function ProductDetails({addToCart}) {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${product_id}`);
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="pd-container">
      <img className="pd-img" src='https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png' alt={product.product_name} />
      <div className="pd-text">
      <h2 >{product.product_name}</h2>
      <div>{product.product_description}</div>
      <div>{product.product_price} kr</div>
      <button onClick={()=> addToCart(product)}>Legg til i handlekurv</button>
      </div>
      </div>
      </>
  );
}

export default ProductDetails;