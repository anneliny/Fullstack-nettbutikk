import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Css/App.css';
import Home from './Components/Home.jsx';
import Products from './Components/Products.jsx';
import MyPage from './Components/MyPage.jsx';
import AboutMe from './Components/AboutMe.jsx';
import ProductDetails from './Components/ProductDetails.jsx';
import MyPageLoggedIn from './Components/MyPageLoggedIn.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import ShoppingCart from './Components/ShoppingCart.jsx';
import ProductList from './Components/ProductList.jsx';

function App() {
  document.title = "Floke & Flora";

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [cart, setCart] = useState([]);

  useEffect (() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div className="App">
      <Link to="/" className="link-no-underline">
        <div className="header-container">
            <h1 className='header-app'>- Floke & Flora -</h1>
            </div>
          </Link>
        <nav className="topNav">
          <div className='navLeft'>
            <Link to="/produkter">
              <button className="navBtn">Produkter</button>
            </Link>
            {isLoggedIn ? (
              <Link to="/min-side-innlogget">
              <button className="navBtn">Min side</button>
            </Link>
            ) : (
              <Link to="/min-side">
              <button className="navBtn">Min side</button>
              </Link> 
            )}
          </div>
          <div className='navRight'>
            <input type="Search" name="inputSearch" />
            <button className="navBtn">Søk</button>
            <Link to="/handlekurv">
            <button className="navBtn">Handlekurv ({cart.length})</button>
            </Link>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produkter" element={<Products />} />
            <Route path="/produkter/kategorier/:category" element={<ProductList />} />
            <Route path="/produkter/:product_id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/min-side" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/om-meg" element={<AboutMe />} />
            <Route path="/min-side-innlogget" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyPageLoggedIn setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
            <Route path="/handlekurv" element={<ShoppingCart cart={cart} setCart={setCart}/>} />
          </Routes>
        </div>

        <nav className="bottomNav">
          <Link to="/om-meg" className="link-no-underline">
            <div className='bottomNav-text'>Om meg</div>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
