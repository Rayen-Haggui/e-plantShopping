import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../store/CartSlice';

const categories = [
  {
    name: 'Tropical',
    plants: [
      {
        name: 'Split-Leaf Monstera',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&fit=crop&auto=format',
      },
      {
        name: 'Bird of Paradise',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&fit=crop&auto=format',
      },
      {
        name: 'Philodendron Brasil',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&fit=crop&auto=format',
      },
      {
        name: 'White Peace Lily',
        price: 22.99,
        image: 'https://images.unsplash.com/white-and-yellow-flower-in-close-up-photography-2y8kIVvvC0w?w=400&fit=crop&auto=format',
      },
      {
        name: 'Red Anthurium',
        price: 34.99,
        image: 'https://images.unsplash.com/red-hibiscus-in-bloom-during-daytime-T8vaIfQDEWQ?w=400&fit=crop&auto=format',
      },
      {
        name: 'Orbifolia Calathea',
        price: 27.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&fit=crop&auto=format',
      },
    ],
  },
  {
    name: 'Succulents & Cacti',
    plants: [
      {
        name: 'White Mexican Rose',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&fit=crop&auto=format',
      },
      {
        name: 'Aloe Vera',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&fit=crop&auto=format',
      },
      {
        name: 'Jade Plant',
        price: 14.99,
        image: 'https://images.unsplash.com/green-plant-on-white-ceramic-pot-Q0w0LGkHokE?w=400&fit=crop&auto=format',
      },
      {
        name: 'Golden Barrel Cactus',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&fit=crop&auto=format',
      },
      {
        name: 'Zebra Cactus',
        price: 9.99,
        image: 'https://images.unsplash.com/a-couple-of-plants-that-are-in-a-pot-2RwabO5J-_E?w=400&fit=crop&auto=format',
      },
      {
        name: 'String of Pearls',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&fit=crop&auto=format',
      },
    ],
  },
  {
    name: 'Air-Purifying',
    plants: [
      {
        name: "Mother-in-Law's Tongue",
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&fit=crop&auto=format',
      },
      {
        name: 'Ribbon Plant',
        price: 13.99,
        image: 'https://images.unsplash.com/lucky-bamboo-plants-in-glass-vases-with-red-ties-YxYt71A7RqI?w=400&fit=crop&auto=format',
      },
      {
        name: 'Golden Pothos',
        price: 11.99,
        image: 'https://images.unsplash.com/a-potted-plant-hanging-from-a-wooden-shelf-znhiWxyKDW0?w=400&fit=crop&auto=format',
      },
      {
        name: 'ZZ Plant',
        price: 24.99,
        image: 'https://images.unsplash.com/a-plant-with-large-green-leaves-in-front-of-a-pink-wall-kbtSCgsD7AY?w=400&fit=crop&auto=format',
      },
      {
        name: 'Boston Fern',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=400&fit=crop&auto=format',
      },
      {
        name: 'English Ivy',
        price: 10.99,
        image: 'https://images.unsplash.com/green-and-brown-brick-wall-YyPn9IfH__M?w=400&fit=crop&auto=format',
      },
    ],
  },
];

function Navbar() {
  const items = useSelector(state => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Paradise Nursery</Link>
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
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

function ProductList() {
  return (
    <div className="product-page">
      <Navbar />
      <h2>Shop All Plants</h2>
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
