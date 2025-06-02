import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './CartContext';

export interface OrderItem extends Product {
    quantity: number;
}

export interface Order {
    orderNumber: string;
    date: string;
    totalAmount: number;
    status: 'Delivered' | 'Processing' | 'Shipped';
    items: OrderItem[];
    customerInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
    getOrder: (orderNumber: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>(() => {
        // Load orders from localStorage on initial render
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Save orders to localStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order: Order) => {
        setOrders(prevOrders => [order, ...prevOrders]);
    };

    const getOrder = (orderNumber: string) => {
        return orders.find(order => order.orderNumber === orderNumber);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}; 