import React from "react";
import '../Css/ShoppingCartStyle.css';

function ShoppingCart({cart}){
    if (cart.length === 0) {
        return <div className="emptyCart">Handlekurven din er tom</div>;
      }
    
      const totalPrice = cart.reduce((total, product) => total + Number(product.product_price || 0), 0);
    
      return (
        <div className="cartContainer">
          <div className="cartHeader">Handlekurv</div>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product.product_name} - {Number(product.product_price).toFixed(2)} kr
              </li>
            ))}
          </ul>
          <div>Total pris:{totalPrice.toFixed(2)},-</div>
        </div>
      );
    }

export default ShoppingCart;