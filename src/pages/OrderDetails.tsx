import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { Package, ArrowLeft, Printer, Truck, Calendar, MapPin, Phone, Mail } from 'lucide-react';

const OrderDetails = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const { getOrder } = useOrders();
    const order = orderNumber ? getOrder(orderNumber) : undefined;

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="text-gray-400" size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
                        <p className="text-gray-600 mb-8">The order you're looking for doesn't exist or has been removed.</p>
                        <Link
                            to="/profile"
                            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            to="/profile"
                            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Profile</span>
                        </Link>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Printer size={16} />
                            <span>Print Order</span>
                        </button>
                    </div>

                    {/* Order Status */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
                                <p className="text-gray-500">
                                    <Calendar size={14} className="inline mr-1" />
                                    {new Date(order.date).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Customer Information */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Mail className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <p className="text-gray-600">{order.customerInfo.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Phone</h3>
                                            <p className="text-gray-600">{order.customerInfo.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Shipping Address</h3>
                                            <p className="text-gray-600">
                                                {order.customerInfo.firstName} {order.customerInfo.lastName}<br />
                                                {order.customerInfo.address}<br />
                                                {order.customerInfo.city}, {order.customerInfo.postalCode}<br />
                                                {order.customerInfo.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                                <p className="font-semibold text-gray-900">
                                                    ₹{item.price.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">
                                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>GST (18%)</span>
                                            <span>₹{(order.totalAmount * 0.18).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200">
                                            <span>Total</span>
                                            <span>₹{(order.totalAmount * 1.18).toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails; 