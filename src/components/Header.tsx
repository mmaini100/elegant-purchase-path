import React from 'react';
import { ShoppingCart, Search, User, Menu, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Link } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext'; // 👈 Add this import

const Header = () => {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
 

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            LUXE
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900 transition-colors">
              Categories
            </Link>
            
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            
             <Link to="/search" className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
  <Search size={20} />
</Link>

            

            <Link
              to="/profile"
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <User size={20} />
            </Link>
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/checkout"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
