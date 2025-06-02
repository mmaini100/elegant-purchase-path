import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist = () => {
    const { items } = useWishlist();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Save your favorite items for later
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="text-gray-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600">Start adding items to your wishlist by clicking the heart icon on any product</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist; 