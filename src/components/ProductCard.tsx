import React from "react";
import { Plus, Heart } from "lucide-react";
import { Product, useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    console.log("Wishlist toggle clicked for product:", product.id);
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      console.log("Removing from wishlist");
      removeFromWishlist(product.id);
    } else {
      console.log("Adding to wishlist");
      addToWishlist(product);
    }
  };

  const inWishlist = isInWishlist(product.id);
  console.log("Product wishlist status:", product.id, inWishlist);

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 z-10 right-3 p-2 rounded-full shadow-md transition-all duration-300 ${
            inWishlist
              ? "bg-red-50 text-red-500 hover:bg-red-100 opacity-100"
              : "bg-white text-gray-600 hover:bg-gray-50 opacity-0 group-hover:opacity-100"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={inWishlist ? "fill-current" : ""} />
        </button>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors group/btn"
          >
            <Plus
              size={16}
              className="group-hover/btn:rotate-90 transition-transform"
            />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
