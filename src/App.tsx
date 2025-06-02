import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { OrderProvider } from './contexts/OrderContext';
import Header from './components/Header';
import Index from './pages/Index';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders/:orderNumber" element={<OrderDetails />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </Provider>
  );
}

export default App;
