import React from 'react';
import { CheckCircle, Package, User, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderConfirmationProps {
    orderDetails: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        orderNumber: string;
        totalAmount: number;
    };
}

const OrderConfirmation = ({ orderDetails }: OrderConfirmationProps) => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Success Message */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                        <p className="text-gray-600">Thank you for your purchase. Your order has been received.</p>
                    </div>

                    {/* Order Details */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                            <span className="text-sm text-gray-500">Order #{orderDetails.orderNumber}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer Profile */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="text-gray-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Customer Profile</h3>
                                        <p className="text-gray-600">{orderDetails.firstName} {orderDetails.lastName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Mail className="text-gray-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email</h3>
                                        <p className="text-gray-600">{orderDetails.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Phone className="text-gray-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Phone</h3>
                                        <p className="text-gray-600">{orderDetails.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <MapPin className="text-gray-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Shipping Address</h3>
                                        <p className="text-gray-600">
                                            {orderDetails.address}<br />
                                            {orderDetails.city}, {orderDetails.postalCode}<br />
                                            {orderDetails.country}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Package className="text-gray-600" size={20} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Order Summary</h3>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{orderDetails.totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>GST (18%)</span>
                                        <span>₹{(orderDetails.totalAmount * 0.18).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 mt-2">
                                        <div className="flex justify-between font-semibold text-gray-900">
                                            <span>Total</span>
                                            <span>₹{(orderDetails.totalAmount * 1.18).toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="flex-1 sm:flex-none bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="flex-1 sm:flex-none bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Print Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 