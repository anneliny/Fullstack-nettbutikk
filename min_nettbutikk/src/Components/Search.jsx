import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/SearchStyle.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetch(`http://localhost:5000/api/products?name=${searchTerm}`);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Feil ved henting av forslag:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSelectProduct = (product_id) => {
    setSearchTerm(''); 
    setSuggestions([]); 
    navigate(`/produkter/${product_id}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Søk etter produkter..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((product) => (
            <div
              key={product.product_id}
              onClick={() => handleSelectProduct(product.product_id)}
              className="suggestion-item"
              style={{ cursor: 'pointer' }}
            >
              {product.product_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
