import React from "react";
import '../Css/ShoppingCartStyle.css';

function ShoppingCart({cart, setCart}){
    if (cart.length === 0) {
        return <div className="emptyCart">Handlekurven din er tom</div>;
      }
    
      const totalPrice = cart.reduce((total, product) => total + Number(product.product_price || 0) * (product.product_quantity || 1), 0);

      const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
      };

      const increaseQuantity = (index) => {
        const updatedCart = cart.map((product, idx) => {
          if (idx === index) {
            return { ...product, product_quantity: product.product_quantity + 1 };
          }
          return product;
        });
        setCart(updatedCart);
      };
    
      const decreaseQuantity = (index) => {
        const updatedCart = cart.map((product, idx) => {
          if (idx === index && product.product_quantity > 1) {
            return { ...product, product_quantity: product.product_quantity - 1 };
          }
          return product;
        });
        setCart(updatedCart);
      };
    
      return (
        <div className="cartContainer">
          <div className="cartHeader">Handlekurv</div>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product.product_name} - {Number(product.product_price).toFixed(2)} kr 
                <button onClick={() => decreaseQuantity(index)}>-</button>
            {product.product_quantity}
            <button onClick={() => increaseQuantity(index)}>+</button>
                <button type="button" onClick={() => removeFromCart(index)}>x</button>
              </li>
            ))}
          </ul>
          <div>Total pris: {totalPrice.toFixed(2)},-</div>
        </div>
      );
    }

export default ShoppingCart;