import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './CartContext';

interface WishlistContextType {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Product[]>(() => {
        // Load wishlist from localStorage on initial render
        const savedWishlist = localStorage.getItem('wishlist');
        console.log('Loading wishlist from localStorage:', savedWishlist);
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        console.log('Saving wishlist to localStorage:', items);
        localStorage.setItem('wishlist', JSON.stringify(items));
    }, [items]);

    const addToWishlist = (product: Product) => {
        console.log('Adding to wishlist:', product);
        setItems(prevItems => {
            if (!prevItems.find(item => item.id === product.id)) {
                return [...prevItems, product];
            }
            return prevItems;
        });
    };

    const removeFromWishlist = (productId: string) => {
        console.log('Removing from wishlist:', productId);
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: string) => {
        const result = items.some(item => item.id === productId);
        console.log('Checking if in wishlist:', productId, result);
        return result;
    };

    return (
        <WishlistContext.Provider
            value={{
                items,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}; 