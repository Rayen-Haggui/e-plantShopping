import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../store/CartSlice';

const categories = [
  {
    name: 'Tropical Plants',
    plants: [
      {
        name: 'Monstera Deliciosa',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop',
      },
      {
        name: 'Bird of Paradise',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop',
      },
      {
        name: 'Philodendron Brasil',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1636767653614-1af9db5cec3c?w=400&auto=format&fit=crop',
      },
      {
        name: 'Peace Lily',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1593482892537-5a7e8e79def2?w=400&auto=format&fit=crop',
      },
      {
        name: 'Anthurium',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1620127252536-03bdfcb9d12f?w=400&auto=format&fit=crop',
      },
      {
        name: 'Calathea Orbifolia',
        price: 27.99,
        image: 'https://images.unsplash.com/photo-1616500130658-be97ae0ff69a?w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    name: 'Succulents & Cacti',
    plants: [
      {
        name: 'Echeveria Elegans',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop',
      },
      {
        name: 'Aloe Vera',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400&auto=format&fit=crop',
      },
      {
        name: 'Jade Plant',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1637596879980-38c27bbcbeef?w=400&auto=format&fit=crop',
      },
      {
        name: 'Barrel Cactus',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9d8da?w=400&auto=format&fit=crop',
      },
      {
        name: 'Haworthia Zebra',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1601442463255-b6c8e0e68f97?w=400&auto=format&fit=crop',
      },
      {
        name: 'String of Pearls',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    name: 'Air-Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop',
      },
      {
        name: 'Spider Plant',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1637943316218-f77a8fc7c4e5?w=400&auto=format&fit=crop',
      },
      {
        name: 'Pothos Golden',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop',
      },
      {
        name: 'ZZ Plant',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1622764724126-71f19dee28b3?w=400&auto=format&fit=crop',
      },
      {
        name: 'Boston Fern',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1607185387647-b8e00e9db280?w=400&auto=format&fit=crop',
      },
      {
        name: 'English Ivy',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1599598425947-5202edd56fde?w=400&auto=format&fit=crop',
      },
    ],
  },
];

function Navbar() {
  const items = useSelector(state => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🌿 Paradise Nursery</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart" className="cart-icon-link">
          🛒
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.name === plant.name);

  const handleAdd = () => {
    dispatch(addItem(plant));
  };

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <div className="plant-info">
        <h3>{plant.name}</h3>
        <p className="plant-price">${plant.price.toFixed(2)}</p>
        <button
          className="add-to-cart-btn"
          onClick={handleAdd}
          disabled={isInCart}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

function ProductList() {
  return (
    <div className="product-page">
      <Navbar />
      <h2>Our Plants</h2>
      {categories.map(category => (
        <div key={category.name} className="category-section">
          <h3 className="category-title">{category.name}</h3>
          <div className="plants-grid">
            {category.plants.map(plant => (
              <PlantCard key={plant.name} plant={plant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
