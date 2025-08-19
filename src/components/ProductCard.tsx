import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product, useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all ${
            inWishlist
              ? 'bg-red-100 text-red-500 opacity-100'
              : 'bg-white text-gray-600 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
        </button>

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all" />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-md font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center bg-gray-900 text-white text-sm px-4 py-1.5 rounded hover:bg-gray-800 transition"
          >
            <Plus size={16} className="mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
