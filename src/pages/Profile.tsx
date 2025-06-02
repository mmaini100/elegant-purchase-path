import React from 'react';
import { Package, User, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';

const Profile = () => {
    const { orders } = useOrders();

    // Mock user data - In a real app, this would come from an API or database
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main Street',
        city: 'Mumbai',
        postalCode: '400001',
        country: 'India'
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Information */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="text-gray-600" size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {userData.firstName} {userData.lastName}
                                        </h2>
                                        <p className="text-gray-600">{userData.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Mail className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <p className="text-gray-600">{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Phone className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Phone</h3>
                                            <p className="text-gray-600">{userData.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <MapPin className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Shipping Address</h3>
                                            <p className="text-gray-600">
                                                {userData.address}<br />
                                                {userData.city}, {userData.postalCode}<br />
                                                {userData.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>

                                {orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package className="text-gray-400" size={24} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                                        <Link
                                            to="/products"
                                            className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Browse Products
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <div key={order.orderNumber} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">Order #{order.orderNumber}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            <Clock size={14} className="inline mr-1" />
                                                            {new Date(order.date).toLocaleDateString('en-IN', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <div className="space-y-4">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex items-center space-x-4">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                                                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                                                <p className="font-semibold text-gray-900">
                                                                    ₹{item.price.toLocaleString('en-IN')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-semibold text-gray-900">Total Amount</span>
                                                        <span className="font-semibold text-gray-900">
                                                            ₹{order.totalAmount.toLocaleString('en-IN')}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        to={`/orders/${order.orderNumber}`}
                                                        className="mt-4 flex items-center justify-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors"
                                                    >
                                                        <span>View Order Details</span>
                                                        <ChevronRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 