import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Css/App.css'
import Home from './Components/Home.jsx';
import Products from './Components/Products.jsx';
import MyPage from './Components/MyPage.jsx';
import AboutMe from './Components/AboutMe.jsx';

function App() {
  document.title = "Floke & Flora";
  return (
    <Router>
      <div className="App">
      <div className="header-container">
      <Link to="/" className="link-no-underline">
          <h1 className='header-app'>Floke & Flora</h1>
          </Link>
          </div>
        <nav className="topNav">
          <div className='navLeft'>
          <Link to="/produkter">
            <button className="navBtn">Produkter</button>
          </Link>
          <Link to="/min-side">
            <button className="navBtn">Min side</button>
          </Link>
          </div>
          <div className='navRight'>
          <input type="Search" name="inputSearch"/>
          <button className="navBtn">Søk</button>
          </div>
        </nav>

        <div className="content">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkter" element={<Products />} />
          <Route path="/min-side" element={<MyPage />} />
          <Route path="/om-meg" element={<AboutMe />} />
        </Routes> </div>
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