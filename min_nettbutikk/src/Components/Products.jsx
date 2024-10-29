import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../Css/ProductStyle.css';

function Products() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-list">
            {categories.length > 0 ? (
                categories.map(category => (
                    <div key={category.id} className="category-card">
                        <Link to={`/produkter/kategorier/${category.name}`} className="link-no-underline">
                            <div>{category.name}</div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>Ingen kategorier tilgjengelig</p>
            )}
        </div>
    );
}

export default Products;
